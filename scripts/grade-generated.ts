import { GoogleGenerativeAI } from '@google/generative-ai'
import * as fs from 'fs'
import * as path from 'path'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? ''
if (!GEMINI_API_KEY) {
  console.error('Set GEMINI_API_KEY environment variable')
  process.exit(1)
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

interface GeneratedQuestion {
  text: string
  tag: string
}

interface GradedQuestion {
  text: string
  tag: string
  convergenceGrade: 'A' | 'B' | 'C'
  convergenceGroupSize: number
  simulatedAnswers: string[]
  entertainmentScore: number
  laughFactor: number
  revealDrama: number
  retellability: number
  compositeLabel: string
}

const BATCH_SIZE = 5
const DELAY_MS = 2500

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function simulateConvergence(questions: string[]) {
  const prompt = `You are simulating 7 different players in a party game called "Flock Together."

RULES: All players see the same question and try to write the SAME answer as the majority. Players are strategic -- they pick the most obvious/common answer, not a creative one. Players come from diverse backgrounds (ages 22-55, mixed genders, American cultural context).

For EACH question below, simulate 7 player answers. Players are TRYING to match each other, so most should converge, but realistic disagreement happens.

Questions:
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

Return ONLY valid JSON:
{
  "results": [
    { "question_index": 0, "answers": ["ans1","ans2",...], "largest_group": 5 },
    ...
  ]
}`

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: 'application/json' },
  })

  const parsed = JSON.parse(result.response.text())
  return parsed.results.map((r: { answers: string[]; largest_group: number }) => ({
    answers: r.answers,
    largestGroup: r.largest_group,
  }))
}

async function rateEntertainment(questions: string[]) {
  const prompt = `You are a veteran party game designer rating questions for "Flock Together" -- an adult game night game (tone: mildly edgy, funny, two-drinks-in humor).

Rate each question on three dimensions (1-5 scale):

1. LAUGH FACTOR: Does the question premise itself make adults smile or laugh before anyone answers?
2. REVEAL DRAMA: When answers are revealed, will it spark debate, surprise, or roasting?
3. RETELLABILITY: Would someone describe this question/round to a friend the next day?

Questions:
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

Return ONLY valid JSON:
{
  "ratings": [
    { "question_index": 0, "laugh": 3, "reveal": 4, "retell": 3 },
    ...
  ]
}`

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: 'application/json' },
  })

  const parsed = JSON.parse(result.response.text())
  return parsed.ratings.map((r: { laugh: number; reveal: number; retell: number }) => ({
    laugh: r.laugh,
    reveal: r.reveal,
    retell: r.retell,
  }))
}

function gradeConvergence(largestGroup: number): 'A' | 'B' | 'C' {
  if (largestGroup >= 5) return 'A'
  if (largestGroup >= 3) return 'B'
  return 'C'
}

function compositeLabel(convGrade: string, entScore: number): string {
  if (convGrade === 'A' && entScore >= 4) return 'STAR'
  if (convGrade !== 'C' && entScore >= 4) return 'KEEP'
  if (convGrade === 'A' && entScore >= 3) return 'KEEP'
  if (convGrade !== 'C' && entScore >= 3) return 'MAYBE'
  return 'CUT'
}

