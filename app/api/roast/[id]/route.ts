// making an update, not a PUT/replace

import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

// access to the params with ( {params})
// which is an arg object
export const PATCH = async (request: Request, { params }) => {
  // get the body
  const { content } = await request.json()

  //update the entry by getting the user
  const user = await getUserByClerkID()

  const updatedEntry = await prisma.roastEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    // add data for the analysis to update state
    data: {
      content,
    },
  })

  // update the analysis
  // ... used to include all object properties
  const analysis = await analyze(updatedEntry.content)

  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      // spread operator
      ...analysis,
    },
    // highlighted due to types using "or undefined"
    update: analysis,
  })

  // console.log(updated)

  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
}
