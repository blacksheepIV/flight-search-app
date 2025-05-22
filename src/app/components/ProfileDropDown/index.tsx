'use client'

import { useState, useRef, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import Image from 'next/image'

type Props = {
  session: Session
}

const ProfileDropdown: React.FC<Props> = ({ session }) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 focus:outline-none cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full">
          <Image
            src={session.user?.image || '/avatar.png'}
            alt="Profile"
            width={32}
            height={32}
            style={{ borderRadius: '50%' }}
          />
        </div>
        <span className="text-sm font-medium ">
          {session.user?.name || 'User'}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
          <ul className="py-1">
            <li>
              <a
                href="/bookmarks"
                className="block px-4 py-2 text-sm hover:bg-alice_blue-800"
              >
                Bookmarks
              </a>
            </li>
            <li>
              <a
                href="/searches"
                className="block px-4 py-2 text-sm hover:bg-alice_blue-800"
              >
                Saved Searches
              </a>
            </li>
            <li>
              <button
                onClick={() => signOut()}
                className="w-full text-left px-4 py-2 text-sm hover:bg-alice_blue-800"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
export default ProfileDropdown
