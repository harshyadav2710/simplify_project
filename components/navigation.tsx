"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Heart, BarChart3, Home } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant={pathname === "/" ? "default" : "ghost"} size="sm">
                <Home className="h-4 w-4 mr-2" />
                All Tools
              </Button>
            </Link>
            <Link href="/favorites">
              <Button variant={pathname === "/favorites" ? "default" : "ghost"} size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Favorites
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant={pathname === "/analytics" ? "default" : "ghost"} size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
