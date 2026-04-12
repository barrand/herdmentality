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

const DELAY_MS = 3000

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

interface ArchetypeDef {
  tag: string
  name: string
  count: number
  description: string
  toneGuidance: string
  examples: string[]
}

const ARCHETYPES: ArchetypeDef[] = [
  {
    tag: 'absurd-scenario',
    name: 'Absurd Scenario Pick',
    count: 50,
    description:
      'Give 3-4 funny options for an absurd premise. The options ARE the joke. Players pick one of the listed choices.',
    toneGuidance: 'Lean into absurdity. The scenario should be ridiculous, the options should make people laugh just reading them.',
    examples: [
      'In a zombie apocalypse, who leads your group: The Rock, Martha Stewart, or your dentist?',
      'Which kitchen appliance wins in a fight: microwave, blender, or toaster?',
      'Your Uber driver starts singing opera. Do you: join in, tip extra, or tuck and roll?',
      'You can only eat one condiment for the rest of your life. Ketchup, ranch, or hot sauce?',
      'Which animal would be the worst coworker: a goose, a raccoon, or a parrot?',
    ],
  },
  {
    tag: 'who-in-room',
    name: 'Spicy "Who in This Room"',
    count: 40,
    description:
      'Ask about someone in the group. Answer space is limited to the players. Push beyond generic into memorable territory.',
    toneGuidance: 'Be spicy but not cruel. Questions should make people laugh and point fingers, not feel attacked.',
    examples: [
      'Who in this group would accidentally start a cult?',
      'Who would get banned from a cruise ship first?',
      'Who is secretly a terrible driver but won\'t admit it?',
      'Who would survive the longest on a desert island?',
      'Who would be the first to crack under interrogation?',
    ],
  },
  {
    tag: 'would-you-rather',
    name: 'Would You Rather (Absurd Edition)',
    count: 40,
    description:
      'Binary choice. Always convergent. Make the dilemma genuinely hard and funny -- both options should be terrible or hilarious.',
    toneGuidance: 'The best ones make people physically uncomfortable imagining either option. Go gross, go weird.',
    examples: [
      'Would you rather have a permanent clown nose or permanent clown shoes?',
      'Would you rather only be able to whisper or only be able to shout?',
      'Would you rather fight one horse-sized duck or a hundred duck-sized horses?',
      'Would you rather always smell slightly like garlic or always be slightly damp?',
      'Would you rather have fingers for toes or toes for fingers?',
    ],
  },
  {
    tag: 'mildly-unhinged',
    name: 'Mildly Unhinged',
    count: 40,
    description:
      'The "oh NO" questions. Slightly gross, slightly dark, always funny. These make people gasp-laugh.',
    toneGuidance:
      'Push the edge. Two-drinks-in humor. Gross-funny, dark-curious. NEVER punch down, NEVER target identity groups. Think: bodily humor, taboo-adjacent scenarios, things you\'d only say with friends.',
    examples: [
      'What is the worst thing you could do to disrespect a gravestone?',
      'What food would be the most disturbing to see someone eating in a bathtub?',
      'If you HAD to lick one surface in this room, which would it be?',
      'What is the worst possible thing to yell during a moment of silence?',
      'What would be the most unsettling thing to find under your hotel mattress?',
      'What is the grossest thing most people have done but won\'t admit?',
    ],
  },
  {
    tag: 'obvious-afraid',
    name: 'The Obvious Answer You\'re Afraid to Say',
    count: 45,
    description:
      'Questions with a dominant default answer, but saying it feels too safe or basic. Creates tension between going with the crowd and trying to be original.',
    toneGuidance: 'Opinionated, slightly judgmental framing. Make players feel like their answer reveals something about them.',
    examples: [
      'What is the most overrated movie of all time?',
      'What fast food place would you be embarrassed to admit you love?',
      'What is the first thing everyone googles when they get a new phone?',
      'What hobby sounds cool but is actually boring?',
      'What is the most useless school subject?',
    ],
  },
  {
    tag: 'hot-take-binary',
    name: 'Hot Take Binary',
    count: 40,
    description:
      'Simple X-or-Y where BOTH sides have passionate defenders. Frame it like a personality test.',
    toneGuidance: 'Be provocative. Frame it like the answer says something deep about the person. Mild trash-talk energy.',
    examples: [
      'Boneless wings or bone-in -- this is a dealbreaker.',
      'Is a hot dog a sandwich? Your answer reveals your character.',
      'Toilet seat: lid down always, or are you a monster?',
      'Socks with sandals: crime against humanity or underrated comfort?',
      'Showering in the morning or at night -- pick a side.',
    ],
  },
  {
    tag: 'cultural-consensus',
    name: 'Cultural Consensus with Teeth',
    count: 40,
    description:
      'Reference shared cultural knowledge (movies, music, food, traditions) but with an opinionated, slightly mean edge.',
    toneGuidance: 'Pop culture roasting energy. Everyone knows the answer but saying it out loud feels like a hot take.',
    examples: [
      'Name the movie everyone SAYS is their favorite but nobody actually rewatches.',
      'What is the most overplayed wedding song that needs to be retired?',
      'Name a food that one person always ruins at Thanksgiving.',
      'What TV show went on at least two seasons too long?',
      'What is the most annoying song that gets stuck in your head?',
    ],
  },
  {
    tag: 'vivid-scenario',
    name: 'Vivid Scenario Response',
    count: 35,
    description:
      'Paint a specific, funny scene and ask a CONSTRAINED question about it. Always ask about a specific NOUN (object, person, food, body part). NEVER ask "what do you do?" or "what is your move?"',
    toneGuidance: 'The scene does the comedy. Make it cinematic and specific. The constraint keeps answers convergent.',
    examples: [
      'Your in-laws are coming in 10 minutes and your house is a disaster. What do you hide first?',
      'You walk into a room and everyone stops talking. What do you assume they were saying about you?',
      'A bird poops on you right before a job interview. What body part would be the worst for it to land on?',
      'You\'re trapped in an elevator for 3 hours. What one snack do you want?',
      'You accidentally send a text to your boss meant for your best friend. What is the worst word it could start with?',
    ],
  },
  {
    tag: 'constrained-superlative',
    name: 'Constrained Superlatives',
    count: 35,
    description:
      'Best/worst/most format with a narrow enough domain that answers converge. The constraint is what makes it work.',
    toneGuidance: 'Gross, dark, or embarrassing superlatives are funnier than wholesome ones. Push toward uncomfortable.',
    examples: [
      'What is the single worst thing to step on in the dark?',
      'What is the most suspicious thing to buy in bulk?',
      'What expired food would you still eat without hesitation?',
      'What is the most embarrassing thing to be caught doing by your neighbor?',
      'What is the worst noise to hear coming from your basement at 3am?',
    ],
  },
]

