// Import the shared favorites storage
import { favorites } from "@/lib/favorites-storage"
import toolsData from "@/data/tools.json"
import { NextResponse } from "next/server"

export async function GET() {
  // Return favorites with full tool data
  const favoritesWithTools = favorites
    .map((fav) => {
      const tool = toolsData.find((t) => t.id === fav.toolId)
      return {
        toolId: fav.toolId,
        tool,
      }
    })
    .filter((fav) => fav.tool) // Filter out any favorites for tools that don't exist

  return NextResponse.json(favoritesWithTools)
}

export async function POST(request: Request) {
  try {
    const { toolId } = await request.json()

    if (!toolId) {
      return NextResponse.json({ message: "Tool ID is required" }, { status: 400 })
    }

    // Check if tool exists
    const tool = toolsData.find((t) => t.id === toolId)
    if (!tool) {
      return NextResponse.json({ message: "Tool not found" }, { status: 404 })
    }

    // Check if already favorited
    const existingFavorite = favorites.find((fav) => fav.toolId === toolId)
    if (existingFavorite) {
      return NextResponse.json({ message: "Tool is already in favorites" }, { status: 409 })
    }

    // Add to favorites
    favorites.push({ toolId })

    return NextResponse.json({ message: "Tool added to favorites", toolId }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
  }
}
