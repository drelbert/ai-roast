import RoastEditor from '@/components/RoastEditor'
import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

// get the entry
const getEntry = async (id) => {
  const user = await getUserByClerkID()

  const entry = await prisma.roastEntry.findUnique({
    where: {
      // using the compound index
      userId_id: {
        userId: user.id,
        id,
      },
    },
    // pass in data to UI
    // include is like a join in sql
    include: {
      analysis: true,
    },
  })

  // use for testing
  // console.log(
  //   await analyze(
  //     `The Burindi was a terrible result, made it to first crack and will not brew up well.  :)`
  //   )
  // )

  return entry
}

// passing in params as this is a dynamic route
const RoastEntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)

  return (
    <div className="w-full h-full">
      {/* passing props to the client component from this server component */}
      <RoastEditor entry={entry} />
    </div>
  )
}

export default RoastEntryPage
