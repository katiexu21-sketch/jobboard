import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MapPin, DollarSign } from "lucide-react"
import Link from "next/link"
import type { Job } from "@/lib/types"

interface JobCardProps {
  job: Job
}

export                                                                                                                                                                                                                  function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg md:text-xl mb-2 leading-snug">{job.title}</h3>
              <p className="text-sm text-muted-foreground">
                Posted by <span className="font-medium text-foreground">{job.company}</span> · {job.postedAt}
              </p>
            </div>
            <Badge variant="secondary" className="flex-shrink-0">
              {job.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{job.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{job.salary}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full sm:w-auto">
          <Link href={`/jobs/${job.id}`}>See Details →</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
