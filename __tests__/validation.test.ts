import { describe, it, expect } from "vitest"
import { postJobSchema } from "@/lib/validation"

const validPayload = {
  title: "Senior Video Editor",
  company: "Creator Co",
  category: "Video Editing",
  type: "Full-time" as const,
  location: "Remote",
  salary: "$60k - $90k",
  description: "Edit videos for our YouTube channel",
  responsibilities: "Edit videos\nColor grade footage",
  requirements: "3 years experience\nPremiere Pro proficiency",
  tags: "Premiere Pro, After Effects, YouTube",
  email: "jobs@creatorco.com",
}

describe("postJobSchema", () => {
  it("accepts a valid payload", () => {
    const result = postJobSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
  })

  it("parses newline-delimited fields into arrays", () => {
    const result = postJobSchema.parse(validPayload)
    expect(result.responsibilities).toEqual(["Edit videos", "Color grade footage"])
    expect(result.requirements).toEqual(["3 years experience", "Premiere Pro proficiency"])
  })

  it("parses comma-delimited tags into an array", () => {
    const result = postJobSchema.parse(validPayload)
    expect(result.tags).toEqual(["Premiere Pro", "After Effects", "YouTube"])
  })

  it("strips HTML angle brackets from strings", () => {
    const result = postJobSchema.parse({
      ...validPayload,
      title: '<script>alert("xss")</script>',
    })
    expect(result.title).not.toContain("<")
    expect(result.title).not.toContain(">")
    expect(result.title).toBe('scriptalert("xss")/script')
  })

  it("strips angle brackets from list items", () => {
    const result = postJobSchema.parse({
      ...validPayload,
      responsibilities: "<b>Bold task</b>\nNormal task",
    })
    expect(result.responsibilities[0]).toBe("bBold task/b")
    expect(result.responsibilities[1]).toBe("Normal task")
  })

  it("trims whitespace from fields", () => {
    const result = postJobSchema.parse({
      ...validPayload,
      title: "  Video Editor  ",
      company: "  Creator Co  ",
    })
    expect(result.title).toBe("Video Editor")
    expect(result.company).toBe("Creator Co")
  })

  // --- Required field validation ---

  it("rejects missing title", () => {
    const { title, ...rest } = validPayload
    const result = postJobSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it("rejects empty title", () => {
    const result = postJobSchema.safeParse({ ...validPayload, title: "" })
    expect(result.success).toBe(false)
  })

  it("rejects missing email", () => {
    const { email, ...rest } = validPayload
    const result = postJobSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it("rejects invalid email", () => {
    const result = postJobSchema.safeParse({ ...validPayload, email: "not-an-email" })
    expect(result.success).toBe(false)
  })

  it("rejects missing responsibilities", () => {
    const { responsibilities, ...rest } = validPayload
    const result = postJobSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it("rejects empty responsibilities (blank string)", () => {
    const result = postJobSchema.safeParse({ ...validPayload, responsibilities: "" })
    expect(result.success).toBe(false)
  })

  it("rejects missing tags", () => {
    const { tags, ...rest } = validPayload
    const result = postJobSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  // --- Enum validation ---

  it("rejects invalid job type", () => {
    const result = postJobSchema.safeParse({ ...validPayload, type: "Internship" })
    expect(result.success).toBe(false)
  })

  it("accepts all valid job types", () => {
    for (const type of ["Full-time", "Part-time", "Contract", "Freelance"]) {
      const result = postJobSchema.safeParse({ ...validPayload, type })
      expect(result.success).toBe(true)
    }
  })

  // --- Length limits ---

  it("rejects title exceeding 200 characters", () => {
    const result = postJobSchema.safeParse({ ...validPayload, title: "A".repeat(201) })
    expect(result.success).toBe(false)
  })

  it("rejects description exceeding 5000 characters", () => {
    const result = postJobSchema.safeParse({ ...validPayload, description: "A".repeat(5001) })
    expect(result.success).toBe(false)
  })

  // --- Optional fields ---

  it("defaults benefits to empty array when omitted", () => {
    const result = postJobSchema.parse(validPayload)
    expect(result.benefits).toEqual([])
  })

  it("parses benefits when provided", () => {
    const result = postJobSchema.parse({
      ...validPayload,
      benefits: "Health insurance\n401k\nRemote work",
    })
    expect(result.benefits).toEqual(["Health insurance", "401k", "Remote work"])
  })

  it("defaults companyDescription to empty string when omitted", () => {
    const result = postJobSchema.parse(validPayload)
    expect(result.companyDescription).toBe("")
  })
})
