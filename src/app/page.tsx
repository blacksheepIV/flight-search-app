import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

//import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }
  return (
    <main className="bg-white w-full min-h-screen flex flex-col">
      <Header />
      <Footer />
    </main>
  )
}
