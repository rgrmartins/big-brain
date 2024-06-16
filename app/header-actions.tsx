'use client'

import { SignInButton, UserButton } from "@clerk/nextjs"
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react"

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
        Loading...
      </AuthLoading>
    </>
  )
}

export default HeaderActions