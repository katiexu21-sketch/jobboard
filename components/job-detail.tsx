import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, DollarSign, Briefcase, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Job } from "@/lib/types"

interface JobDetailProps {
  job: Job
}

export function JobDetail({ job }: JobDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: simplified Reddit-style post */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {job.company?.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">{job.company}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {job.postedAt}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <h1 className="font-bold text-2xl md:text-3xl leading-tight">
                  {job.title}
                </h1>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right: details + apply */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="pt-6 space-y-5">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span>{job.salary || "Comp based on experience"}</span>
                  </div>
                </div>

                <Separator />

                {job.applyUrl ? (
                  <Button asChild className="w-full" size="lg">
                    <Link href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                      apply now
                    </Link>
                  </Button>
                ) : (
                  <Button className="w-full" size="lg">
                    apply now
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
