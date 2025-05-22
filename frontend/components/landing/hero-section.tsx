"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Upload } from "lucide-react";
import { SignUpButton, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  const { isSignedIn } = useUser();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="overflow-hidden bg-gradient-to-b from-background to-muted/80">
      <div className="p-5 container relative z-10 py-20 md:py-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                AI-Powered Meeting{" "}
                <span className="relative whitespace-nowrap">
                  <span className="relative text-primary">Assistance</span>
                </span>{" "}
                for Modern Teams
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
                Transcribe, summarize, and index your meetings with AI. Never miss a detail again with Memora.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {isSignedIn ? (
                <Button size="lg" asChild>
                  <Link href="/dashboard" className="group">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              ) : (
                <SignUpButton mode="modal">
                  <Button size="lg" className="group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </SignUpButton>
              )}
              <Button variant="outline" size="lg" asChild>
                <Link href="/demo">See Demo</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((id) => (
                  <div
                    key={id}
                    className="inline-block h-8 w-8 rounded-full bg-muted ring-2 ring-background overflow-hidden"
                  >
                    <Image
                      src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                      alt="User"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">500+</span> teams already using Memora
              </div>
            </div>
          </div>
          <div
            className="relative rounded-lg bg-gradient-to-r from-muted to-muted/40 p-6 shadow-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="mx-auto max-w-md">
              <div className="space-y-4">
                <div className="flex items-center justify-center h-32 rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/40 p-4 relative">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium">
                      Drag and drop your audio file or{" "}
                      <span className="text-primary">browse</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      MP3, WAV, M4A, up to 500MB
                    </p>
                  </div>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-primary/5 rounded-md flex items-center justify-center"
                    >
                      <Button size="sm" className="z-10">
                        Upload Audio
                      </Button>
                    </motion.div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">Recent Meetings</h3>
                    <p className="text-xs text-muted-foreground">View All</p>
                  </div>
                  {[
                    "Weekly Team Sync",
                    "Product Planning",
                    "Client Onboarding",
                  ].map((meeting, i) => (
                    <div
                      key={i}
                      className="rounded-md border bg-card p-3 text-sm hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex justify-between">
                        <p>{meeting}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            Date.now() - 86400000 * (i + 1)
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background opacity-60"></div>
      </div>
    </div>
  );
}