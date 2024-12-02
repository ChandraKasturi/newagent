'use client'

import React from 'react'
import { motion } from 'framer-motion'

const PricingCard = ({ tier, price, credits, features, isPopular, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`relative rounded-3xl p-8 ${isPopular ? 'bg-gray-900' : 'bg-white/60'} ring-1 ring-gray-900/10 sm:p-10`}
  >
    <h3 id={`tier-${tier.toLowerCase()}`} 
        className={`text-base/7 font-semibold ${isPopular ? 'text-indigo-400' : 'text-indigo-600'}`}>
      {tier}
    </h3>
    <p className="mt-4 flex items-baseline gap-x-2">
      <span className={`text-5xl font-semibold tracking-tight ${isPopular ? 'text-white' : 'text-gray-900'}`}>
        ${price}
      </span>
      <span className={`text-base ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
    </p>
    <p className={`mt-6 text-base/7 ${isPopular ? 'text-gray-300' : 'text-gray-600'}`}>
      {credits} credits/month
    </p>
    <ul role="list" className={`mt-8 space-y-3 text-sm/6 ${isPopular ? 'text-gray-300' : 'text-gray-600'} sm:mt-10`}>
      {features.map((feature, index) => (
        <li key={index} className="flex gap-x-3">
          <svg className={`h-6 w-5 flex-none ${isPopular ? 'text-indigo-400' : 'text-indigo-600'}`} 
               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    <a href="#" 
       aria-describedby={`tier-${tier.toLowerCase()}`}
       className={`mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold 
       ${isPopular 
         ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400' 
         : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300'} 
       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-10`}>
      Get started today
    </a>
  </motion.div>
)

const AgentPricing = ({ agent, credits, index }) => {
  // Define different styles for each agent
  const agentStyles = {
    'Transcribe Agent': {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      hover: 'hover:border-blue-300',
    },
    'Resume Ace': {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      hover: 'hover:border-purple-300',
    },
    'MindMap Genie': {
      bg: 'bg-green-50',
      border: 'border-green-200',
      hover: 'hover:border-green-300',
    },
    'Persona Builder': {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      hover: 'hover:border-rose-300',
    },
  }

  const style = agentStyles[agent] || agentStyles['Transcribe Agent']

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-xl border-2 ${style.bg} ${style.border} ${style.hover} transition-all duration-300`}
    >
      <h4 className="text-xl font-bold text-gray-900 text-center mb-4">{agent}</h4>
      <p className="text-sm text-gray-600">
        {credits.split(':').map((part, idx) => (
          <span key={idx}>
            {idx === 0 ? (
              <span className="font-bold">{part}:</span>
            ) : (
              part
            )}
          </span>
        ))}
      </p>
    </motion.div>
  )
}

const Pricing = () => {
  const plans = [
    {
      tier: "Free",
      price: "0",
      credits: "20",
      features: [
        "All agents",
        "Monthly Credit Reset",
        "Email support",
        "Basic agent capabilities"
      ]
    },
    {
      tier: "Lite",
      price: "10",
      credits: "100",
      features: [
        "All agents",
        "Monthly Credit Reset",
        "Email support",
        "Advanced features"
      ],
      isPopular: true
    },
    {
      tier: "Pro",
      price: "15",
      credits: "200",
      features: [
        "All agents",
        "Monthly Credit Reset",
        "Email support",
        "Priority Queue for agents"
      ]
    }
  ]

  const agentPricing = [
    {
      name: "Transcribe Agent",
      credits: "1 Credit per Video / Audio: Includes transcription, summary, key points, tweet, and article generation. Additional 2 credits for user-provided custom prompts."
    },
    {
      name: "JobMatch Pro",
      credits: "5 Credits for initial resume creation: 1 Credit for each custom resume created for a given job description and optimizes for ATS systems."
    },
    {
      name: "MindMap Genie",
      credits: "1 Credit per retrieval task: Summarize, extract, or organize scratchpad data. 1 Credit for each 50 inputs like links, tweets, articles, etc. to MindMap Genie." 
    },
    {
      name: "Persona Builder",
      credits: "10 Credits per persona generation: Gathers public data and builds a detailed persona profile. 1 Credit for follow-up insights."
    }
  ]

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      {/* Background gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Choose the right plan for you
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="mx-auto mt-16 grid max-w-lg gap-8 lg:max-w-4xl lg:grid-cols-3">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} index={index} />
        ))}
      </div>

      {/* Agent Pricing Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto max-w-4xl mt-24"
      >
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
          Credit Usage Per Agent
        </h3>
        <div className="grid gap-6 lg:grid-cols-2">
          {agentPricing.map((agent, index) => (
            <AgentPricing
              key={index}
              agent={agent.name}
              credits={agent.credits}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Pricing
