import { describe, it, expect, beforeEach, vi } from "vitest"
import { POST } from "@/app/api/posts/route"

const validPayload = {
  title: "Senior Video Editor",
  company: "Creator Co",
  category: "Video Editing",
  type: "Full-time",
  location: "Remote",
  salary: "$60k - $90k",
  description: "Edit videos for our YouTube channel",
  responsibilities: "Edit videos\nColor grade footage",
  requirements: "3 years experience\nPremiere Pro proficiency",
  tags: "Premiere Pro, After Effects",
  email: "jobs@creatorco.com",
}

function makeRequest(
  body: unknown,
  options: { contentType?: string; ip?: string } = {}
) {
  const { contentType = "application/json", ip } = options
  const headers: Record<string, string> = { "content-type": contentType }
  if (ip) headers["x-forwarded-for"] = ip

  return new Request("http://localhost:3000/api/posts", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  })
}

describe("POST /api/posts", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(console, "log").mockImplementation(() => {})
  })

  it("returns 200 for a valid payload", async () => {
    const res = await POST(makeRequest(validPayload, { ip: "1.0.0.1" }))
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.success).toBe(true)
  })

  it("returns 415 for wrong content type", async () => {
    const res = await POST(makeRequest(validPayload, { contentType: "text/plain", ip: "2.0.0.1" }))
    expect(res.status).toBe(415)
  })

  it("returns 400 for invalid JSON", async () => {
    const req = new Request("http://localhost:3000/api/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "not json at all",
    })
    // Use unique IP to avoid rate limit interference
    const res = await POST(
      new Request("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": "3.0.0.1",
        },
        body: "not json at all",
      })
    )
    expect(res.status).toBe(400)
  })

  it("returns 422 for validation errors", async () => {
    const res = await POST(makeRequest({ title: "" }, { ip: "4.0.0.1" }))
    expect(res.status).toBe(422)
    const data = await res.json()
    expect(data.error).toBe("Validation failed")
    expect(data.details).toBeDefined()
  })

  it("returns 429 after exceeding rate limit", async () => {
    const ip = "5.0.0.1"

    // First 5 requests should not be rate limited (they may fail validation, but not 429)
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest(validPayload, { ip }))
      expect(res.status).not.toBe(429)
    }

    // 6th request should be rate limited
    const res = await POST(makeRequest(validPayload, { ip }))
    expect(res.status).toBe(429)
    const data = await res.json()
    expect(data.error).toContain("Too many requests")
  })

  it("resets rate limit after window expires", async () => {
    const ip = "6.0.0.1"

    // Exhaust the rate limit
    for (let i = 0; i < 6; i++) {
      await POST(makeRequest(validPayload, { ip }))
    }

    // Advance past the 60s window
    vi.advanceTimersByTime(61_000)

    // Should be allowed again
    const res = await POST(makeRequest(validPayload, { ip }))
    expect(res.status).not.toBe(429)
  })

  it("rate limits per-IP independently", async () => {
    // Exhaust limit for one IP
    for (let i = 0; i < 6; i++) {
      await POST(makeRequest(validPayload, { ip: "7.0.0.1" }))
    }

    // Different IP should still work
    const res = await POST(makeRequest(validPayload, { ip: "7.0.0.2" }))
    expect(res.status).not.toBe(429)
  })

  it("sanitizes XSS in response data", async () => {
    const res = await POST(
      makeRequest(
        { ...validPayload, title: '<img src=x onerror=alert(1)>' },
        { ip: "8.0.0.1" }
      )
    )
    expect(res.status).toBe(200)

    // Verify the logged data was sanitized
    const logCall = (console.log as ReturnType<typeof vi.fn>).mock.calls.find(
      (call) => call[0] === "/api/posts payload:"
    )
    expect(logCall).toBeDefined()
    expect(logCall![1].title).not.toContain("<")
    expect(logCall![1].title).not.toContain(">")
  })
})
