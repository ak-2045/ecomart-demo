"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Leaf, ShoppingCart, Clock, AlertCircle, CheckCircle, Recycle, TrendingDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const perfectlyTimedProducts = [
  {
    id: 13,
    name: "fresho! Baby Apple Shimla - 1 kg",
    price: 199,
    originalPrice: 249,
    image: "https://www.bbassets.com/media/uploads/p/l/40134281_22-fresho-baby-apple-shimla.jpg",
    daysLeft: 4,
    discount: 20,
    greenScore: "high",
    category: "Fruits",
    weight: "1kg",
    saleEndsIn: 2 * 60 * 60 + 45 * 60, // 2 hours 45 minutes in seconds
    foodWasteSaved: "0.5kg",
  },
  {
    id: 14,
    name: "THF 100% Whole Wheat Bread",
    price: 89,
    originalPrice: 119,
    image: "https://glutenfreeonashoestring.com/wp-content/uploads/2025/04/Gluten-free-sourdough-bread-sliced-horizontal-image-860x536.jpg",
    daysLeft: 6,
    discount: 25,
    greenScore: "medium",
    category: "Bakery",
    weight: "500g",
    saleEndsIn: 5 * 60 * 60 + 20 * 60, // 5 hours 20 minutes in seconds
    foodWasteSaved: "0.3kg",
  },
  {
    id: 15,
    name: "Epigamia Everyday Yogurt - 200 g",
    price: 149,
    originalPrice: 199,
    image: "https://media.istockphoto.com/id/1356546557/photo/healthy-breakfast-of-strawberry-parfait-made-with-fresh-fruit-and-yogurt-over-a-rustic-white.jpg?s=612x612&w=0&k=20&c=bU3ByY7r6gG_cKSUZpXYja8nxByRHGUOa1Py2LHcZuU=",
    daysLeft: 3,
    discount: 25,
    greenScore: "high",
    category: "Dairy",
    weight: "400g",
    saleEndsIn: 1 * 60 * 60 + 15 * 60, // 1 hour 15 minutes in seconds
    foodWasteSaved: "0.2kg",
  },
  {
    id: 16,
    name: "fresho! Capsicum - Green, 2 kg",
    price: 299,
    originalPrice: 399,
    image: "https://static.toiimg.com/thumb/imgsize-1064354,msid-121743732,width-375,height-210,resizemode-75/121743732.jpg",
    daysLeft: 4,
    discount: 25,
    greenScore: "high",
    category: "Vegetables",
    weight: "2kg",
    saleEndsIn: 3 * 60 * 60 + 30 * 60, // 3 hours 30 minutes in seconds
    foodWasteSaved: "1.2kg",
  },
  {
    id: 17,
    name: "Big Sam's Norgwegian Salmon Fillet",
    price: 599,
    originalPrice: 799,
    image: "https://www.gallowaysmokehouse.co.uk/wp-content/uploads/2019/10/galloway-smokehouse-20.jpg",
    daysLeft: 2,
    discount: 25,
    greenScore: "medium",
    category: "Seafood",
    weight: "500g",
    saleEndsIn: 4 * 60 * 60 + 10 * 60, // 4 hours 10 minutes in seconds
    foodWasteSaved: "0.4kg",
  },
  {
    id: 18,
    name: "Castello Danish Blue Cheese - 200 g",
    price: 449,
    originalPrice: 599,
    image: "https://sweetstuff.in/wp-content/uploads/2019/03/Blue-Cheese.png",
    daysLeft: 5,
    discount: 25,
    greenScore: "medium",
    category: "Dairy",
    weight: "200g",
    saleEndsIn: 6 * 60 * 60 + 45 * 60, // 6 hours 45 minutes in seconds
    foodWasteSaved: "0.1kg",
  },
]

