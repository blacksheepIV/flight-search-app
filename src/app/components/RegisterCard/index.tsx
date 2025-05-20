'use client'
import { signIn } from 'next-auth/react'
import Card from '@/app/components/common/Card'

export default function RegisterCard() {
  return (
    <Card>
      <div className="flex flex-col p-6 space-y-1 text-center">
        <h3 className="tracking-tight text-2xl font-bold">Create an account</h3>
        <p className="text-sm text-muted-foreground">
          Register using your GitHub account
        </p>
      </div>

      <div className="p-6 pt-0 flex flex-col gap-4">
        <button
          onClick={() => signIn('github', { callbackUrl: '/' })}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
        >
          {/* <GithubIcon className="mr-2 h-4 w-4" /> */}
          Register with GitHub
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase"></div>
        </div>
      </div>

      <div className="items-center p-6 pt-0 flex flex-col gap-4">
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <a
            href="/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </a>
        </p>
      </div>
    </Card>
  )
}
