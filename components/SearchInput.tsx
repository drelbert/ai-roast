'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

type SearchInputProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>
}
const SearchInput = ({ onChange }: SearchInputProps) => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()

  const onRevision = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // simple loading state
    setLoading(true)

    const answer = await askQuestion(value)
    setResponse(answer)
    // clear input
    setValue('')
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-between">
      <form onSubmit={handleSubmit} className="overflow-hidden w-2/5">
        <input
          disabled={loading}
          onChange={onRevision}
          value={value}
          type="text"
          placeholder="Search Roasts"
          className=" px-2 py-2 text-lg text-white rounded-lg bg-slate-500 hover:bg-slate-700"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-500 m-4 px-4 py-2 rounded-lg text-lg text-white hover:text-sky-400 focus:ring-slate-500"
        >
          Submit
        </button>
      </form>
      <div className="w-3/5 text-white">
        {loading && <div>...loading</div>}
        {response && <div>{response}</div>}
      </div>
    </div>
  )
}

export default SearchInput
