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

  const prompt = `You are writing questions for "Flock Together" -- an adult party game where players try to write the SAME answer as the majority. Generate 25 questions themed around these categories: ${categories.join(', ')}

IMPORTANT: Use each category as FLAVOR, not the whole question.
- BAD: "Name a Disney villain." (flat survey question)
- GOOD: "Which Disney villain would actually be a great roommate?"
- BAD: "What is a popular Marvel movie?"
- GOOD: "Which Avenger would get fired from a real job first?"

TONE: Adult game night. Mildly edgy, slightly gross, two-drinks-in humor. Make players laugh, squirm, or debate.

Generate across these styles (mix them up):
- 5 Absurd Scenario Pick: give 3-4 funny options in the question itself
- 4 Spicy superlatives: "What is the most/worst/best [constrained noun]..."
- 4 Would You Rather: binary, genuinely hard dilemma
- 4 Mildly Unhinged: slightly gross or dark, always funny
- 4 Obvious Answer: strong default that feels too basic to say
- 4 Constrained Scenario: paint a vivid scene, ask about a specific THING (not "what do you do?")

RULES:
- Every question MUST relate to one of the provided categories
- NEVER ask "what would you do?" or "what is your move?" -- always ask about a specific noun (object, person, food, place)
- NEVER write boring survey questions ("What is the best thing about X?")
- NEVER write personal memory questions ("What is your favorite X memory?")
- Every question should have a finite answer space where a majority can form
- Every question must pass the retellability test: would someone describe this round to a friend?
- HARD LIMITS: No racism, sexism, homophobia, ableism. No explicit sexual content.

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
