'use client'
import React, { useState } from 'react'

const YouTranscribe = () => {
  const [url, setUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const extractedVideoId = extractVideoId(url)
    if (extractedVideoId) {
      setVideoId(extractedVideoId)
      setShowPreview(true)
    } else {
      alert('Please enter a valid YouTube URL')
    }
  }

  const handleTranscribe = () => {
    // Handle transcription logic here
    console.log('Transcribing video:', videoId)
  }

  return (
    <div className="container mx-auto px-4 mt-[10vh]">
      <div className="max-w-3xl mx-auto">
        {/* Form Container - This width will be referenced for preview */}
        <div className="w-full">
          {/* URL Input Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="url" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                YouTube URL
              </label>
              <div className="flex gap-4">
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1 min-w-0 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 whitespace-nowrap"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>

          {/* Video Preview Section - Same width as form above */}
          {showPreview && (
            <div className="mt-8 space-y-6">
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                />
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleTranscribe}
                  className="inline-flex items-center rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Transcribe Video
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default YouTranscribe