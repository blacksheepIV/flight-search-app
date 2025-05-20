'use client'

import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import ProfileDropdown from '@/app/components/ProfileDropDown'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isLoggedIn = !!session

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-gradient-to-r from-dodger_blue-500 to-dodger_blue-600 py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <h1
            className={`text-xl font-bold ${
              isScrolled ? 'text-dodger_blue-500' : 'text-white'
            } transition-colors duration-300`}
          >
            SkySearch
          </h1>
        </div>

        {!isLoggedIn ? (
          <div className="flex justify-end items-center gap-2">
            <button
              className={clsx(
                'font-normal transition-colors duration-300 text-black bg-sunglow-500 hover:text-white p-1.5 rounded-sm cursor-pointer',
                { 'bg-white': isScrolled },
              )}
              onClick={() => router.push('/register')}
            >
              Register
            </button>
            <button
              onClick={() => router.push('/sign-in')}
              className={clsx(
                'font-normal transition-colors duration-300 p-1.5 rounded-sm text-black bg-white hover:text-dodger_blue-400 cursor-pointer',
                { 'bg-sunglow-600': isScrolled },
              )}
            >
              signIn
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
