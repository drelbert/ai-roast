import { prisma } from './db'

export const getUsers = async () => {
  const users = await prisma.user.findMany({})

  console.log(users)

  return users
}
