'use client'

import clsx from 'clsx'
import React, { useState, useEffect } from 'react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

        <div className="flex justify-end items-center gap-2">
          <button
            className={clsx(
              'font-normal transition-colors duration-300 text-black bg-white hover:text-dodger_blue-400 p-1.5 rounded-sm cursor-pointer',
              { 'bg-sunglow-600': isScrolled },
            )}
          >
            Register
          </button>
          <button
            className={clsx(
              'font-normal transition-colors duration-300 p-1.5 rounded-sm text-black bg-white hover:text-dodger_blue-400 cursor-pointer',
              { 'bg-sunglow-600': isScrolled },
            )}
          >
            signIn
          </button>
        </div>
      </div>
      {/* TODO: show profile if user session already exists  */}
    </header>
  )
}

export default Header
