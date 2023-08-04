import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import SearchInput from '@/components/SearchInput'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserByClerkID()
  const entries = await prisma.roastEntry.findMany({
    // model query options
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })

  return entries
}

const RoastPage = async () => {
  const entries = await getEntries()
  console.log(`entries are`, entries)

  return (
    <div>
      <div>
        <h2 className="text-3xl py-2 px-4">Roasts</h2>
        <div className="p-4 bg-slate-600/10 h-full rounded-xl m-4">
          <SearchInput />
        </div>

        <div className="gap-2 p-4 bg-slate-600/10 h-full rounded-xl m-4">
          <div>
            <NewEntryCard />
          </div>

          <div className="text-white">
            {entries.map((entry) => (
              <Link href={`/roast/${entry.id}`} key={entry.id}>
                <EntryCard entry={entry} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoastPage
