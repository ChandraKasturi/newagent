import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            About AgentGenix
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Empowering Your Digital Experience
          </p>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/about-us.png"
              alt="About AgentGenix"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Text Content Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600">
              At AgentGenix, we are dedicated to revolutionizing the way people interact with AI technology. Our platform combines cutting-edge artificial intelligence with user-friendly interfaces to deliver powerful solutions for everyday challenges.
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              What We Do
            </h2>
            <p className="text-lg text-gray-600">
              We specialize in developing AI-powered tools that help individuals and businesses streamline their workflows, enhance productivity, and unlock new possibilities. From transcription services to advanced data analysis, our suite of tools is designed to make complex tasks simple and accessible.
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              Our Values
            </h2>
            <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
              <li>Innovation in AI Technology</li>
              <li>User-Centric Design</li>
              <li>Reliability and Trust</li>
              <li>Continuous Improvement</li>
            </ul>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Team</h3>
            <p className="text-gray-600">
              Our diverse team of experts brings together years of experience in AI, machine learning, and software development.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
            <p className="text-gray-600">
              We're constantly pushing the boundaries of what's possible with AI technology, developing new solutions for tomorrow's challenges.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Impact</h3>
            <p className="text-gray-600">
              Our solutions have helped thousands of users worldwide improve their productivity and achieve their goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About