async function main() {
  const generatedPath = path.resolve(__dirname, 'generated-questions.json')
  const generated: GeneratedQuestion[] = JSON.parse(fs.readFileSync(generatedPath, 'utf-8'))
  const questionTexts = generated.map((q) => q.text)

  console.log(`Grading ${questionTexts.length} generated questions in batches of ${BATCH_SIZE}...`)

  const grades: GradedQuestion[] = []
  const totalBatches = Math.ceil(questionTexts.length / BATCH_SIZE)

  for (let i = 0; i < questionTexts.length; i += BATCH_SIZE) {
    const batchNum = Math.floor(i / BATCH_SIZE) + 1
    const batch = questionTexts.slice(i, i + BATCH_SIZE)
    const batchTags = generated.slice(i, i + BATCH_SIZE).map((q) => q.tag)
    console.log(`  Batch ${batchNum}/${totalBatches} (questions ${i + 1}-${i + batch.length})...`)

    try {
      const [convergenceResults, entertainmentResults] = await Promise.all([
        simulateConvergence(batch),
        rateEntertainment(batch),
      ])

      for (let j = 0; j < batch.length; j++) {
        const conv = convergenceResults[j] ?? { answers: [], largestGroup: 0 }
        const ent = entertainmentResults[j] ?? { laugh: 0, reveal: 0, retell: 0 }
        const entAvg = +((ent.laugh + ent.reveal + ent.retell) / 3).toFixed(1)
        const convGrade = gradeConvergence(conv.largestGroup)

        grades.push({
          text: batch[j],
          tag: batchTags[j],
          convergenceGrade: convGrade,
          convergenceGroupSize: conv.largestGroup,
          simulatedAnswers: conv.answers,
          entertainmentScore: entAvg,
          laughFactor: ent.laugh,
          revealDrama: ent.reveal,
          retellability: ent.retell,
          compositeLabel: compositeLabel(convGrade, entAvg),
        })
      }
    } catch (err) {
      console.error(`  ERROR on batch ${batchNum}: ${err}`)
      for (let j = 0; j < batch.length; j++) {
        grades.push({
          text: batch[j],
          tag: batchTags[j],
          convergenceGrade: 'C',
          convergenceGroupSize: 0,
          simulatedAnswers: [],
          entertainmentScore: 0,
          laughFactor: 0,
          revealDrama: 0,
          retellability: 0,
          compositeLabel: 'ERROR',
        })
      }
    }

    if (i + BATCH_SIZE < questionTexts.length) {
      await sleep(DELAY_MS)
    }
  }

  grades.sort((a, b) => {
    const labelOrder: Record<string, number> = { STAR: 0, KEEP: 1, MAYBE: 2, CUT: 3, ERROR: 4 }
    return (labelOrder[a.compositeLabel] ?? 5) - (labelOrder[b.compositeLabel] ?? 5) ||
      b.entertainmentScore - a.entertainmentScore
  })

  const summary = {
    total: grades.length,
    stars: grades.filter((g) => g.compositeLabel === 'STAR').length,
    keeps: grades.filter((g) => g.compositeLabel === 'KEEP').length,
    maybes: grades.filter((g) => g.compositeLabel === 'MAYBE').length,
    cuts: grades.filter((g) => g.compositeLabel === 'CUT').length,
    errors: grades.filter((g) => g.compositeLabel === 'ERROR').length,
  }

  const report = { summary, questions: grades }
  const outPath = path.resolve(__dirname, 'generated-report.json')
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2))

  console.log('\n=== GRADING COMPLETE ===')
  console.log(`STAR:  ${summary.stars}`)
  console.log(`KEEP:  ${summary.keeps}`)
  console.log(`MAYBE: ${summary.maybes}`)
  console.log(`CUT:   ${summary.cuts}`)
  console.log(`ERROR: ${summary.errors}`)

  const byTag: Record<string, { star: number; keep: number; total: number }> = {}
  for (const g of grades) {
    if (!byTag[g.tag]) byTag[g.tag] = { star: 0, keep: 0, total: 0 }
    byTag[g.tag].total++
    if (g.compositeLabel === 'STAR') byTag[g.tag].star++
    if (g.compositeLabel === 'KEEP') byTag[g.tag].keep++
  }
  console.log('\nBy archetype:')
  for (const [tag, counts] of Object.entries(byTag)) {
    console.log(`  ${tag}: ${counts.star} STAR, ${counts.keep} KEEP / ${counts.total} total`)
  }

  console.log(`\nReport written to: ${outPath}`)
}

main().catch(console.error)
