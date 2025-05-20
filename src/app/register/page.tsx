import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/lib/api/auth'

import RegisterCard from '@/app/components/RegisterCard'

export default async function RegisterPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 ">
      <RegisterCard />
    </div>
  )
}
