import Header from '@/app/components/Header'
import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/route'

//import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }
  return (
    <main className="bg-white w-full min-h-screen flex flex-col">
      <Header />
    </main>
  )
}
