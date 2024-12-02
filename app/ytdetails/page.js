'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const YTDetails = () => {
  const router = useRouter()
  const [textAreaContent, setTextAreaContent] = useState('')
  const [selectedBadge, setSelectedBadge] = useState('transcribedtext')
  const [videoDetails, setVideoDetails] = useState({})
  const [transcribedData, setTranscribedData] = useState(null)
  const [badges, setBadges] = useState(["transcribedtext", "tweet", "summary"])
  const [badgeConfig, setBadgeConfig] = useState({
    transcribedtext: { 
      label: 'Transcript', 
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      ringColor: 'ring-blue-400'
    },
    tweet: { 
      label: 'Tweet', 
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      ringColor: 'ring-green-400'
    },
    summary: { 
      label: 'Summary', 
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      ringColor: 'ring-yellow-400'
    }
  })

  // Load initial data
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('transcribedVideo')
      if (!storedData) {
        router.push('/you-transcribe')
        return
      }

      const transcribedVideo = JSON.parse(storedData)
      
      // Add userprompt badge only if it exists and has value
      if (transcribedVideo.userprompt && transcribedVideo.userprompt.trim() !== '' && !badges.includes("userprompt")) {
        setBadges(prev => [...prev, "userprompt"])
        setBadgeConfig(prev => ({
          ...prev,
          userprompt: {
            label: 'User Prompt',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-800',
            ringColor: 'ring-purple-400'
          }
        }))
      }

      setTranscribedData(transcribedVideo)
      setVideoDetails(transcribedVideo.video_details || {})
      
      // Set initial content for transcript
      if (transcribedVideo.transcribedtext) {
        console.log("transcribedtext", transcribedVideo.transcribedtext)
        setTextAreaContent(transcribedVideo.transcribedtext)
      }
    } catch (error) {
      console.error('Error loading transcribed data:', error)
      router.push('/you-transcribe')
    }
  }, [router])

  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge)
    if (transcribedData && transcribedData[badge]) {
      setTextAreaContent(transcribedData[badge])
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textAreaContent)
      alert('Content copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  const handleSpeak = () => {
    console.log('Speaker is clicked')
  }

  // Return early if no data
  if (!transcribedData) {
    return <div className="text-center mt-[120px]">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 mt-[120px]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            <p>Title: {videoDetails.title}</p>
          </h1>
        </header>

        {/* Main Content Container */}
        <div className="flex flex-col items-center space-y-6">
          {/* Badges Section */}
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-2xl">
            {badges.map((badge) => {
              const config = badgeConfig[badge] || {
                label: badge,
                bgColor: 'bg-gray-100',
                textColor: 'text-gray-800',
                ringColor: 'ring-gray-400'
              }
              
              return (
                <button
                  key={badge}
                  onClick={() => handleBadgeClick(badge)}
                  className={`
                    ${config.bgColor} 
                    ${config.textColor}
                    ${selectedBadge === badge 
                      ? `ring-2 ring-offset-2 ${config.ringColor}`
                      : ''
                    }
                    text-xs font-medium px-2.5 py-0.5 rounded-full 
                    cursor-pointer transition-all duration-200
                    hover:opacity-80
                  `}
                >
                  {config.label}
                </button>
              )
            })}
          </div>

          {/* Textarea Container */}
          <div className="relative w-full max-w-2xl">
            {/* Action Buttons */}
            <div className="absolute right-4 top-4 flex gap-2 bg-white p-1 rounded-lg shadow-sm z-10">
              <button
                onClick={handleCopy}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-200"
                title="Copy to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
              
              <button
                onClick={handleSpeak}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-200"
                title="Text to speech"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <textarea
              value={textAreaContent}
              onChange={(e) => setTextAreaContent(e.target.value)}
              className="w-full h-96 pt-16 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Select a badge to see content..."
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default YTDetails