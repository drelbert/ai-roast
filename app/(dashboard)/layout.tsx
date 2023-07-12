import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const links = [
  { label: 'Roasts', href: '/roast' },
  { label: 'History', href: '/history' },
  { label: 'Settings', href: '/settings' },
]

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen relative">
      <aside className="absolute left-0 top-0 h-full w-[200px] border-r border-black/10">
        <div className="px-4 my-4">
          <span className="text-3xl">Roast</span>
        </div>
        <div>
          <ul className="px-4">
            {links.map((link) => (
              <li key={link.href} className="text-xl px-2 py-2 ">
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="ml-[200px] h-full w-[calc(100vw-200px)]">
        <header className="h-[60px] border-b border-black/10">
          <nav className="px-4 h-full">
            <div className="h-full w-full px-6 flex items-center justify-end">
              <UserButton afterSignOutUrl="/" />
            </div>
          </nav>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
