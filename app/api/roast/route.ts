import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse, NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

export const POST = async (request: NextRequest) => {
  const user = await getUserByClerkID()
  const entry = await prisma.roastEntry.create({
    data: {
      userId: user.id,
      content: '',
      analysis: {},
    },
  })

  // will return the JS object from the parser
  const analysis = await analyze(entry.content)
  // save to db with new analysis entry
  await prisma.analysis.create({
    // todo data is highlighted due to possible item undefined
    data: {
      userId: user.id,
      entryId: entry.id,
      // spread operator to map the whole object
      ...analysis,
    },
  })

  // deal with refreshing the current roasts
  const path = request.nextUrl.searchParams.get('path') || '/roast'
  revalidatePath(path)

  return NextResponse.json({ data: entry, revalidated: true })
}
