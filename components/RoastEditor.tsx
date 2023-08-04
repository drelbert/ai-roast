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
    <div>
      <div className=""></div>
      <div className="w-full h-96 grid md:grid-cols-3">
        <div className="col-span-2 m-2 p-4 bg-slate-600">
          <p>
            Enter roast details such as bean name, roast time, roast profile and
            any other relevant data.
          </p>
          {isLoading && <div>...Loading</div>}
          <textarea
            className="w-full h-64 p-8 text-lg text-white rounded-md bg-slate-700"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            name="roast"
          />
        </div>

        <div className="md:cols-span-2">
          <div
            className="px-6 py-8 rounded-md m-2"
            style={{ backgroundColor: color }}
          >
            <h2 className="text-2xl text-white">Sentiment</h2>
          </div>

          <div className="rounded-md m-2 text-white bg-slate-700">
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
    </div>
  )
}

export default RoastEditor
