'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const router = useRouter()
  // Navigation handlers
  const handleNext = () => {
    console.log('Next clicked')
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const handlePrevious = () => {
    console.log('Previous clicked')
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleDotClick = (index) => {
    console.log('Dot clicked:', index)
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  // Auto scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 10000)

    return () => clearInterval(timer)
  }, [])

  const slides = [
    {
      title: "AI-Powered Transcription Service",
      description: "Transform any video into actionable insights! Upload a video URL to get a full English transcription, concise summaries, key points, tweet drafts, articles with images, or even custom outputs based on your own prompts.",
      image: "/images/transcript-maestro.png",
      ctaText: "Try You Transcribe",
    },
    {
      title: "AI-Powered Resume Builder",
      description: "Your job deserves a perfectly tailored resume! Upload your job description, and let JobMatch Pro craft a resume that aligns with the JD, optimizes for ATS systems, and sets you apart from the crowd.",
      image: "/images/jobmatch-pro.png",
     //  ctaText: "Try JobMatch Pro",
     ctaText: "Coming on December 10th!",
    },
    {
      title: "Personalized Mind Maps",
      description: "Declutter your mind! Whether it's a grocery list, links, articles, tweets, or videos, drop them into MindMap Genie. Ask for summaries, insights, or retrievals anytime—your personal brain assistant is ready.",
      image: "/images/mindmap-genie.png",
      //ctaText: "Try MindMap Genie",
      ctaText: "Coming on December 17th!",
    },
    {
      title: "Date Assistant",
      description: "Decode the person you're dating! Persona Builder gathers public information to create a profile of your partner, helping you understand them better and build stronger connections.",
      image: "/images/persona-builder.png",
      //ctaText: "Try Date Assistant",
      ctaText: "Coming on January 15th!",
    }

  ]

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrentSlide((prevSlide) => (prevSlide + newDirection + slides.length) % slides.length)
  }

  return (
    
    <div className="relative overflow-hidden bg-white h-[calc(85vh-64px)] mt-16">
    
      <div className="relative h-full">
        
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            className="absolute w-full h-full"
          >
            <div className="h-full px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16">
              <div className="grid max-w-screen-xl mx-auto lg:grid-cols-12 items-center h-full">
                <div className="mr-auto place-self-center lg:col-span-7">
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                  <motion.button 
                    onClick={() => router.push('/sign-up')}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
                  >
                    {slides[currentSlide].ctaText}
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                    </svg>
                  </motion.button>
                </div>
                <motion.div 
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="hidden lg:mt-0 lg:col-span-5 lg:flex items-center justify-center h-full"
                >
                  <img 
                    src={slides[currentSlide].image} 
                    alt="mockup" 
                    className="w-full max-h-[70vh] object-contain"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                currentSlide === index ? 'bg-indigo-600' : 'bg-gray-300'
              } hover:bg-indigo-400`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

       
      </div>
    </div>
  )
}

export default HeroSection