// Import the shared favorites storage
import { favorites } from "@/lib/favorites-storage"
import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: { toolId: string } }) {
  const toolId = Number.parseInt(params.toolId)

  if (isNaN(toolId)) {
    return NextResponse.json({ message: "Invalid tool ID" }, { status: 400 })
  }

  // Find and remove the favorite
  const initialLength = favorites.length
  const favoriteIndex = favorites.findIndex((fav) => fav.toolId === toolId)

  if (favoriteIndex === -1) {
    return NextResponse.json({ message: "Favorite not found" }, { status: 404 })
  }

  // Remove the favorite
  favorites.splice(favoriteIndex, 1)

  return NextResponse.json({ message: "Favorite removed successfully" }, { status: 200 })
}
