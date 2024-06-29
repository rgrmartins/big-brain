'use client'

import { SignInButton, UserButton } from "@clerk/nextjs"
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react"
import { Loader2 } from "lucide-react"

const HeaderActions = () => {
  return (
    <>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
      <AuthLoading>
         <Loader2 className="animate-spin" />
      </AuthLoading>
    </>
  )
}

export default HeaderActions