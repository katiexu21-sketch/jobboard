import { notFound } from "next/navigation"
import { mockJobs } from "@/lib/mock-data"
import { JobDetail } from "@/components/job-detail"

export function generateStaticParams() {
  return mockJobs.map((job) => ({
    id: job.id,
  }))
}

export default function JobPage({ params }: { params: { id: string } }) {
  const job = mockJobs.find((j) => j.id === params.id)

  if (!job) {
    notFound()
  }

  return <JobDetail job={job} />
}
