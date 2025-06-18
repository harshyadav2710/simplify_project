"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts"

interface Tool {
  id: number
  name: string
  category: string
  url: string
  excerpt: string
  tags: string[]
  pricing: string
}

interface CategoryData {
  category: string
  count: number
}

interface PricingData {
  pricing: string
  count: number
  fill: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function AnalyticsPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  const [pricingData, setPricingData] = useState<PricingData[]>([])

  useEffect(() => {
    fetchTools()
  }, [])

  useEffect(() => {
    if (tools.length > 0) {
      processData()
    }
  }, [tools])

  const fetchTools = async () => {
    try {
      const response = await fetch("/api/tools")
      const data = await response.json()
      setTools(data)
    } catch (error) {
      console.error("Failed to fetch tools:", error)
    } finally {
      setLoading(false)
    }
  }

  const processData = () => {
    // Process category data
    const categoryCount = tools.reduce(
      (acc, tool) => {
        acc[tool.category] = (acc[tool.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const categoryChartData = Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)

    setCategoryData(categoryChartData)

    // Process pricing data
    const pricingCount = tools.reduce(
      (acc, tool) => {
        acc[tool.pricing] = (acc[tool.pricing] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const pricingChartData = Object.entries(pricingCount).map(([pricing, count], index) => ({
      pricing,
      count,
      fill: COLORS[index % COLORS.length],
    }))

    setPricingData(pricingChartData)
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
        <h1 className="text-4xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Insights about AI tools in our directory</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Tools by Category</CardTitle>
            <CardDescription>Distribution of tools across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pricing Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Models</CardTitle>
            <CardDescription>Distribution of tools by pricing model</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pricingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ pricing, count }) => `${pricing}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {pricingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
            <CardDescription>Key metrics about our AI tools directory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{tools.length}</div>
                <div className="text-sm text-muted-foreground">Total Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{categoryData.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {pricingData.find((p) => p.pricing === "Free")?.count || 0}
                </div>
                <div className="text-sm text-muted-foreground">Free Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {pricingData.find((p) => p.pricing === "Freemium")?.count || 0}
                </div>
                <div className="text-sm text-muted-foreground">Freemium Tools</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
