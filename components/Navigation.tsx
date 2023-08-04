import { getAdminUserByClerkID } from '@/utils/auth'
import Link from 'next/link'

const Navigation = async ({ userRole }) => {
  const isAdmin = await getAdminUserByClerkID()

  return (
    <div className="w-screen ">
      <ul className="px-4 flex flex-row justify-end">
        <li className="text-sm px-2 py-2">
          {' '}
          <Link href="/roast">Roasts</Link>{' '}
        </li>
        <li className="text-sm px-2 py-2">
          {' '}
          <Link href="/history">Insights</Link>{' '}
        </li>

        <li className="text-sm px-2 py-2">
          {' '}
          {isAdmin === 'ADMIN' && <Link href="/admin">Admin</Link>}{' '}
        </li>
      </ul>
    </div>
  )
}

export default Navigation
