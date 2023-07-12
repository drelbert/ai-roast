import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import SearchInput from '@/components/SearchInput'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserByClerkID()
  const entries = await prisma.roastEntry.findMany({
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
      <div className="p-10 bg-zinc-400/10 h-full">
        <h2 className="text-3xl mb-8">Roasts</h2>
        <div className="my-8">
          <SearchInput />
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          <div>
            <NewEntryCard />
          </div>
          {entries.map((entry) => (
            <Link href={`/roast/${entry.id}`} key={entry.id}>
              <EntryCard entry={entry} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RoastPage
