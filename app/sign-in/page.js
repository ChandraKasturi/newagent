'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useUserStore from '../store/userStore'


export const fetchWithSession = async (url, options = {}) => {
  
 

  const headers = {
    'Content-Type': 'application/json',
    ...(sessionId && { 'x-session-id': sessionId }),
    ...options.headers,
  }

  return fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  })
}

const SignIn = () => {
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)
 
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: ''
  })
  const [errors, setErrors] = useState({})

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      try {
        //console log the text I am trying to send
        console.log('I am trying to send:', formData.email)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/signin`, {
         
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email
          })
        })

        const data = await response.json()
        
        if (response.ok && data.status === 'success') {
          setStep(2)
          setIsEditing(false)
        } else {
          throw new Error(data.message || 'Failed to send verification code')
        }
      } catch (err) {
        setErrors({ email: err.message || 'Failed to send verification code' })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    if (formData.verificationCode.length === 6) {
      setIsLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/signin/verify`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            otp: formData.verificationCode
          })
        })

        // Debug: Log all headers
        console.log('All response headers:')
        response.headers.forEach((value, key) => {
          console.log(`${key}: ${value}`)
        })

        // read the response headers and get the x-session-id and store it in local storage as sessionId 
        const sessionId = response.headers.get('x-session-id')
        if (sessionId) {
          localStorage.setItem('sessionId', sessionId)
        }

        // Try different case variations
        

        console.log('Found session ID:', sessionId)

        if (sessionId) {
          
          console.log('Session ID found in response headers', localStorage.getItem('sessionId'))
        } else {
          console.warn('No session ID found in response headers')
        }

        const data = await response.json()
        
        if (response.ok && data.status === 'success') {
          // Store user data in Zustand
          const userData = {
            email: formData.email,
            ...data.user
          }
          setUser(userData)
          
          // Set local storage
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userEmail', formData.email)
          
          // Navigate to dashboard
          router.push('/dashboard')
        } else {
          throw new Error(data.message || 'Invalid verification code')
        }
      } catch (err) {
        setErrors({ 
          verificationCode: err.message || 'Verification failed' 
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEdit = () => {
    setIsEditing(true)
    setStep(1)
    setFormData(prev => ({
      ...prev,
      verificationCode: ''
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={!isEditing && step === 2}
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                    !isEditing && step === 2 ? 'bg-gray-50' : ''
                  }`}
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {!isEditing && step === 2 && (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                )}
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>
              )}
            </div>
          </div>

          {step === 2 && !isEditing && (
            <div className="space-y-4">
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                  Enter 6-digit verification code
                </label>
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  maxLength="6"
                  pattern="\d{6}"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter 6-digit code"
                  value={formData.verificationCode}
                  onChange={handleChange}
                />
              </div>

              <button
                type="button"
                onClick={handleSignIn}
                disabled={formData.verificationCode.length !== 6}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Sign in
              </button>
            </div>
          )}

          {(step === 1 || isEditing) && (
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          )}

          <div className="text-sm text-center">
            <a href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
              Don't have an account? Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn