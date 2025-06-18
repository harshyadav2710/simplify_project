import { NextResponse } from "next/server"
import toolsData from "@/data/tools.json"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  let tools = toolsData

  // Filter by category if provided
  if (category && category !== "all") {
    tools = tools.filter((tool) => tool.category.toLowerCase() === category.toLowerCase())
  }

  return NextResponse.json(tools)
}
