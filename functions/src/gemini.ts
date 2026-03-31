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

  const prompt = `You are scoring a party game called Flock Together. Players answered: "${question}"

Answers: ${JSON.stringify(answers)}

Do TWO things:

1. GROUP answers that are the SAME SPECIFIC ANSWER, just written differently. Only group together if they clearly mean the exact same thing:
- Typos/misspellings: "bagette" = "baguette", "chickn" = "chicken"
- Plurals: "dog" = "dogs"
- Articles: "a cat" = "cat" = "the cat"
- Abbreviations: "MJ" = "Michael Jordan" (only if unambiguous in context)
- Capitalization: "paris" = "Paris"

NEVER group different things that are merely in the same category. For example:
- "Lisa" and "Manon" are DIFFERENT (both K-pop stars, but different people)
- "Pizza" and "Pasta" are DIFFERENT (both Italian food, but different foods)
- "BMW" and "Mercedes" are DIFFERENT (both German cars, but different brands)
- "Lion" and "Tiger" are DIFFERENT (both big cats, but different animals)

When in doubt, keep answers in SEPARATE groups. The game rewards giving the SAME answer, not similar ones.
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

  const prompt = `Generate 25 fun Flock Together party game questions themed around these categories: ${categories.join(', ')}

Questions should ask for opinions, favorites, or associations where many people are likely to give the same answer. Mix categories throughout. Vary question styles (favorites, "name one...", "what would you...", etc.)

Return ONLY valid JSON: { "questions": [{ "text": "...", "category": "..." }, ...] }`

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
    },
  })

  const text = result.response.text()
  const parsed = JSON.parse(text)
  return parsed.questions
}
