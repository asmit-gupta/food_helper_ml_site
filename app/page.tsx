"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Utensils,
  Salad,
  Beef,
  Coffee,
  Wine,
  Pizza,
  Soup,
  Gift,
  SmilePlus,
  Heart,
  Sparkles,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Mock API call to simulate ML service
const getFoodRecommendations = async (preferences: {
  dietType: string
  foodCategory: string
  mood: string
  alcohol: string
}) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock response based on preferences
  const recommendations = [
    {
      name: preferences.dietType === "vegetarian" ? "Mushroom Risotto" : "Grilled Salmon",
      description: "A delicious dish perfect for your mood.",
      image: `/placeholder.svg?height=200&width=300`,
      rating: 4.8,
    },
    {
      name: preferences.dietType === "vegetarian" ? "Vegetable Pad Thai" : "Chicken Tikka Masala",
      description: "Flavorful and satisfying option.",
      image: `/placeholder.svg?height=200&width=300`,
      rating: 4.6,
    },
    {
      name: preferences.alcohol === "yes" ? "Wine-Paired Pasta" : "Fresh Garden Salad",
      description: "Perfectly balanced flavors.",
      image: `/placeholder.svg?height=200&width=300`,
      rating: 4.7,
    },
  ]

  return recommendations
}

// Food category options with icons
const foodCategories = [
  { name: "Italian", icon: <Pizza size={24} /> },
  { name: "Asian", icon: <Soup size={24} /> },
  { name: "Mexican", icon: <Coffee size={24} /> },
  { name: "Indian", icon: <Sparkles size={24} /> },
  { name: "American", icon: <Beef size={24} /> },
  { name: "Mediterranean", icon: <Salad size={24} /> },
]

// Mood options with icons
const moodOptions = [
  { name: "Happy", icon: <SmilePlus size={24} /> },
  { name: "Adventurous", icon: <Sparkles size={24} /> },
  { name: "Comfort", icon: <Heart size={24} /> },
  { name: "Energetic", icon: <Coffee size={24} /> },
  { name: "Relaxed", icon: <Coffee size={24} className="rotate-45" /> },
]

