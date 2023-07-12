'use client'
import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

// client component as its interactive
// pre-rendered on server and hydrated on the client

const RoastEditor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  // state manager to get new analysis
  const [analysis, setAnalysis] = useState(entry.analysis)

  // destructure to use below
  // this is the first instance of analysis
  // and onSave -> updateEntry causes a re render
  const { roast, summary, negative, color, subject } = analysis
  const roastData = [
    {
      name: 'Summary',
      value: summary,
    },
    {
      name: 'Subject',
      value: subject,
    },
    {
      // aka mood
      name: 'Roast',
      value: roast,
    },
    {
      name: 'Negative',
      value: negative ? 'True' : 'False',
    },
  ]

  // callsite
  useAutosave({
    // pass data to watch
    // when function detects change to value
    // issues a callback
    data: value,
    // pass in function to call upon state change
    // _value and value are the same
    // _value allows for the use of the latest value
    // if value was used in the fn, it would be variable shadowing
    onSave: async (_value) => {
      setIsLoading(true)
      // passing two params to updateEntry the id and content as _value
      const data = await updateEntry(entry.id, _value)
      //
      setAnalysis(data.analysis)
      // done set to false
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-96 grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && <div>...Loading</div>}
        <textarea
          className="w-full h-full p-8 text-lg border-4 outline-black"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name="roast"
        />
      </div>

      <div className="border-2 border-black/10">
        <div className=" px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Sentiment</h2>
        </div>
        <div>
          <ul>
            {roastData.map((e) => (
              <li
                key={e.name}
                className="px-2 py-4 flex items-center justify-between border-b  border-black/10"
              >
                <span className="text-lg font-semibold">{e.name}</span>
                <span>{e.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RoastEditor