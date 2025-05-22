"use client";

import Link from "next/link";
import { SignUpButton, useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTASection() {
  const { isSignedIn } = useUser();

  return (
    <section className="container py-20">
      <div className="rounded-xl bg-gradient-to-r from-primary/80 to-primary p-8 md:p-16 text-center">
        <div className="mx-auto max-w-3xl space-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Start capturing meeting insights today
          </h2>
          <p className="text-lg text-white/90">
            Join thousands of teams using Memora to make their meetings more productive and actionable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isSignedIn ? (
              <Button size="lg" variant="secondary" asChild className="group">
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            ) : (
              <>
                <SignUpButton mode="modal">
                  <Button size="lg" variant="secondary" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </SignUpButton>
                <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10">
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}