export default function Home() {
  const [step, setStep] = useState<"splash" | "dietType" | "foodCategory" | "mood" | "alcohol" | "loading" | "results">(
    "splash",
  )

  const [preferences, setPreferences] = useState({
    dietType: "",
    foodCategory: "",
    mood: "",
    alcohol: "",
  })

  const [recommendations, setRecommendations] = useState<any[]>([])

  // Auto-advance from splash screen after 2.5 seconds
  useEffect(() => {
    if (step === "splash") {
      const timer = setTimeout(() => {
        setStep("dietType")
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [step])

  // Handle form submission
  const handleSubmit = async () => {
    setStep("loading")
    try {
      const results = await getFoodRecommendations(preferences)
      setRecommendations(results)
      setStep("results")
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      // Handle error state
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 p-4 text-white">
      <AnimatePresence mode="wait">
        {step === "splash" && (
          <motion.div
            key="splash"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <motion.div
              className="relative p-6 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 shadow-[0_0_40px_rgba(139,92,246,0.5)]"
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 1.5 }}
            >
              <Utensils size={80} className="text-white mb-2" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mt-8 mb-2">
              Taste Finder
            </h1>
            <p className="text-lg text-purple-200">Discover your perfect dish</p>
          </motion.div>
        )}

        {step === "dietType" && (
          <motion.div
            key="dietType"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Dietary Preference</h2>
            <p className="text-purple-200 text-center mb-8">What type of food do you prefer?</p>

            <div className="grid grid-cols-1 gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className={`h-20 text-lg w-full relative overflow-hidden group ${
                    preferences.dietType === "vegetarian"
                      ? "border-green-400 bg-gradient-to-r from-green-900/80 to-emerald-900/80"
                      : "bg-white/10 backdrop-blur-sm border-purple-300/30 hover:bg-white/20"
                  }`}
                  onClick={() => {
                    setPreferences({ ...preferences, dietType: "vegetarian" })
                    setStep("foodCategory")
                  }}
                >
                  <div className="absolute inset-0 flex items-center px-6">
                    <Salad
                      size={28}
                      className={`mr-4 transition-all ${
                        preferences.dietType === "vegetarian" ? "text-green-300" : "text-purple-300"
                      }`}
                    />
                    <span
                      className={`text-xl font-medium ${
                        preferences.dietType === "vegetarian" ? "text-green-50" : "text-white"
                      }`}
                    >
                      Vegetarian
                    </span>

                    {preferences.dietType === "vegetarian" && (
                      <CheckCircle2 size={24} className="ml-auto text-green-300" />
                    )}
                  </div>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className={`h-20 text-lg w-full relative overflow-hidden group ${
                    preferences.dietType === "non-vegetarian"
                      ? "border-red-400 bg-gradient-to-r from-red-900/80 to-rose-900/80"
                      : "bg-white/10 backdrop-blur-sm border-purple-300/30 hover:bg-white/20"
                  }`}
                  onClick={() => {
                    setPreferences({ ...preferences, dietType: "non-vegetarian" })
                    setStep("foodCategory")
                  }}
                >
                  <div className="absolute inset-0 flex items-center px-6">
                    <Beef
                      size={28}
                      className={`mr-4 transition-all ${
                        preferences.dietType === "non-vegetarian" ? "text-red-300" : "text-purple-300"
                      }`}
                    />
                    <span
                      className={`text-xl font-medium ${
                        preferences.dietType === "non-vegetarian" ? "text-red-50" : "text-white"
                      }`}
                    >
                      Non-Vegetarian
                    </span>

                    {preferences.dietType === "non-vegetarian" && (
                      <CheckCircle2 size={24} className="ml-auto text-red-300" />
                    )}
                  </div>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === "foodCategory" && (
          <motion.div
            key="foodCategory"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Cuisine</h2>
            <p className="text-purple-200 text-center mb-8">What cuisine are you craving today?</p>

            <div className="grid grid-cols-2 gap-3">
              {foodCategories.map((category) => (
                <motion.div key={category.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className={`h-24 w-full flex flex-col items-center justify-center gap-2 ${
                      preferences.foodCategory === category.name
                        ? "border-violet-400 bg-gradient-to-br from-violet-900/80 to-purple-900/80"
                        : "bg-white/10 backdrop-blur-sm border-purple-300/30 hover:bg-white/20"
                    }`}
                    onClick={() => {
                      setPreferences({ ...preferences, foodCategory: category.name })
                      setStep("mood")
                    }}
                  >
                    <div
                      className={`${
                        preferences.foodCategory === category.name ? "text-violet-300" : "text-purple-300"
                      }`}
                    >
                      {category.icon}
                    </div>
                    <span className="text-base font-medium">{category.name}</span>

                    {preferences.foodCategory === category.name && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                        <CheckCircle2 size={18} className="text-violet-300" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === "mood" && (
          <motion.div
            key="mood"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Your Mood</h2>
            <p className="text-purple-200 text-center mb-8">How are you feeling today?</p>

            <div className="grid grid-cols-1 gap-3">
              {moodOptions.map((mood) => (
                <motion.div key={mood.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className={`h-16 w-full relative ${
                      preferences.mood === mood.name
                        ? "border-pink-400 bg-gradient-to-r from-pink-900/80 to-fuchsia-900/80"
                        : "bg-white/10 backdrop-blur-sm border-purple-300/30 hover:bg-white/20"
                    }`}
                    onClick={() => {
                      setPreferences({ ...preferences, mood: mood.name })
                      setStep("alcohol")
                    }}
                  >
                    <div className="absolute inset-0 flex items-center px-6">
                      <div className={`mr-4 ${preferences.mood === mood.name ? "text-pink-300" : "text-purple-300"}`}>
                        {mood.icon}
                      </div>
                      <span className="text-lg font-medium">{mood.name}</span>

                      {preferences.mood === mood.name && <CheckCircle2 size={22} className="ml-auto text-pink-300" />}
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === "alcohol" && (
          <motion.div
            key="alcohol"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Alcohol Preference</h2>
            <p className="text-purple-200 text-center mb-8">Would you like alcohol with your meal?</p>

            <div className="grid grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className={`h-32 w-full flex flex-col items-center justify-center gap-4 ${
                    preferences.alcohol === "yes"
                      ? "border-amber-400 bg-gradient-to-br from-amber-900/80 to-yellow-900/80"
                      : "bg-white/10 backdrop-blur-sm border-purple-300/30 hover:bg-white/20"
                  }`}
                  onClick={() => {
                    setPreferences({ ...preferences, alcohol: "yes" })
                    handleSubmit()
                  }}
                >
                  <Wine
                    size={40}
                    className={`${preferences.alcohol === "yes" ? "text-amber-300" : "text-purple-300"}`}
                  />
                  <span className="text-lg font-medium">Yes</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className={`h-32 w-full flex flex-col items-center justify-center gap-4 ${
                    preferences.alcohol === "no"
                      ? "border-blue-400 bg-gradient-to-br from-blue-900/80 to-cyan-900/80"
                      : "bg-white/10 backdrop-blur-sm border-purple-300/30 hover:bg-white/20"
                  }`}
                  onClick={() => {
                    setPreferences({ ...preferences, alcohol: "no" })
                    handleSubmit()
                  }}
                >
                  <Gift size={40} className={`${preferences.alcohol === "no" ? "text-blue-300" : "text-purple-300"}`} />
                  <span className="text-lg font-medium">No</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative">
              <motion.div
                className="w-16 h-16 rounded-full border-4 border-purple-300/30"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              />
              <motion.div
                className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </div>
            <h2 className="text-xl font-medium text-purple-200 mt-6">Curating perfect dishes for you...</h2>
            <p className="text-purple-300/80 mt-2 text-center max-w-xs">
              Based on your preferences, our AI is finding the best matches
            </p>
          </motion.div>
        )}

        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-block p-3 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 mb-4"
              >
                <Sparkles size={32} className="text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Your Perfect Matches</h2>
              <p className="text-purple-200">Based on your unique preferences</p>
            </div>

            <div className="space-y-6">
              {recommendations.map((dish, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.2 },
                  }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <Card className="overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-purple-500/20 shadow-xl shadow-purple-900/20">
                    <div className="flex flex-col">
                      <div className="h-[180px] overflow-hidden">
                        <img
                          src={dish.image || "/placeholder.svg"}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-xl font-bold text-white">{dish.name}</h3>
                          <div className="flex items-center bg-purple-900/50 px-3 py-1 rounded-full">
                            <span className="text-yellow-400">★</span>
                            <span className="ml-1 text-sm font-medium text-yellow-100">{dish.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">{dish.description}</p>
                        <div className="mt-4 flex">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-xs font-medium bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30"
                          >
                            View Details
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}>
              <Button
                className="w-full mt-8 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 h-14 text-white shadow-lg shadow-purple-900/30"
                onClick={() => {
                  setPreferences({
                    dietType: "",
                    foodCategory: "",
                    mood: "",
                    alcohol: "",
                  })
                  setStep("splash")
                }}
              >
                Start Over
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      {step !== "splash" && step !== "loading" && step !== "results" && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center">
          <div className="flex space-x-3 p-2 rounded-full bg-black/30 backdrop-blur-sm">
            {["dietType", "foodCategory", "mood", "alcohol"].map((s, i) => (
              <motion.div
                key={s}
                className={`h-2.5 w-10 rounded-full ${
                  ["dietType", "foodCategory", "mood", "alcohol"].indexOf(step) >= i
                    ? "bg-gradient-to-r from-purple-400 to-violet-500"
                    : "bg-white/20"
                }`}
                initial={{ scale: 0.9 }}
                animate={{ scale: ["dietType", "foodCategory", "mood", "alcohol"].indexOf(step) === i ? 1.1 : 1 }}
                transition={{
                  duration: 0.5,
                  repeat:
                    ["dietType", "foodCategory", "mood", "alcohol"].indexOf(step) === i ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

