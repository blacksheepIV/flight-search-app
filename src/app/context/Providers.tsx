'use client'

import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ReactNode } from 'react'
import { Session } from 'next-auth'
import ToastProvider from './ToastProvider'

export default function Providers({
  children,
  session,
}: {
  children: ReactNode
  session: Session | null
}) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        {children}
        <ToastProvider />
      </SessionProvider>
    </QueryClientProvider>
  )
}
