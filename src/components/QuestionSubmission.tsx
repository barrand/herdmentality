import { useState } from 'react'

interface Props {
  onSubmit: (question: string) => void
  submittedQuestions: string[]
}

export default function QuestionSubmission({ onSubmit, submittedQuestions }: Props) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (!text.trim()) return
    onSubmit(text.trim())
    setText('')
  }

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wide">
        Submit a Question (optional)
      </h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a question..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="flex-1 px-3 py-2 rounded-lg border border-green-200 bg-white text-sm focus:border-green-500 focus:outline-none"
          maxLength={200}
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="px-4 py-2 text-sm font-bold text-white bg-green-600 rounded-lg disabled:opacity-50"
        >
          +
        </button>
      </div>
      {submittedQuestions.length > 0 && (
        <ul className="space-y-1">
          {submittedQuestions.map((q, i) => (
            <li key={i} className="text-sm text-green-600 italic">"{q}"</li>
          ))}
        </ul>
      )}
    </div>
  )
}
