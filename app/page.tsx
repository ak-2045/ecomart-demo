"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Leaf, Star, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


function GreenScoreBadge({ score }: { score: string }) {
  const colors = {
    high: "bg-green-500 text-white",
    medium: "bg-yellow-500 text-white",
    low: "bg-red-500 text-white",
  }

  return (
    <Badge className={`${colors[score as keyof typeof colors]} text-xs`}>
      <Leaf className="w-3 h-3 mr-1" />
      {score.charAt(0).toUpperCase() + score.slice(1)}
    </Badge>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="https://one.walmart.com/content/converge/en_in/tools/header/_jcr_content/header/favicon.img.png"
                  alt="EcoMart Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                  priority
                />
                <span className="text-2xl font-bold text-gray-900">EcoMart</span>
              </Link>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    window.location.href = "/search"
                  }}
                >
                  <Input
                    type="text"
                    placeholder="Try searching chappal..."
                    className="w-full pl-10 pr-4 py-2 border-2 border-green-200 focus:border-green-500 rounded-full"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Button
                    type="submit"
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 rounded-full px-6"
                  >
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Buy Greener, Buy Better</h1>
          <p className="text-xl mb-8 opacity-90">Each time you fill your cart, you're choosing the kind of world you want to live in</p>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
              Shop Green Deals
            </Button>
          </div>
        </div>
      </section>

      {/* Perfectly Timed Picks Teaser */}
      <section className="py-8 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfectly Timed Picks™</h2>
            <p className="text-lg text-gray-600 mb-6">Fight food waste. Save money. Help the planet.</p>
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">2.5 Gt</div>
                <div className="text-sm text-gray-600">Food waste prevented</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">₹50L+</div>
                <div className="text-sm text-gray-600">Customer savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15K+</div>
                <div className="text-sm text-gray-600">Happy customers</div>
              </div>
            </div>
            <Link href="/perfectly-timed-picks">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Clock className="w-5 h-5" />
                Explore Limited Time Deals
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="https://one.walmart.com/content/converge/en_in/tools/header/_jcr_content/header/favicon.img.png"
                  alt="EcoMart Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                  priority
                />
                <span className="text-xl font-bold">EcoMart</span>
              </div>
              <p className="text-gray-400">Buy Green, Buy Smart</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/category/fashion" className="hover:text-white">
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/category/electronics" className="hover:text-white">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/category/home" className="hover:text-white">
                    Home & Garden
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Sustainability</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/green-score" className="hover:text-white">
                    Green Score Guide
                  </Link>
                </li>
                <li>
                  <Link href="/carbon-neutral" className="hover:text-white">
                    Carbon Neutral Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/recycling" className="hover:text-white">
                    Recycling Program
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EcoMart. All rights reserved. Built with 💚 for the planet.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
