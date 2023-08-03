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

  return <div>The Admin View</div>
}

export default AdminPage
