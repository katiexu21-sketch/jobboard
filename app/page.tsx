import { JobListings } from "@/components/job-listings"
import { Hero } from "@/components/hero"
import { AboutSidebar } from "@/components/about-sidebar"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          <JobListings />
          <AboutSidebar />
        </div>
      </div>
    </main>
  )
}
