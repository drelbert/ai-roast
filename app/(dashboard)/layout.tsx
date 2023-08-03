import Navigation from '@/components/Navigation'
import { UserButton } from '@clerk/nextjs'

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen relative bg-slate-800 text-sky-400">
      <aside className="absolute left-0 top-0 h-full w-[200px]  ">
        <div className="px-4 my-4">
          <span className="text-3xl ">Roast Lab</span>
        </div>
        <div className="text-white">
          <Navigation userRole={undefined} />
        </div>
      </aside>

      <div className="ml-[200px] h-full w-[calc(100vw-200px)]">
        <header className="h-[60px]  ">
          <nav className="px-4 h-full">
            <div className="h-full w-full px-2 flex items-center justify-end">
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
