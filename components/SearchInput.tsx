'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const SearchRoasts = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()

  // onchange handler to get the event object
  const onChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = async (event: { preventDefault: any }) => {
    event.preventDefault()
    setLoading(true)

    const answer = await askQuestion(value)
    setResponse(answer)
    setValue('')
    setLoading(false)
  }

  return (
    <div className="grid grid-row-3 gap-4">
      <div className="row-span-1">
        <form onSubmit={handleSubmit}>
          <input
            disabled={loading}
            onChange={onChange}
            value={value}
            type="text"
            placeholder="Search Your Roasts"
            className="border-black/20 px-4 py-6 text-lg rounded-lg text-black w-full h-10"
          />
          {/* <button
            disabled={loading}
            type="submit"
            className="bg-slate-500 m-4 px-4 py-2 rounded-lg text-lg text-white hover:text-sky-400"
          >
            Submit
          </button> */}
        </form>
      </div>
      <div className="row-span-2 rounded-lg text-white p-2">
        {loading && <div>...LOADING</div>}
        {response && <div> {response}</div>}
      </div>
    </div>
  )
}

export default SearchRoasts
