// using this page as an api route
import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  // get the user Id from Clerk
  const user = await currentUser()
  // console.log(user)
  // does user exist in db?
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  })

  // create new user as there is no match
  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    })
  }
  redirect('/roast')
}

const NewUser = async () => {
  await createNewUser()

  return <div>...loading</div>
}

export default NewUser
