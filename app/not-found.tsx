import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="font-bold text-6xl">404</h1>
        <h2 className="font-semibold text-2xl">Job Not Found</h2>
        <p className="text-muted-foreground">The job you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/">Back to Jobs</Link>
        </Button>
      </div>
    </div>
  )
}
