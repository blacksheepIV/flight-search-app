import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import 'rc-slider/assets/index.css'
import Providers from '@/app/context/Providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: [
    '100', // Thin
    '200', // Extra Light
    '300', // Light
    '400', // Regular
    '500', // Medium
    '600', // Semi Bold
    '700', // Bold
    '800', // Extra Bold
    '900', // Black
  ],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'skysearch',
  description:
    'Modern flight search app built with Next.js, Tailwind CSS, and NextAuth. Search, filter, and bookmark flights easily.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <link
        rel="icon"
        type="image/png"
        href="/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <meta name="apple-mobile-web-app-title" content="skysearch" />
      <link rel="manifest" href="/site.webmanifest" />

      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <Providers session={session}>
          <main className="bg-white w-full min-h-screen flex flex-col">
            <Header />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  )
}
