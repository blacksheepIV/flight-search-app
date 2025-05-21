import { redirectIfAuthenticated } from '@/app/lib/redirectIfAuthenticated'

import SignInCard from '@/app/components/SignInCard'

export default async function SignInPage() {
  await redirectIfAuthenticated()
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <SignInCard />
    </div>
  )
}
