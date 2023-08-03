import { getAdminUserByClerkID } from '@/utils/auth'
import Link from 'next/link'

// const links = [
//   { label: 'Roasts', href: '/roast' },
//   { label: 'History', href: '/history' },
//   { label: 'Admin', href: '/roasts' },
// ]

const Navigation = async ({ userRole }) => {
  const isAdmin = await getAdminUserByClerkID()

  return (
    <nav className="px-4 m-4">
      <ul className="px-4">
        <li className="text-xl px-2 py-2">
          {' '}
          <Link href="/roast">Roasts</Link>{' '}
        </li>
        <li className="text-xl px-2 py-2">
          {' '}
          <Link href="/history">Insights</Link>{' '}
        </li>

        <li className="text-xl px-2 py-2">
          {' '}
          {isAdmin === 'ADMIN' && <Link href="/admin">Admin</Link>}{' '}
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
