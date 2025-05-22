'use client'

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UserServerButton() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return (
      <>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <UserButton afterSignOutUrl="/" />
      </>
    );
  }

  return (
    <>
      <SignInButton mode="modal">
        <Button variant="ghost">Sign In</Button>
      </SignInButton>
      <SignUpButton mode="modal">
        <Button>Get Started</Button>
      </SignUpButton>
    </>
  );
}
