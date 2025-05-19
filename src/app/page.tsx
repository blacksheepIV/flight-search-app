import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import FlightSearchSection from '@/app/features/flight-search/FlightSearchSection'
//import { getServerSession } from 'next-auth'

//import { redirect } from 'next/navigation'
//import { authOptions } from '@/app/api/auth/[...nextauth]/route'

//import Image from "next/image";

export default async function Home() {
  // const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect('/login')
  // }
  return (
    <main className="bg-white w-full min-h-screen flex flex-col">
      <Header />
      <div className="px-1 pb-[282px] md:my-5 max-w-5xl mx-auto ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-alice_blue-100 mb-2 ">
            Find your next flight
          </h1>
          <p className="text-gray-600">
            Search, compare, and book flights from hundreds of airlines
          </p>
        </div>
        <FlightSearchSection />
      </div>
      <Footer />
    </main>
  )
}
