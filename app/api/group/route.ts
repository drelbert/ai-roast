// enabling the post route for new group

import { prisma } from '@/utils/db'
import { getUsers } from '@/utils/users'
import { NextResponse } from 'next/server'

export const POST = async () => {
  //TODO
  // do users need to be added here?
  // with a utils/users/getUsers() function?
  const users = await getUsers()

  const group = prisma.group.create({
    data: {
      title: 'First Group',
    },
    users: {
      connect: {
        id: users.id,
      },
    },
  })
  // send back an object with a data property
  return NextResponse.json({ data: group })
}
