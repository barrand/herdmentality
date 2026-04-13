import { GoogleGenerativeAI } from '@google/generative-ai'

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY ?? ''
  if (!apiKey) throw new Error('GEMINI_API_KEY not set')
  const genAI = new GoogleGenerativeAI(apiKey)
  return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
}

export interface GeminiGroupResult {
  groups: string[][]
  commentary: string
}

export async function groupAnswersWithGemini(question: string, answers: string[]): Promise<GeminiGroupResult> {
  if (answers.length === 0) return { groups: [], commentary: '' }
  if (answers.length === 1) return { groups: [answers], commentary: '' }

  const model = getModel()

  const prompt = `You are scoring a casual party game called Flock Together. Players answered: "${question}"

Answers: ${JSON.stringify(answers)}

Do TWO things:

1. GROUP answers that mean the SAME THING, even if written differently. This is a casual phone game -- players type fast and sloppy. Be generous with matching:

ALWAYS group these together:
- Typos/misspellings: "bagette" = "baguette", "chickn" = "chicken"
- Plurals: "dog" = "dogs", "cookie" = "cookies"
- Articles: "a cat" = "cat" = "the cat"
- Abbreviations: "MJ" = "Michael Jordan", "NYC" = "New York" = "new york city"
- Capitalization: "paris" = "Paris"
- Spacing: "ice cream" = "icecream" = "ice-cream"
- Shorthand: "mac and cheese" = "mac & cheese" = "mac n cheese"
- Informal versions: "gonna" = "going to", "fave" = "favorite"
- Close enough for a party game: "chocolate chip" = "chocolate chip cookies"

NEVER group things that are genuinely DIFFERENT answers:
- "Lisa" and "Manon" are DIFFERENT (different people)
- "Pizza" and "Pasta" are DIFFERENT (different foods)
- "BMW" and "Mercedes" are DIFFERENT (different brands)
- "Lion" and "Tiger" are DIFFERENT (different animals)

When in doubt for this casual party game, lean toward GROUPING rather than splitting. Players get frustrated when obvious matches are missed.
Sort groups largest to smallest. Each answer in exactly one group.

2. Write ONE short, funny COMMENTARY sentence (max 15 words) to spark debate among the players. Roast an outlier, note a surprising consensus, or be playfully sarcastic.

Return ONLY valid JSON: {"groups":[["ans1","ans2"],["ans3"]],"commentary":"your witty comment here"}`

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
    },
  })

  const text = result.response.text()
  const parsed = JSON.parse(text)

  if (!parsed.groups || !Array.isArray(parsed.groups)) {
    throw new Error('Invalid Gemini response: missing groups array')
  }

  return { groups: parsed.groups, commentary: parsed.commentary ?? '' }
}

interface GeneratedQuestion {
  text: string
  category: string
}

export async function generateQuestionsFromCategories(categories: string[]): Promise<GeneratedQuestion[]> {
  if (categories.length === 0) return []

  const model = getModel()

  const prompt = `You are writing questions for "Flock Together" -- a mobile party game where players type the SAME answer as the majority on their phones. Generate 10 short questions themed around: ${categories.join(', ')}

LENGTH IS CRITICAL. Every question MUST be under 80 characters. Aim for 40-60. Players read these on a phone screen and answer in seconds. Short = fun. Long = skipped.

GOOD examples for category "Brazil":
- "Samba or bossa nova?" (20ch)
- "Best Brazilian food: feijoada, coxinha, or açaí?" (49ch)
- "Would you rather live in Rio or São Paulo?" (43ch)
- "What animal do you associate with Brazil?" (41ch)
- "Name a famous Brazilian" (24ch)
- "Carnival or Copa do Mundo?" (26ch)

BAD examples (NEVER write questions like these):
- "You're at a bustling Brazilian churrascaria and a server approaches your table with a giant skewer..." (NO -- way too long, nobody reads this)
- "While exploring a hidden cave in the Amazon, you disturb a rare ancient spirit..." (NO -- scenario setup kills the pace)

Use these SHORT question formats (mix them up):
- A or B? -- binary choice: "Cats or dogs?"
- A, B, or C? -- pick one of three: "Pirates, aliens, or ghosts?"
- Best/worst X? -- short superlative: "Most overrated holiday?"
- Would you rather -- SHORT dilemma, no backstory: "Would you rather fight one horse-sized duck or 100 duck-sized horses?"
- Name a... -- open-ended with obvious default: "Name a famous Italian"

TONE: Family-friendly game night. Punchy, funny, lighthearted. All ages welcome -- no alcohol, drugs, clubbing, partying, or adult-only references.

RULES:
- UNDER 80 CHARACTERS. This is the most important rule.
- Do NOT write a setup, backstory, or scenario. Get straight to the question.
- Every question must relate to one of the provided categories
- Every question should have a small answer space where a majority can naturally form
- NEVER ask "what would you do?" -- ask about a specific thing (object, person, food, place)
- NEVER write boring survey questions ("What is the best thing about X?")
- FAMILY FRIENDLY. No alcohol, drugs, clubbing, bars, or adult-only content.
- No racism, sexism, homophobia, ableism. No sexual content.

Return ONLY valid JSON: { "questions": [{ "text": "...", "category": "..." }, ...] }`

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
    },
  })

  const text = result.response.text()
  const parsed = JSON.parse(text)

  const MAX_LENGTH = 100
  const questions: GeneratedQuestion[] = (parsed.questions ?? []).filter(
    (q: GeneratedQuestion) => q.text && q.text.length <= MAX_LENGTH,
  )

  return questions
}
