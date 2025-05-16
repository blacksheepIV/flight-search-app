import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
//import { getServerSession } from 'next-auth'

//import { redirect } from 'next/navigation'
//import { authOptions } from '@/app/api/auth/[...nextauth]/route'

//import Image from "next/image";
import FlightSearchPanel from '@/app/components/FlightSearchPanel/index'

export default async function Home() {
  // const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect('/login')
  // }
  return (
    <main className="bg-white w-full min-h-screen flex flex-col">
      <Header />
      <div className="my-5 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dodger_blue-400 mb-2">
            Find your next flight
          </h1>
          <p className="text-gray-600">
            Search, compare, and book flights from hundreds of airlines
          </p>
        </div>
        <FlightSearchPanel />
      </div>
      <Footer />
    </main>
  )
}
