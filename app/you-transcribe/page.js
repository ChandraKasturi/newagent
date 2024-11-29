'use client'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import TaskProgress from '../components/TaskProgress'
import YouModal from '../components/YouModal'

const YouTranscribe = () => {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [userPrompt, setUserPrompt] = useState('')
  const [showProgress, setShowProgress] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [videoDuration, setVideoDuration] = useState(0)
  const promptTextareaRef = useRef(null)

  const extractVideoId = (url) => {
    //the video url can be youtube.com or youtu.be 
    const regExp = /^.*(youtube\.com\/|youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
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

  const getVideoDuration = async (videoId) => {
    return new Promise((resolve, reject) => {
      // Check if API is already loaded
      if (window.YT) {
        createPlayer(videoId, resolve, reject);
        return;
      }

      // If not loaded, create script tag and load API
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Setup global callback for when API is ready
      window.onYouTubeIframeAPIReady = () => {
        createPlayer(videoId, resolve, reject);
      };
    });
  };

  // Helper function to create player
  const createPlayer = (videoId, resolve, reject) => {
    try {
      // Create a temporary container for the player
      const tempContainer = document.createElement('div');
      tempContainer.id = 'dummy-player';
      tempContainer.style.display = 'none';
      document.body.appendChild(tempContainer);

      new window.YT.Player('dummy-player', {
        videoId: videoId,
        events: {
          onReady: (event) => {
            const duration = event.target.getDuration();
            event.target.destroy();
            document.body.removeChild(tempContainer);
            resolve(duration);
          },
          onError: (event) => {
            event.target.destroy();
            document.body.removeChild(tempContainer);
            reject(new Error('Failed to load video'));
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

 //if the credits are equal to 0, then show the error message
 if (JSON.parse(localStorage.getItem('userDetails')).credits === 0 ) {
  console.log(JSON.parse(localStorage.getItem('userDetails')).credits)
  setError('You have no credits left. Please purchase more credits.')
      return
    }

    const extractedVideoId = extractVideoId(url);
    
    if (extractedVideoId) {
      setIsLoading(true);
      setError('');
      
      try {
        const duration = await getVideoDuration(extractedVideoId);
        setVideoDuration(duration);
        
        if (duration > 3600) {
          setError('Video duration exceeds 60 minutes limit. Please choose a shorter video.');
          setShowPreview(false);
        } else {
          setVideoId(extractedVideoId);
          setShowPreview(true);
          setError('');
          setIsModalOpen(true);
          
          // Set focus to prompt textarea after a short delay
          // to ensure the element is rendered
          setTimeout(() => {
            promptTextareaRef.current?.focus()
          }, 5000)
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to get video duration. Please check the URL and try again.');
        setShowPreview(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please enter a valid YouTube URL');
    }
  };

  const handleTranscribe = async () => {
    setIsLoading(true)
    setError('')
    setShowProgress(true)
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/you-transcribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': localStorage.getItem('sessionId')
        },
        body: JSON.stringify({
          videourl: url,
          userprompt: userPrompt
        })
      })

      const data = await response.json()
      console.log('Server Response:', data)

      if (response.ok && data.status === 'success') {
        // Store the response data
        localStorage.setItem('transcribedVideo', JSON.stringify(data))
        
        // Complete the progress and redirect
        setTimeout(() => {
          setShowProgress(false)
          setIsLoading(false)
          router.push('/ytdetails')
        }, 1000)
      } else {
        setShowProgress(false)
        throw new Error(data.message || 'Failed to get transcript')
      }
    } catch (err) {
      setShowProgress(false)
      setError(err.message || 'Failed to get transcript')
      console.error('Transcription error:', err)
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
                  disabled={isLoading}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Checking...
                    </>
                  ) : 'Submit'}
                </button>
              </div>
            </div>
          </form>

          {error && (
                <div className="mt-4 p-4 rounded-md bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

          {/* YouModal Component */}
          <YouModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            message="Currently we support only English language videos that have captions. We plan to support more languages and transcribe without captions."
        
            autoCloseDuration={4000}
          />
          {/* Video Preview Section */}
          {showPreview && (
            <div className="mt-8 space-y-6">
              {/* Display duration info */}
             
              
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                />
              </div>

              <textarea
                ref={promptTextareaRef}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="w-full h-24 p-2 border border-gray-300 rounded-md"
              />
              
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleTranscribe}
                  disabled={isLoading || videoDuration > 3600}
                  className="inline-flex items-center rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Transcribe Video'}
                </button>
              </div>

              {/* Progress Tracker Overlay */}
              {showProgress && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
                    <TaskProgress 
                      onComplete={() => {
                        setShowProgress(false)
                       
                      }} 
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 rounded-md bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              {/* Transcript Display */} 
           
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default YouTranscribe