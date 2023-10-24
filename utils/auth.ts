import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export const getUserByClerkID = async () => {
  const { userId } = await auth()

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  })

  return user
}

export const getAdminUserByClerkID = async () => {
  const { userId } = await auth()
  try {
    const admin = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        role: true,
      },
    })

    return admin.role as 'ADMIN'
  } catch (error) {
    // console.log('Error fetching user role:', error)
    throw error
  }
}
