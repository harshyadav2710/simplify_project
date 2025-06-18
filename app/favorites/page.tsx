"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, ExternalLink, Loader2, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Tool {
  id: number
  name: string
  category: string
  url: string
  excerpt: string
  tags: string[]
  pricing: string
}

interface Favorite {
  toolId: number
  tool: Tool
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const [removeLoading, setRemoveLoading] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const response = await fetch("/api/favorites")
      const data = await response.json()
      setFavorites(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch favorites",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const removeFavorite = async (toolId: number) => {
    setRemoveLoading(toolId)

    try {
      const response = await fetch(`/api/favorites/${toolId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setFavorites((prev) => prev.filter((fav) => fav.toolId !== toolId))
        toast({
          title: "Removed from favorites",
          description: "Tool removed from your favorites",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to remove favorite",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove favorite",
        variant: "destructive",
      })
    } finally {
      setRemoveLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Tools
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">My Favorites</h1>
        <p className="text-muted-foreground">Your saved AI tools</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No favorites yet</p>
          <p className="text-sm text-muted-foreground mb-6">Start exploring tools and add them to your favorites!</p>
          <Link href="/">
            <Button>Browse Tools</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {favorites.length} favorite{favorites.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(({ toolId, tool }) => (
              <Card key={toolId} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {tool.category}
                        </Badge>
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFavorite(toolId)}
                      disabled={removeLoading === toolId}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      {removeLoading === toolId ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{tool.excerpt}</p>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {tool.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{tool.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          tool.pricing === "Free" ? "default" : tool.pricing === "Freemium" ? "secondary" : "outline"
                        }
                        className="text-xs"
                      >
                        {tool.pricing}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(tool.url, "_blank")}
                        className="text-xs"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Visit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
