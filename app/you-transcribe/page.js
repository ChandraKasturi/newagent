'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'





const YouTranscribe = () => {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')



  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // Check if user is logged in
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      router.push('/sign-in')
    }
  }, [router])

  const handleSubmit = (e) => {
    e.preventDefault()
    const extractedVideoId = extractVideoId(url)
    if (extractedVideoId) {
      setVideoId(extractedVideoId)
      setShowPreview(true)
      setTranscript('')
      setError('')
    } else {
      setError('Please enter a valid YouTube URL')
    }
  }

  const handleTranscribe = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/you-transcribe`, {
        method: 'POST',
        //headers to include the session id  as x-session-id 
        
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': localStorage.getItem('sessionId')
        },
        body: JSON.stringify({
          videourl: url // Send the full video URL
        })
      })

      const data = await response.json()
      console.log('Server Response:', data) // Log the server response

      if (response.ok && data.status === 'success') {
        setTranscript(data.text || '') // Assuming the response has a 'text' field with the transcript
      } else {
        throw new Error(data.message || 'Failed to get transcript')
      }
    } catch (err) {
      setError(err.message || 'Failed to get transcript')
      console.error('Transcription error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 mt-[10vh]">
      <div className="max-w-3xl mx-auto">
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

          {/* Video Preview Section */}
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
                  type="button"
                  onClick={handleTranscribe}
                  disabled={isLoading}
                  className="inline-flex items-center rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Transcribing...
                    </>
                  ) : 'Transcribe Video'}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-md bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              {/* Transcript Display */}
              {transcript && (
                <div className="p-4 rounded-md border border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Transcript</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">{transcript}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default YouTranscribe