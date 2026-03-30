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

  const prompt = `You are a witty host scoring a party game called Flock Together. Players answered the question: "${question}"

The submitted answers are: ${JSON.stringify(answers)}

Do TWO things:

1. GROUP answers by semantic equivalence. Answers that refer to the same concept belong in the same group, even if:
- Different spelling or typos (e.g. "bagette" and "baguette")
- Plurals vs singular (e.g. "dog" and "dogs")
- Articles added (e.g. "a cat" and "cat")
- Synonyms (e.g. "puppy" and "dog")
- Abbreviations or shorthand
- Different capitalization
Sort groups from largest to smallest. Each answer must appear in exactly one group.

2. Write a short, funny COMMENTARY (1-2 sentences) to spark debate among the players. You could:
- Point out an obvious popular answer everyone somehow missed
- Roast a bizarre outlier answer
- Note a surprising consensus
- Question someone's sanity for their answer choice
- Be playfully sarcastic
Keep it brief, punchy, and fun. Address the players directly.

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
