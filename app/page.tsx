"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, ExternalLink, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import confetti from "canvas-confetti"

interface Tool {
  id: number
  name: string
  category: string
  url: string
  excerpt: string
  tags: string[]
  pricing: string
}

export default function HomePage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [filteredTools, setFilteredTools] = useState<Tool[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [favoriteLoading, setFavoriteLoading] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const { toast } = useToast()

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(tools.map((tool) => tool.category)))]

  useEffect(() => {
    fetchTools()
    fetchFavorites()
  }, [])

  useEffect(() => {
    filterTools()
  }, [tools, searchTerm, selectedCategory])

  const fetchTools = async () => {
    try {
      const response = await fetch("/api/tools")
      const data = await response.json()
      setTools(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tools",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchFavorites = async () => {
    try {
      const response = await fetch("/api/favorites")
      const data = await response.json()
      setFavorites(data.map((fav: any) => fav.toolId))
    } catch (error) {
      console.error("Failed to fetch favorites:", error)
    }
  }

  const filterTools = () => {
    let filtered = tools

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory)
    }

    setFilteredTools(filtered)
  }

  const toggleFavorite = async (toolId: number) => {
    setFavoriteLoading(toolId)

    try {
      if (favorites.includes(toolId)) {
        // Remove from favorites
        const response = await fetch(`/api/favorites/${toolId}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setFavorites((prev) => prev.filter((id) => id !== toolId))
          toast({
            title: "Removed from favorites",
            description: "Tool removed from your favorites",
          })
        }
      } else {
        // Add to favorites
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ toolId }),
        })

        const result = await response.json()

        if (response.ok) {
          setFavorites((prev) => [...prev, toolId])
          toast({
            title: "Added to favorites",
            description: "Tool added to your favorites",
          })

          // Trigger confetti animation
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to save favorite",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorite",
        variant: "destructive",
      })
    } finally {
      setFavoriteLoading(null)
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
        <h1 className="text-4xl font-bold mb-2">AI Tools Directory</h1>
        <p className="text-muted-foreground">Discover and favorite the best AI tools</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredTools.length} of {tools.length} tools
        </p>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No tools found</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Card key={tool.id} className="h-full flex flex-col">
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
                    onClick={() => toggleFavorite(tool.id)}
                    disabled={favoriteLoading === tool.id}
                    className="ml-2"
                  >
                    {favoriteLoading === tool.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(tool.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                        }`}
                      />
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
      )}
    </div>
  )
}
