import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { db } from '../../../firebase-config'
import { collection, onSnapshot } from 'firebase/firestore'

const Banner = () => {
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [images, setImages] = useState([])

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'images'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setImages(data)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [current, images.length])

  if (loading || images.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px] bg-white w-full z-0">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full z-25 mx-auto overflow-visible shadow-md h-[200px] sm:h-[300px] md:h-[400px] lg:h-[300px]"
    >
      {images.map((img, index) => (
        <motion.div
          key={img.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={img.url}
            alt={img.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 z-20"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 z-20"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? 'bg-white scale-110' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default Banner
