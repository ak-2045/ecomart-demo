"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Leaf, Star, Filter, Info, ArrowUpDown, X, Heart, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const allProducts = [
  {
    id: 1,
    name: "Bata Men's Leather Sandal",
    price: 1299,
    originalPrice: 1599,
    image: "https://m.media-amazon.com/images/I/51KpN2RJ0aL._SX625_.jpg",
    rating: 4.2,
    greenScore: "low",
    reviews: 1250,
    brand: "Bata",
    category: "traditional",
    isBestSeller: true,
    isEcoFriendly: false,
    features: ["Genuine Leather", "Handcrafted", "Durable"],
  },
  {
    id: 2,
    name: "Nike Unisex Jordan Slide",
    price: 2499,
    originalPrice: 2999,
    image: "https://m.media-amazon.com/images/I/51nJv91L4nL._SY625_.jpg",
    rating: 4.5,
    greenScore: "medium",
    reviews: 890,
    brand: "Nike",
    category: "sports",
    isBestSeller: true,
    isEcoFriendly: false,
    features: ["Air Cushioning", "Synthetic Upper", "Lightweight"],
  },
  {
    id: 3,
    name: "Bamboo Slippers for Ladies",
    price: 1599,
    originalPrice: 1999,
    image: "https://sc01.alicdn.com/kf/HTB1azj4LSrqK1RjSZK9q6xyypXa7/231725419/HTB1azj4LSrqK1RjSZK9q6xyypXa7.jpg",
    rating: 4.6,
    greenScore: "high",
    reviews: 456,
    brand: "Zenley",
    category: "eco",
    isBestSeller: false,
    isEcoFriendly: true,
    features: ["100% Bamboo Fiber", "Biodegradable", "Carbon Neutral"],
    carbonSaved: "2.5kg CO₂",
  },
  {
    id: 4,
    name: "YOHO Unisex Nest Sliders",
    price: 1899,
    originalPrice: 2299,
    image: "https://m.media-amazon.com/images/I/51XVZ7XI3TL._SY695_.jpg",
    rating: 4.3,
    greenScore: "medium",
    reviews: 567,
    brand: "YOHO",
    category: "sports",
    isBestSeller: false,
    isEcoFriendly: false,
    features: ["Cloudfoam Comfort", "Quick-dry", "Slip Resistant"],
  },
  {
    id: 5,
    name: "Ramacham Chappals",
    price: 999,
    originalPrice: 1299,
    image: "https://www.cultureshoppe.com/cdn/shop/articles/handmade-ramacham-slippers.jpg?v=1718086861",
    rating: 4.8,
    greenScore: "high",
    reviews: 234,
    brand: "Ramacham",
    category: "eco",
    isBestSeller: false,
    isEcoFriendly: true,
    features: ["Ocean Plastic", "Vegan", "Fair Trade"],
    carbonSaved: "3.2kg CO₂",
  },
  {
    id: 6,
    name: "Puma Unisex Adult Max Slide",
    price: 1499,
    originalPrice: 1799,
    image: "https://m.media-amazon.com/images/I/61ONNcU7vVL._SY695_.jpg",
    rating: 4.1,
    greenScore: "low",
    reviews: 345,
    brand: "Puma",
    category: "sports",
    isBestSeller: false,
    isEcoFriendly: false,
    isLowCarbon: false,
    features: ["Soft Foam", "Synthetic", "Lightweight"],
  },
  {
    id: 7,
    name: "White Memory Foam Sliders",
    price: 899,
    originalPrice: 1499,
    image: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/11998854/2022/6/8/6ec47087-b2d6-4ce2-ba45-2adc4ba870a31654688188571-HRX-by-Hrithik-Roshan-Men-White-Memory-Foam-Sliders-38516546-2.jpg",
    rating: 4.7,
    greenScore: "medium",
    reviews: 123,
    brand: "HRX by Hrithik Roshan",
    category: "traditional",
    isBestSeller: false,
    isEcoFriendly: false,
    features: ["Rubber Sole", "Water Resistant", "Affordable"],
  },
  
  {
    id: 8,
    name: "HushPuppies Flat Thongs",
    price: 599,
    originalPrice: 799,
    image: "https://www.bata.com/dw/image/v2/BCLG_PRD/on/demandware.static/-/Sites-bata-in-master-catalog/default/dw683bd6b3/images/large/5746809_1.jpeg?sw=660",
    rating: 3.8,
    greenScore: "low",
    reviews: 892,
    brand: "HushPuppies",
    category: "budget",
    isBestSeller: true,
    isEcoFriendly: false,
    features: ["Rubber Sole", "Water Resistant", "Affordable"],
  },
  {
    id: 9,
    name: "Puma Unisex Adult Geo Slide",
    price: 1899,
    originalPrice: 2299,
    image: "https://m.media-amazon.com/images/I/51Up+7pcvbL._SY695_.jpg",
    rating: 4.4,
    greenScore: "low",
    reviews: 167,
    brand: "Puma",
    category: "eco",
    isBestSeller: false,
    isEcoFriendly: false,
    features: ["Cork Sole", "Hemp Upper", "Local Manufacturing"],
  },
  {
    id: 10,
    name: "Weinbrenner Olive Mules",
    price: 1299,
    originalPrice: 1599,
    image: "https://www.bata.com/dw/image/v2/BCLG_PRD/on/demandware.static/-/Sites-bata-in-master-catalog/default/dw138a80b2/images/large/8717416_2.jpeg?sw=660",
    rating: 4.2,
    greenScore: "high",
    reviews: 289,
    brand: "Weinbrenner",
    category: "eco",
    isBestSeller: false,
    isEcoFriendly: true,
    features: ["Organic Cotton", "Natural Dyes", "Biodegradable"],
    carbonSaved: "1.2kg CO₂",
  },
  {
    id: 11,
    name: "COMFiT Grey Casual Mules",
    price: 1799,
    originalPrice: 2199,
    image: "https://www.bata.com/dw/image/v2/BCLG_PRD/on/demandware.static/-/Sites-bata-in-master-catalog/default/dwe654e805/images/large/8712125_2.jpeg?sw=660",
    rating: 4.0,
    greenScore: "high",
    reviews: 445,
    brand: "COMFiT",
    category: "sports",
    isBestSeller: false,
    isEcoFriendly: false,
    features: ["Classic Design", "Comfortable Fit", "Durable"],
    carbonSaved: "1.8kg CO₂",
  },
  {
    id: 12,
    name: "Scentra Women's Sandals",
    price: 999,
    originalPrice: 1299,
    image: "https://www.bata.com/dw/image/v2/BCLG_PRD/on/demandware.static/-/Sites-bata-in-master-catalog/default/dwac8720ae/images/large/6710620_1.jpeg?sw=660",
    rating: 4.3,
    greenScore: "high",
    reviews: 178,
    brand: "Scentra",
    category: "eco",
    isBestSeller: false,
    isEcoFriendly: false,
    features: ["Jute Upper", "Natural Rubber", "Eco-friendly"],
    carbonSaved: "0.8kg CO₂",
  },
]


