import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/lib/auth'

export async function redirectIfAuthenticated() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }
}
