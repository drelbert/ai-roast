import NewGroup from '@/components/NewGroup'
import { getAdminUserByClerkID } from '@/utils/auth'
import { redirect } from 'next/navigation'

const verfiyAdmin = async () => {
  const user = await getAdminUserByClerkID()

  if (user != 'ADMIN') {
    redirect('/roast')
  }
}

const AdminPage = async () => {
  await verfiyAdmin()

  return (
    <div>
      <h2 className="text-3xl py-2 px-4">Admin</h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-4 bg-slate-600/10 h-full rounded-xl m-4 ">
          <NewGroup />
        </div>
        <div className="p-4 bg-slate-600/10 h-full rounded-xl m-4 ">To do</div>
      </div>
    </div>
  )
}

export default AdminPage
