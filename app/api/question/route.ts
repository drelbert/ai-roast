import { qa } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const POST = async (request) => {
  // get the question from the request by destructuring
  const { question } = await request.json()
  // util to get user
  const user = await getUserByClerkID()

  const entries = await prisma.roastEntry.findMany({
    where: {
      userId: user.id,
    },
    // control the memory footprint by selecting only 3 props
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })
  const answer = await qa(question, entries)

  return NextResponse.json({ data: answer })
}
