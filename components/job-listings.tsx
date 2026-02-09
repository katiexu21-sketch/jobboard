"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { mockJobs } from "@/lib/mock-data"
import { Heart } from "lucide-react"

const categories = ["All", "UGC", "Video Editing", "Content Creation", "Social Media", "Design", "Writing"]

function isNew(postedAt: string): boolean {
  // crude parser for mock data like "2 days ago", "1 week ago"
  const match = postedAt.match(/(\d+)\s+(day|week|month)/i)
  if (!match) return false
  const num = parseInt(match[1], 10)
  const unit = match[2].toLowerCase()
  if (unit.startsWith("day")) return num <= 3
  if (unit.startsWith("week")) return num === 0 || num === 1 ? false : false // weeks are not "new"
  return false
}

function isArchived(postedAt: string): boolean {
  // grey out if >= 3 weeks or mentions month(s)
  const week = postedAt.match(/(\d+)\s+week/i)
  const month = /(month)/i.test(postedAt)
  return (week && parseInt(week[1], 10) >= 3) || month
}

export function JobListings() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [saved, setSaved] = useState<Record<string, boolean>>({})

  function toggleSaved(id: string) {
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => selectedCategory === "All" || job.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section id="jobs">
      <div className="pl-6 border-l border-neutral-200/70">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="uppercase tracking-wide">filter:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={[
                  "rounded-full px-3 py-1 text-[12px] border",
                  selectedCategory === category
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-transparent text-muted-foreground hover:text-foreground border-border",
                ].join(" ")}
              >
                {category.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {filteredJobs.map((job) => {
          const showNew = isNew(job.postedAt)
          const archived = isArchived(job.postedAt)

          return (
            <div key={job.id}>
            <a
              href={`/jobs/${job.id}`}
              className={[
                "group relative block rounded-md border bg-card px-5 py-5",
                "border-neutral-200/70 hover:bg-neutral-50 hover:-translate-y-[1px] transition",
                "max-w-3xl mb-4",
                archived ? "opacity-70" : "",
              ].join(" ")}
            >
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  aria-label="save"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleSaved(job.id)
                  }}
                  className="text-neutral-300 hover:text-rose-400 transition-transform hover:scale-110"
                >
                  <Heart className={["w-4 h-4", saved[job.id] ? "fill-rose-400 text-rose-400" : ""].join(" ")} />
                </button>
                {showNew && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">✨ new</span>
                )}
                <span className="text-xs text-neutral-500">{job.postedAt}</span>
              </div>

              <div className="space-y-1 flex gap-6">
                {job.avatar && (
                  <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-neutral-200/70">
                    <img src={job.avatar} alt={job.company} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-[17px] font-semibold tracking-tight leading-snug group-hover:underline lowercase">
                    {job.title}
                  </h3>
                  <p className="text-sm text-neutral-600">shared by {job.company}</p>
                  <p className="text-[15px] text-neutral-700 leading-relaxed">
                    {job.description.length > 160 ? job.description.slice(0, 160) + "…" : job.description}
                  </p>
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {/* only 2 chips: location + type */}
                      <Badge variant="secondary" className="rounded-full text-[12px] bg-[#F0EDE9] text-foreground border-0">
                        {job.location.toLowerCase().includes("remote") ? "remote" : job.location.toLowerCase()}
                      </Badge>
                      <Badge variant="secondary" className="rounded-full text-[12px] bg-[#F0EDE9] text-foreground border-0">
                        {job.type.toLowerCase()}
                      </Badge>
                    </div>
                    <span className="text-sm text-neutral-700 underline-offset-2 transition group-hover:underline hover:text-rose-600">learn more</span>
                  </div>
                </div>
              </div>
            </a>
            <div className="border-t border-dotted border-neutral-200/70 my-3" />
            </div>
          )
        })}
      </div>

      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No jobs found. Try changing your filters or check back later!</p>
        </div>
      )}
    </section>
  )
}
