import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserByClerkID()
  const entry = await prisma.roastEntry.create({
    data: {
      userId: user.id,
      content: 'Enter Roast Details',
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
      // spread operator
      ...analysis,
    },
  })

  // deal with refreshing the current roasts
  revalidatePath('/roast')

  return NextResponse.json({ data: entry })
}
