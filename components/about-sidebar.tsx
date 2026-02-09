"use client"
import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function AboutSidebar() {
  const [email, setEmail] = useState("")
  return (
    <aside className="lg:sticky lg:top-4 h-fit">
      {/* 1) Newsletter */}
      <Card className="mb-4">
        <CardHeader>
          <h3 className="font-medium text-base">💌 get new roles by email</h3>
          <p className="text-xs text-muted-foreground">i’ll only email when there’s something genuinely good.</p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setEmail("")
            }}
            className="flex gap-2"
          >
            <Input
              type="email"
              placeholder="you@hello.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-9"
            />
            <button className="px-3 rounded-md border bg-secondary text-sm hover:bg-secondary/90 underline-offset-2 hover:underline">
              subscribe
            </button>
          </form>
        </CardContent>
      </Card>

      {/* 2) Submit a role */}
      <Card className="mb-3 rounded-lg">
        <CardContent className="py-3 px-4">
          <Link href="/post-job" className="font-medium text-base">
            🪴 hiring? post a role →
          </Link>
        </CardContent>
      </Card>

      {/* 4) Bio at bottom */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full border-2 border-primary/20 overflow-hidden">
              <img
                src="/katie.JPG"
                alt="Katie"
                className="w-full h-full object-cover scale-[1.4]"
                style={{ objectPosition: "0% 50%" }}
              />
            </div>
            <h3 className="font-medium text-base">hii i'm katie!</h3>
          </div>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          <div>
            I made this site because:<br /><br />
            1. every time I speak to a founder/established creator the conversation always ends with, <em>"btw do you know any cracked editors? or someone who could run socials?"</em><br /><br />
            2. demand for creators, editors, videographers, writers, and people who understand social and growth and marketing is growing rapidly<br /><br />
            3. I've been making content since I was 10 and, despite that, had a hard time initially seeing my skills as a real career path. That meant I spent years chasing degrees and jobs that never truly excited me. If you love creating, entrepreneurship, strategy, or growth, I want to help you find your thing. You absolutely can do what you love for a living &lt;3
          </div>
          <div className="pt-3 border-t mt-3">
            <p className="text-muted-foreground">
              Want to chat? Reach out at{" "}
              <a href="mailto:katie@creatorcareers.com" className="text-primary hover:underline">
                katie@creatorcareers.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