const greenAlternatives = [
  {
    id: 5,
    name: "Ramacham Chappals",
    price: 999,
    originalPrice: 1299,
    image: "https://www.cultureshoppe.com/cdn/shop/articles/handmade-ramacham-slippers.jpg?v=1718086861",
    rating: 4.8,
    greenScore: "high",
    reviews: 234,
    brand: "Ramacham",
    category: "eco",
    isBestSeller: false,
    isEcoFriendly: true,
    features: ["Ocean Plastic", "Vegan", "Fair Trade"],
    carbonSaved: "3.2kg CO₂",
  },
   {
    id: 11,
    name: "COMFiT Grey Casual Mules",
    price: 1799,
    originalPrice: 2199,
    image: "https://www.bata.com/dw/image/v2/BCLG_PRD/on/demandware.static/-/Sites-bata-in-master-catalog/default/dwe654e805/images/large/8712125_2.jpeg?sw=660",
    rating: 4.0,
    greenScore: "high",
    reviews: 445,
    brand: "COMFiT",
    category: "sports",
    isBestSeller: false,
    isEcoFriendly: false,
    features: ["Classic Design", "Comfortable Fit", "Durable"],
    carbonSaved: "1.8kg CO₂",
  },
]

function GreenScoreBadge({
  score,
  showTooltip = false,
  onClick,
}: { score: string; showTooltip?: boolean; onClick?: () => void }) {
  const colors = {
    high: "bg-green-500 text-white hover:bg-green-600",
    medium: "bg-yellow-500 text-white hover:bg-yellow-600",
    low: "bg-red-500 text-white hover:bg-red-600",
  }

  return (
    <Badge
      className={`${colors[score as keyof typeof colors]} text-xs cursor-pointer transition-colors`}
      onClick={onClick}
    >
      <Leaf className="w-3 h-3 mr-1" />
      {score.charAt(0).toUpperCase() + score.slice(1)}
      {showTooltip && <Info className="w-3 h-3 ml-1" />}
    </Badge>
  )
}