function CountdownTimer({ seconds }: { seconds: number }) {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const secs = timeLeft % 60

  if (timeLeft <= 0) {
    return <span className="text-red-600 font-bold">Sale Ended</span>
  }

  return (
    <div className="flex items-center space-x-1 text-orange-600 font-mono font-bold">
      <Clock className="w-4 h-4" />
      <span>
        {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
      </span>
    </div>
  )
}

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

function PerfectlyTimedExplanationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span>What are Perfectly Timed Picks™?</span>
          </DialogTitle>
          <DialogDescription>Our innovative approach to reducing food waste while saving you money</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-800 mb-3">How It Works</h3>
            <div className="space-y-3 text-sm text-orange-700">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Smart Inventory Management</p>
                  <p>We identify products approaching their best-by dates before they become waste</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Quality Guaranteed</p>
                  <p>All products are still fresh and safe - just need to be consumed sooner</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Win-Win Solution</p>
                  <p>You save money, we prevent waste, and the planet benefits</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <Recycle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">2.5M kg</div>
              <div className="text-sm text-green-700">Food waste prevented</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <TrendingDown className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">40%</div>
              <div className="text-sm text-blue-700">Average savings</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Leaf className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">15K+</div>
              <div className="text-sm text-purple-700">Happy customers</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Environmental Impact</h4>
            <p className="text-sm text-gray-600">
              Food waste is responsible for 8-10% of global greenhouse gas emissions. 
              <br>
              </br>By choosing Perfectly Timed
              Picks™, you're directly contributing to reducing waste.
              <br></br> 
              All while you get to enjoy quality products at great
              prices!
            </p>
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose} className="bg-orange-500 hover:bg-orange-600">
              Got it!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function PerfectlyTimedPicksPage() {
  const [showExplanation, setShowExplanation] = useState(false)
  const [addedToCart, setAddedToCart] = useState<number[]>([])

  const handleAddToCart = (productId: number) => {
    setAddedToCart([...addedToCart, productId])
    // Show explanation modal after first add to cart
    if (addedToCart.length === 0) {
      setTimeout(() => setShowExplanation(true), 500)
    }
  }

  const totalFoodWasteSaved = perfectlyTimedProducts.reduce(
    (sum, product) => sum + Number.parseFloat(product.foodWasteSaved.replace("kg", "")),
    0,
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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

            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost">Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Perfectly Timed Picks™</h1>
          </div>
          <p className="text-xl mb-6 opacity-90">Right Time. Right Price. Right for the Planet.</p>
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold">Up to 40% OFF</div>
              <div className="text-sm opacity-80">Limited time deals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalFoodWasteSaved}kg</div>
              <div className="text-sm opacity-80">Food waste prevented today</div>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100"
            onClick={() => setShowExplanation(true)}
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            How does this work?
          </Button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Limited Time Deals</h2>
            <p className="text-lg text-gray-600">Fresh products at amazing prices - but hurry, time is running out!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perfectlyTimedProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-orange-200 bg-gradient-to-b from-white to-orange-50"
              >
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-orange-500 text-white">{product.discount}% OFF</Badge>
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white">Limited Time</Badge>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-orange-700 border-orange-300">
                      {product.category}
                    </Badge>
                    <CountdownTimer seconds={product.saleEndsIn} />
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.weight}</p>

                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <GreenScoreBadge score={product.greenScore} />
                    <div className="text-sm text-green-600 font-medium">Saves {product.foodWasteSaved} food waste</div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg mb-4 border border-green-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Fresh for {product.daysLeft} more days</span>
                    </div>
                    <p className="text-xs text-green-700">Perfect quality, just needs to be consumed sooner</p>
                  </div>

                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={addedToCart.includes(product.id)}
                  >
                    {addedToCart.includes(product.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Impact Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Recycle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-600 mb-2">2.5M kg</div>
              <div className="text-gray-600">Food waste prevented</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <TrendingDown className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-600 mb-2">₹50L+</div>
              <div className="text-gray-600">Customer savings</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Leaf className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-purple-600 mb-2">1.2M kg</div>
              <div className="text-gray-600">CO₂ emissions avoided</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CheckCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-orange-600 mb-2">15K+</div>
              <div className="text-gray-600">Happy customers</div>
            </div>
          </div>
        </div>
      </section>

      <PerfectlyTimedExplanationModal isOpen={showExplanation} onClose={() => setShowExplanation(false)} />
    </div>
  )
}
