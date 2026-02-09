export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Mock persistence: log and return payload back
    console.log("/api/posts payload:", body)
    return Response.json({ success: true })
  } catch (e) {
    return new Response("Invalid JSON", { status: 400 })
  }
}



