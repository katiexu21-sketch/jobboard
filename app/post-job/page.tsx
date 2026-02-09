import { PostJobForm } from "@/components/post-job-form"

export default function PostJobPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="font-bold text-4xl mb-3">Post a Job</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Find the perfect creative talent for your team. Fill out the form below to post your job listing.
            </p>
          </div>
          <PostJobForm />
        </div>
      </div>
    </div>
  )
}
