'use client'

import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import ProfileDropdown from '@/app/components/ProfileDropDown'
import Image from 'next/image'

const Header = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const isLoggedIn = !!session

  return (
    <header
      className={
        'sticky top-0 z-50 w-full transition-all duration-300 bg-white shadow-md py-4'
      }
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <h1
            className={`text-xl font-bold  tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-dodger_blue to-[#111cf8]`}
          >
            SkySearch
          </h1>
        </div>

        {!isLoggedIn ? (
          <div className="flex justify-end items-center gap-2">
            <button
              onClick={() => router.push('/sign-in')}
              className={clsx(
                'font-normal transition-colors duration-300 py-1 px-2 rounded-md text-black bg-white border border-border hover:bg-secondary hover:text-secondary-foreground cursor-pointer',
              )}
            >
              signIn
            </button>

            <button
              className={clsx(
                'font-normal transition-colors duration-300 text-primary bg-sunglow  hover:opacity-90 py-1 px-2 rounded-md cursor-pointer',
              )}
              onClick={() => router.push('/register')}
            >
              Register
            </button>
          </div>
        ) : (
          <ProfileDropdown session={session} />
        )}
      </div>
    </header>
  )
}

export default Header
