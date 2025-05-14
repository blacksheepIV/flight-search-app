'use client'

import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        <button
          onClick={() => signIn('github', { callbackUrl: '/' })}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  )
}
