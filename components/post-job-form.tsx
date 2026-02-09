"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export function PostJobForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, this would send data to an API
    console.log("[v0] Form submitted")

    setIsSubmitting(false)
    router.push("/?posted=true")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
        <CardDescription>Provide information about the position you're hiring for</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input id="title" name="title" placeholder="e.g. Senior Video Editor" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company Name *</Label>
            <Input id="company" name="company" placeholder="e.g. Your Company" required />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select name="category" required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Video Editing">Video Editing</SelectItem>
                  <SelectItem value="Content Creation">Content Creation</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Writing">Writing</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Job Type *</Label>
              <Select name="type" required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input id="location" name="location" placeholder="e.g. Remote, New York, etc." required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range *</Label>
              <Input id="salary" name="salary" placeholder="e.g. $60k - $90k" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the role and what you're looking for..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">Responsibilities *</Label>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              placeholder="List key responsibilities (one per line)"
              rows={5}
              required
            />
            <p className="text-sm text-muted-foreground">Enter each responsibility on a new line</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements *</Label>
            <Textarea
              id="requirements"
              name="requirements"
              placeholder="List requirements and qualifications (one per line)"
              rows={5}
              required
            />
            <p className="text-sm text-muted-foreground">Enter each requirement on a new line</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Benefits</Label>
            <Textarea id="benefits" name="benefits" placeholder="List benefits and perks (one per line)" rows={4} />
            <p className="text-sm text-muted-foreground">Optional: Enter each benefit on a new line</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Skills/Tags *</Label>
            <Input id="tags" name="tags" placeholder="e.g. Premiere Pro, After Effects, YouTube" required />
            <p className="text-sm text-muted-foreground">Separate tags with commas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyDescription">About Your Company</Label>
            <Textarea
              id="companyDescription"
              name="companyDescription"
              placeholder="Tell candidates about your company..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Contact Email *</Label>
            <Input id="email" name="email" type="email" placeholder="jobs@yourcompany.com" required />
          </div>

          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Posting Job..." : "Post Job"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
