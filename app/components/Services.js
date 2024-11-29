'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const serviceVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Services
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Transform your business with our cutting-edge AI solutions
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* AI Consulting Service */}
          <motion.div 
            variants={serviceVariants}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative h-64">
              <Image
                src="/images/consulting1.png"
                alt="AI Consulting"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
               
            Unlock the Power of Artificial Intelligence
              </h3>
              <p className="text-gray-600 mb-6">
                Unlock the power of AI for your business with expert guidance and tailored strategies.
              </p>
              <div className="mb-6">
                <p className="text-xl font-bold text-indigo-600 mb-2">
                  Consulting Session you will get:
                </p>
               
              </div>
              <ul className="space-y-3 mb-8">
                {['Guidance on implementing AI strategies specific to your business', 'Insights on the latest AI tools, technologies, and best practices', 'Real-world solutions for integrating AI into your workflows'].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <svg className="w-3 h-3 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="6" />
  </svg>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
               
              60-Minute Free Call
              </h4>
             <div className="mb-6 relative z-10 text-black bg-white p-4 rounded-lg">
              This is your chance to pick my brain, explore possibilities, and understand how AI can add value to your business!
              </div>
              <div className="text-center">
              <a
                href="https://cal.com/agentgenix/consulting" target="_blank" rel="noopener noreferrer"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
              
                Book Free Consultation
            
              </a>
              </div>
            </div>
          </motion.div>

          {/* AI MVP Development Service */}
          <motion.div 
            variants={serviceVariants}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative h-64">
              <Image
                src="/images/mvp.png"
                alt="AI MVP Development"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                
                AI MVP Development: Build Your Vision, Fast
              </h3>
              <p className="text-gray-600 mb-6">
              Got an idea for an AI product? Let me help you bring it to life! Whether it’s an Agent, Recommendation System, or Custom AI solution.
              </p>
              <div className="mb-6">
                <p className="text-xl font-bold text-indigo-600 mb-2">
                  Starting at $999 you will get:
                </p>
               
              </div>
              <ul className="space-y-3 mb-8">
                {['A fully functional AI-powered MVP starting in 2 weeks', 'Expert insights to prioritize the right features for maximum impact', 'Scalable and robust architecture to grow with your business needs'].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <svg className="w-3 h-3 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="6" />
  </svg>
                    {item}
                  </motion.li>
                ))}
              </ul>
               <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
               
              60-Minute Free Call
              </h4>
              <div className="mb-6 relative z-10 text-black bg-white p-4 rounded-lg">
              Let's collaborate in a call to dive into your project ideas, explore possibilities, and outline a clear path to turning your vision into reality!
              </div>
              <div className="text-center">
              <a
                href="https://cal.com/agentgenix/mvp" target="_blank" rel="noopener noreferrer"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
                Book MVP Discussion
              </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Services