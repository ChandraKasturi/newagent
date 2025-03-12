'use client'
import React from 'react'
import AgentCard from '../components/AgentCard'

import { useRouter } from 'next/navigation'


const agents = [
  {
    name: 'You Transcribe',
    description: 'Transform any video into actionable insights! Upload a video URL to get a full English transcription, concise summaries, key points, tweet drafts, articles with images, or even custom outputs based on your own prompts.',
    cta: 'Start turning videos into value!',
    imagePath: '/images/transcript-maestro.png',
    route: '/you-transcribe',
    buttonClass: 'bg-sky-600 hover:bg-sky-700'
  },
  {
    name: 'JobMatch Pro',
    description: 'Your job deserves a perfectly tailored resume! Upload your job description, and let JobMatch Pro craft a resume that aligns with the JD, optimizes for ATS systems, and sets you apart from the crowd.',
   // cta: 'Craft your winning resume today!',
   cta: 'Coming on March 31st!',
    imagePath: '/images/jobmatch-pro.png',
    route: '/agents/jobmatch-pro',
    buttonClass: 'bg-stone-600 hover:bg-stone-700'
  },
  {
    name: 'MindMap Genie',
    description: "Declutter your mind! Whether it's a grocery list, links, articles, tweets, or videos, drop them into MindMap Genie. Ask for summaries, insights, or retrievals anytime—your personal brain assistant is ready.",
   // cta: 'Get organized. Start exploring!',
   cta: 'Coming on April 15!',
    imagePath: '/images/mindmap-genie.png',
    route: '/agents/mindmap-genie',
    buttonClass: 'bg-orange-600 hover:bg-orange-700'
  },
  {
    name: 'Persona Builder',
    description: "Decode the person you're dating! Persona Builder gathers public information to create a profile of your partner, helping you understand them better and build stronger connections.",
   // cta: 'Discover, connect, and grow!',
   cta: 'Coming on May 1st!',
    imagePath: '/images/persona-builder.png',
    route: '/agents/persona-builder',
    buttonClass: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
  }
]

const Dashboard = () => {
  const router = useRouter()

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      router.push('/sign-in')
    }
  }, [router])
  
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to AgentGenix
          </h1>
          <p className="text-xl text-gray-600">
            Choose your AI Agent and start exploring the possibilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agents.map((agent) => (
            <AgentCard
              key={agent.name}
              name={agent.name}
              description={agent.description}
              cta={agent.cta}
              imagePath={agent.imagePath}
              route={agent.route}
              buttonClass={agent.buttonClass}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