function AddToCartModal({ isOpen, onClose, product }: { isOpen: boolean; onClose: () => void; product: any }) {
  if (!product) return null

  const isHighEcoScore = product.greenScore === "high"

  if (isHighEcoScore) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-green-50 border-green-200 border-2">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Great Choice! 🌱</span>
            </DialogTitle>
            <DialogDescription className="text-green-700">
              You've selected an eco-friendly product that helps protect our planet!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-green-200">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={60}
                height={60}
                className="rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium text-green-800">{product.name}</h4>
                <p className="text-sm text-green-600">₹{product.price}</p>
                {product.carbonSaved && <p className="text-xs text-green-600">Saves {product.carbonSaved}</p>}
              </div>
            </div>

            <div className="bg-green-100 p-3 rounded-lg border border-green-200">
              <p className="text-sm text-green-700">✅ Added "{product.name}" to your cart!</p>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={onClose}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // For low and medium eco scores - show greener alternatives
  const bgColor = product.greenScore === "medium" ? "bg-gray-50" : "bg-gray-50"
  const borderColor = product.greenScore === "medium" ? "border-yellow-200" : "border-red-200"
  const textColor = product.greenScore === "medium" ? "text-gray-800" : "text-gray-800"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl ${bgColor} ${borderColor} border-2`}>
        <DialogHeader>
          <DialogTitle className={`flex items-center space-x-2 ${textColor}`}>
            <Leaf className="w-5 h-5" />
            <span>Switch to Greener Alternatives?</span>
          </DialogTitle>
          <DialogDescription className={textColor}>
            Save ₹150 and reduce your carbon footprint by 5.0kg CO₂
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={60}
              height={60}
              className="rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium">Your Selection: {product.name}</h4>
              <p className="text-sm text-gray-600">₹{product.price}</p>
              <GreenScoreBadge score={product.greenScore} />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Greener alternatives:</h3>
            {greenAlternatives.map((alt) => (
              <div key={alt.id} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50">
                <Image
                  src={alt.image || "/placeholder.svg"}
                  alt={alt.name}
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{alt.name}</h4>
                  <p className="text-sm text-gray-600">Saves {alt.carbonSaved}</p>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-green-600">₹{alt.price}</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">Get 10% Off</Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-600 text-green-600 bg-transparent"
                  onClick={() => {
                    // Add the alternative product to cart
                    onClose()
                  }}
                >
                  Switch & Add
                </Button>
              </div>
            ))}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={onClose}>
              <Leaf className="w-4 h-4 mr-2" />
              Explore Green Options
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => {
                onClose()
              }}
            >
              Add "{product.name}"
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ProductCard({ product }: { product: any }) {
  const [showScoreModal, setShowScoreModal] = useState(false)
  const [showAddToCartModal, setShowAddToCartModal] = useState(false)

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer h-96 flex flex-col">
        <Link href={`/product/${product.id}`} className="flex-1 flex flex-col">
          <div className="relative flex-shrink-0">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            {product.carbonSaved && (
              <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs">
                Saves {product.carbonSaved}
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge className="absolute top-2 right-2 bg-orange-500 text-white text-xs">Best Seller</Badge>
            )}
          </div>
          <CardContent className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              <div className="flex items-center space-x-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">{product.rating}</span>
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div
                onClick={(e) => {
                  e.preventDefault()
                  setShowScoreModal(true)
                }}
              >
                <GreenScoreBadge score={product.greenScore} showTooltip={true} />
              </div>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={(e) => {
                  e.preventDefault()
                  setShowAddToCartModal(true)
                }}
              >
                Add to Cart
              </Button>
            </div>
            {product.features && (
              <div className="mt-3 flex flex-wrap gap-1">
                {product.features.slice(0, 2).map((feature: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs text-gray-600 border-gray-300">
                    {feature}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Link>
      </Card>

      <AddToCartModal isOpen={showAddToCartModal} onClose={() => setShowAddToCartModal(false)} product={product} />
    </>
  )
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("chappal")
  const [inputValue, setInputValue] = useState("chappal")
  const [filters, setFilters] = useState({
    ecoFriendly: false,
    bestSellers: false,
    priceRange: "all",
    brand: "all",
  })
  const [sortBy, setSortBy] = useState("relevance")

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Apply filters
    if (filters.ecoFriendly) {
      filtered = filtered.filter((product) => product.isEcoFriendly || product.isLowCarbon)
    }
    if (filters.bestSellers) {
      filtered = filtered.filter((product) => product.isBestSeller)
    }
    if (filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "under-1000":
          filtered = filtered.filter((product) => product.price < 1000)
          break
        case "1000-2000":
          filtered = filtered.filter((product) => product.price >= 1000 && product.price <= 2000)
          break
        case "above-2000":
          filtered = filtered.filter((product) => product.price > 2000)
          break
      }
    }
    if (filters.brand !== "all") {
      filtered = filtered.filter((product) => product.brand.toLowerCase() === filters.brand.toLowerCase())
    }

    // Apply sorting
    switch (sortBy) {
      case "eco-score":
        filtered.sort((a, b) => {
          const scoreOrder = { high: 3, medium: 2, low: 1 }
          return (
            scoreOrder[b.greenScore as keyof typeof scoreOrder] - scoreOrder[a.greenScore as keyof typeof scoreOrder]
          )
        })
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "best-sellers":
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
        break
    }

    return filtered
  }, [filters, sortBy])

  // Organize products into sections for chappal search
  const bestSellers = filteredProducts.filter((product) => product.isBestSeller)
  const ecoFriendly = filteredProducts.filter((product) => product.isEcoFriendly || product.isLowCarbon)
  const remaining = filteredProducts.filter(
    (product) => !product.isBestSeller && !product.isEcoFriendly && !product.isLowCarbon,
  )

  const clearFilters = () => {
    setFilters({
      ecoFriendly: false,
      bestSellers: false,
      priceRange: "all",
      brand: "all",
    })
    setSortBy("relevance")
  }

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value === true || (typeof value === "string" && value !== "all"),
  ).length

  const isChappalSearch = searchQuery.toLowerCase().trim() === "chappal"

  return (
    <div className="min-h-screen bg-gray-50">
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

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Try searching chappal..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchQuery(inputValue)
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 rounded-full px-6"
                  onClick={() => setSearchQuery(inputValue)}
                >
                  Search
                </Button>
              </div>
              {!isChappalSearch && (
                <div>
                  <p className="text-red-600 text-sm top-0">
                    * Currently showing results for "chappal". Other products not available yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <Badge className="bg-green-600 text-white text-xs">{activeFiltersCount}</Badge>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                {/* Sustainability Filters */}
                <div>
                  <h3 className="font-medium mb-3 text-green-700">Sustainability</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="eco-friendly"
                        checked={filters.ecoFriendly}
                        onCheckedChange={(checked) => setFilters({ ...filters, ecoFriendly: checked as boolean })}
                      />
                      <Label htmlFor="eco-friendly" className="text-sm">
                        Eco Friendly
                      </Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Best Sellers */}
                <div>
                  <h3 className="font-medium mb-3">Popular</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="best-sellers"
                      checked={filters.bestSellers}
                      onCheckedChange={(checked) => setFilters({ ...filters, bestSellers: checked as boolean })}
                    />
                    <Label htmlFor="best-sellers" className="text-sm">
                      Best Sellers
                    </Label>
                  </div>
                </div>

                <Separator />

                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Select
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-1000">Under ₹1,000</SelectItem>
                      <SelectItem value="1000-2000">₹1,000 - ₹2,000</SelectItem>
                      <SelectItem value="above-2000">Above ₹2,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Brand */}
                <div>
                  <h3 className="font-medium mb-3">Brand</h3>
                  <Select value={filters.brand} onValueChange={(value) => setFilters({ ...filters, brand: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      <SelectItem value="Nike">Nike</SelectItem>
                      <SelectItem value="Puma">Puma</SelectItem>
                      <SelectItem value="Bata">Bata</SelectItem>
                      <SelectItem value="Zenley">Zenley</SelectItem>
                      <SelectItem value="YOHO">YOHO</SelectItem>
                      <SelectItem value="HushPuppies">HushPuppies</SelectItem>
                      <SelectItem value="HRX by Hrithik Roshan">HRX by Hrithik Roshan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Search Results for "Chappal"</h1>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {allProducts.length} results
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Sort by Relevance</SelectItem>
                    <SelectItem value="eco-score">Sort by Eco Score</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="best-sellers">Best Sellers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Sections for Chappal Search */}
            {isChappalSearch && (
              <div className="space-y-12">
                {/* Best Sellers - Yellow Row with Stars */}
                {bestSellers.length > 0 && (
                  <section className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-lg">
                    <div className="flex items-center space-x-2 mb-6">
                      <Star className="w-5 h-5 text-yellow-600" />
                      <h2 className="text-xl font-semibold text-yellow-800">Best Sellers</h2>
                      <Badge className="bg-yellow-100 text-yellow-800">Popular Choice</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {bestSellers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Eco-Friendly - Green Row with Hearts */}
                {ecoFriendly.length > 0 && (
                  <section className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                    <div className="flex items-center space-x-2 mb-6">
                      <Heart className="w-5 h-5 text-green-600" />
                      <h2 className="text-xl font-semibold text-green-800">Eco-Friendly Picks</h2>
                      <Badge className="bg-green-100 text-green-800">Planet Friendly</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {ecoFriendly.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </section>
                )}

                {/* More Results */}
                {remaining.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold mb-6 text-gray-900">More Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {remaining.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* Regular Results for Non-Chappal Search */}
            {!isChappalSearch && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <Button onClick={clearFilters} className="bg-green-600 hover:bg-green-700">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
