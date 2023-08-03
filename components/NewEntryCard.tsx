'use client'
// client component as its interactive
// pre-rendered on server and hydrated on the client

// note the import/use of the createNewEntry from utils/api

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

const NewEntryCard = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const data = await createNewEntry()
    router.push(`/roast/${data.id}`)
  }

  return (
    <div className="cursor-pointer" onClick={handleOnClick}>
      <div>
        <button className="bg-slate-500 m-4 px-4 py-2 rounded-lg text-lg text-sky-400">
          New Roast
        </button>
      </div>
    </div>
  )
}

export default NewEntryCard
