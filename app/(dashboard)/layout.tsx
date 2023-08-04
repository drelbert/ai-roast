import Navigation from '@/components/Navigation'
import { UserButton } from '@clerk/nextjs'

const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-slate-900 text-white">
      <div className="h-full w-full">
        <header className="h-[60px] border-b border-slate-800">
          <div className="absolute left-4 top-4 text-lg">roastLab</div>
          <nav className="px-4 h-full">
            <div className="h-full w-full px-2 flex items-center ">
              <Navigation userRole={undefined} />
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
