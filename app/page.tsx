import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()

  let href = userId ? '/roast' : '/new-user'
  // alt syntax
  //  let href = "/new-user"
  //  if (userId) href = '/roast'
  //  else
  //  if (adminUserId) href = "/admin"

  return (
    <div className="w-screen h-screen bg-black ">
      <div className="w-full h-full flex justify-center items-center max-w-xl mx-auto">
        <div>
          <h1 className="text-6xl text-white/80 mb-6">Roast with AI</h1>
          <p className="text-xl text-white/60 mb-6">
            Add roast data, leverage ai to make sense of the patterns.
          </p>
          <Link href={href}>
            <button
              type="button"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
