'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const SearchInput = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()

  const onChange = (e) => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          disabled={loading}
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Search for roast results"
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-300 m-4 px-4 py-2 rounded-lg text-lg"
        >
          Submit
        </button>
      </form>
      {loading && <div>...loading</div>}
      {response && <div>{response}</div>}
    </div>
  )
}

export default SearchInput
