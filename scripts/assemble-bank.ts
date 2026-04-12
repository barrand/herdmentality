import * as fs from 'fs'
import * as path from 'path'

interface GradedQuestion {
  text: string
  convergenceGrade: string
  entertainmentScore: number
  compositeLabel: string
}

interface GeneratedQuestion {
  text: string
  tag: string
}

interface FinalQuestion {
  text: string
  tag: string
}

function main() {
  const reportPath = path.resolve(__dirname, 'question-report.json')
  const generatedGradedPath = path.resolve(__dirname, 'generated-report.json')
  const keepersManualPath = path.resolve(__dirname, 'keepers.json')
  const outputPath = path.resolve(__dirname, '../functions/src/data/questions.json')

  const finalBank: FinalQuestion[] = []
  const seen = new Set<string>()

  function addUnique(text: string, tag: string) {
    const key = text.toLowerCase().trim()
    if (seen.has(key)) return false
    seen.add(key)
    finalBank.push({ text, tag })
    return true
  }

  // Phase 1: Pull keepers from the graded existing bank
  if (fs.existsSync(reportPath)) {
    const report: { questions: GradedQuestion[] } = JSON.parse(fs.readFileSync(reportPath, 'utf-8'))
    const keepers = report.questions.filter(
      (q) => q.compositeLabel === 'STAR' || q.compositeLabel === 'KEEP'
    )
    console.log(`Existing bank: ${report.questions.length} total, ${keepers.length} keepers (STAR/KEEP)`)
    for (const q of keepers) {
      addUnique(q.text, 'preset-keeper')
    }
  }

  // Phase 2: Pull manually curated keepers (if you hand-picked some)
  if (fs.existsSync(keepersManualPath)) {
    const manual: { text: string; tag?: string }[] = JSON.parse(fs.readFileSync(keepersManualPath, 'utf-8'))
    console.log(`Manual keepers: ${manual.length}`)
    for (const q of manual) {
      addUnique(q.text, q.tag ?? 'manual')
    }
  }

  // Phase 3: Pull graded generated questions that passed
  if (fs.existsSync(generatedGradedPath)) {
    const report: { questions: (GradedQuestion & { tag?: string })[] } = JSON.parse(
      fs.readFileSync(generatedGradedPath, 'utf-8')
    )
    const keepers = report.questions.filter(
      (q) => q.compositeLabel === 'STAR' || q.compositeLabel === 'KEEP'
    )
    console.log(`Generated bank: ${report.questions.length} total, ${keepers.length} passed`)
    for (const q of keepers) {
      addUnique(q.text, q.tag ?? 'generated')
    }
  }

  console.log(`\n=== FINAL BANK: ${finalBank.length} questions ===`)

  const tagCounts: Record<string, number> = {}
  for (const q of finalBank) {
    tagCounts[q.tag] = (tagCounts[q.tag] ?? 0) + 1
  }
  for (const [tag, count] of Object.entries(tagCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${tag}: ${count}`)
  }

  if (finalBank.length < 250) {
    console.warn(`\nWARNING: Only ${finalBank.length} questions -- below the 250 floor. Consider generating more.`)
  }

  fs.writeFileSync(outputPath, JSON.stringify(finalBank, null, 2))
  console.log(`\nWritten to: ${outputPath}`)
}

main()
