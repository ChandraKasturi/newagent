'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XCircle, Trash2} from 'lucide-react'
import { useRouter } from 'next/navigation'

const YTHistory = () => {
  const [transcriptions, setTranscriptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in
React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      router.push('/sign-in')
    } else {
      fetchHistory()
    }
  }, [])

 


  const fetchHistory = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail')
      if (!userEmail) return

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ytranscribe/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         'x-session-id': localStorage.getItem('sessionId')
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail')
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Sort by created_at in descending order
        const sortedData = data.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        )
        setTranscriptions(sortedData)
        localStorage.setItem('transcriptionHistory', JSON.stringify(sortedData))
      }
    } catch (error) {
      console.error('Error fetching history:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ytranscribe/history/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': localStorage.getItem('sessionId')
        },
        body: JSON.stringify({ deleteId: id })
      })

      if (response.ok) {
        // Update local state and storage without refetching
        const updatedTranscriptions = transcriptions.filter(item => item._id !== id)
        setTranscriptions(updatedTranscriptions)
        localStorage.setItem('transcriptionHistory', JSON.stringify(updatedTranscriptions))
      }
    } catch (error) {
      console.error('Error deleting transcription:', error)
    }
  }

  // Update the getVideoId function to handle more URL formats
  const getVideoId = (url) => {
    try {
      const urlObj = new URL(url)
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        const searchParams = new URLSearchParams(urlObj.search)
        if (urlObj.hostname.includes('youtube.com')) {
          return searchParams.get('v')
        } else {
          // Handle youtu.be format
          return urlObj.pathname.slice(1)
        }
      }
    } catch (error) {
      console.error('Error parsing YouTube URL:', error)
      return null
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Transcription History</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {transcriptions.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-lg shadow-md overflow-hidden relative group"
              >
                {/* Video Preview - Updated to match you-transcribe implementation */}
                <div className="relative w-full pt-[56.25%]">
                  <iframe
                    src={`https://www.youtube.com/embed/${getVideoId(item.url)}`}
                    title={item.video_title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="p-4 pt-6 relative">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                    {item.video_title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="absolute bottom-2 right-2 p-2 rounded-full bg-white shadow-md 
                               text-red-500 hover:text-red-600 hover:bg-red-50 
                               transition-all duration-200 z-10"
                    aria-label="Delete transcription"
                  >
                    <Trash2 className="h-6 w-6" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {transcriptions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No transcriptions found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default YTHistory
