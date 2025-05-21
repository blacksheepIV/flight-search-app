import RegisterCard from '@/app/components/RegisterCard'
import { redirectIfAuthenticated } from '@/app/lib/redirectIfAuthenticated'

export default async function RegisterPage() {
  await redirectIfAuthenticated()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 ">
      <RegisterCard />
    </div>
  )
}
