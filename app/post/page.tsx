"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function PostPage() {
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

          <Card>
            <CardContent>
              <div className="rounded-lg border border-[#E8E2DB] p-2 bg-white">
                <iframe
                  className="airtable-embed w-full rounded-md"
                  src="https://airtable.com/embed/appyb5EcimPJiF4Ux/pagU1ZDIg7FW14yx8/form"
                  title="Airtable job submission form"
                  frameBorder={0}
                  width="100%"
                  height={533}
                  style={{ background: "transparent", border: "1px solid #E8E2DB" }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