async function generateBatch(archetype: ArchetypeDef, batchSize: number, existingQuestions: Set<string>): Promise<string[]> {
  const prompt = `You are writing questions for "Flock Together" -- an adult party game where players try to write the SAME answer as the majority.

ARCHETYPE: ${archetype.name}
DESCRIPTION: ${archetype.description}
TONE: ${archetype.toneGuidance}

EXAMPLES (match this quality and style):
${archetype.examples.map((e, i) => `${i + 1}. ${e}`).join('\n')}

RULES:
- Generate exactly ${batchSize} NEW questions in this archetype's style
- Adult game night tone: mildly edgy, slightly gross, two-drinks-in humor
- Every question must pass the RETELLABILITY TEST: would someone describe this round to a friend the next day?
- NEVER ask "what would you do?" or "what is your move?" -- always ask about a specific noun
- NEVER write survey-style questions ("What is the most important thing in friendship?")
- NEVER write personal memory questions ("What is the cringiest thing you did?")
- NEVER write vague open-ended questions ("If you could do anything for a day?")
- Every question should have a finite, imaginable answer space where 3-5 out of 7 players could realistically converge
- Make players laugh, squirm, or debate BEFORE the answers are revealed
- HARD LIMITS: No racism, sexism, homophobia, ableism. No explicit sexual content. No real violence.

Return ONLY valid JSON:
{ "questions": ["question 1 text", "question 2 text", ...] }`

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: 'application/json' },
  })

  const parsed = JSON.parse(result.response.text())
  const questions: string[] = parsed.questions ?? []

  return questions.filter((q) => !existingQuestions.has(q.toLowerCase().trim()))
}

async function main() {
  const keepersPath = path.resolve(__dirname, 'keepers.json')
  let existingQuestions = new Set<string>()

  if (fs.existsSync(keepersPath)) {
    const keepers: { text: string }[] = JSON.parse(fs.readFileSync(keepersPath, 'utf-8'))
    existingQuestions = new Set(keepers.map((k) => k.text.toLowerCase().trim()))
    console.log(`Loaded ${existingQuestions.size} existing keepers for deduplication`)
  }

  const allGenerated: { text: string; tag: string }[] = []

  for (const archetype of ARCHETYPES) {
    console.log(`\n=== ${archetype.name} (target: ${archetype.count}) ===`)
    const batchSize = 25
    const batches = Math.ceil(archetype.count / batchSize)
    const archetypeQuestions: string[] = []

    for (let b = 0; b < batches; b++) {
      const remaining = archetype.count - archetypeQuestions.length
      const thisBatch = Math.min(batchSize, remaining + 5) // over-generate slightly
      console.log(`  Batch ${b + 1}/${batches} (requesting ${thisBatch})...`)

      try {
        const questions = await generateBatch(archetype, thisBatch, existingQuestions)
        for (const q of questions) {
          if (archetypeQuestions.length < archetype.count + 10) {
            archetypeQuestions.push(q)
            existingQuestions.add(q.toLowerCase().trim())
          }
        }
        console.log(`  Got ${questions.length} new (total: ${archetypeQuestions.length})`)
      } catch (err) {
        console.error(`  ERROR: ${err}`)
      }

      await sleep(DELAY_MS)
    }

    for (const q of archetypeQuestions) {
      allGenerated.push({ text: q, tag: archetype.tag })
    }
  }

  const outPath = path.resolve(__dirname, 'generated-questions.json')
  fs.writeFileSync(outPath, JSON.stringify(allGenerated, null, 2))

  console.log(`\n=== GENERATION COMPLETE ===`)
  console.log(`Total generated: ${allGenerated.length}`)
  for (const arch of ARCHETYPES) {
    const count = allGenerated.filter((q) => q.tag === arch.tag).length
    console.log(`  ${arch.name}: ${count}`)
  }
  console.log(`\nWritten to: ${outPath}`)
}

main().catch(console.error)
