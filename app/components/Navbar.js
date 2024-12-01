'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useUserStore from '../store/userStore'
import Image from 'next/image'


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAgentsOpen, setIsAgentsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const clearUser = useUserStore((state) => state.clearUser)
  const [userDetails, setUserDetails] = useState(null)
  
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loginStatus)
    
    if (loginStatus) {
      const userDetailsStr = localStorage.getItem('userDetails')
      if (userDetailsStr) {
        const details = JSON.parse(userDetailsStr)
        setUserDetails(details)
      }
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsAgentsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setIsAgentsOpen(false)
  }

  const handleAgentsToggle = () => {
    setIsAgentsOpen(!isAgentsOpen)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': localStorage.getItem('sessionId')
        }
      })

      if (response.ok) {
        // Clear local storage
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userEmail')
        localStorage.removeItem('sessionId')
        localStorage.removeItem('userDetails')
        localStorage.removeItem('transcriptionHistory')
        localStorage.removeItem('transcribedVideo')
        // Clear Zustand stores
       
        
        // Update local state
        setIsLoggedIn(false)
        
        // Redirect to home page
        router.push('/')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false) // Close mobile menu after clicking
    }
  }

  return (
    <nav className="bg-white shadow-md h-16 fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={handleMobileMenuToggle}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              
              <svg 
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} size-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} size-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Logo section */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                AgentGenix
              </Link>
            </div>
          </div>

          {/* Navigation and Auth Buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {isLoggedIn ? (
              <>
                {/* Agents Dropdown */}
                <div className="relative">
                  <button
                    ref={buttonRef}
                    type="button"
                    className="group rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 inline-flex items-center"
                    onClick={handleAgentsToggle}
                    aria-expanded={isAgentsOpen}
                  >
                    <span>Agents</span>
                    <svg className={`ml-2 h-4 w-4 transition-transform duration-200 ${isAgentsOpen ? 'rotate-180' : ''}`}
                         fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {isAgentsOpen && (
                    <div ref={dropdownRef}
                         className="absolute left-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <Link href="/you-transcribe" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        You Transcribe
                      </Link>
                      <Link href="/jobmaster-pro" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Jobmaster Pro
                      </Link>
                      <Link href="/mindmap-genie" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Mindmap Genie
                      </Link>
                      <Link href="/date-assist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Date Assist
                      </Link>
                    </div>
                  )}
                </div>

                {/* User Profile Section */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Image
                        src="/images/avatar.png"
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{userDetails?.firstname || 'User'}</span>
                      <span className="text-xs text-gray-500">{userDetails?.credits || 0} credits</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="rounded-md bg-blue-200 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  About
                </button>
                <Link href="/sign-in"
                      className="rounded-md bg-white border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50">
                  Sign in
                </Link>
                <Link href="/sign-up"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  onClick={handleAgentsToggle}
                >
                  Agents
                </button>
                {isAgentsOpen && (
                  <div className="pl-4">
                    <Link href="/you-transcribe" className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                      You Transcribe
                    </Link>
                    <Link href="/jobmaster-pro" className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                      Jobmaster Pro
                    </Link>
                    <Link href="/mindmap-genie" className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                      Mindmap Genie
                    </Link>
                    <Link href="/date-assist" className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                      Date Assist
                    </Link>
                  </div>
                )}
                <div className="mt-4 px-3">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Image
                        src="/images/avatar.png"
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{userDetails?.firstname || 'User'}</span>
                      <span className="text-xs text-gray-500">{userDetails?.credits || 0} credits</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-md bg-blue-200 px-3 py-2 text-base font-medium text-gray-900 hover:bg-blue-900 text-center"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  About
                </button>
                <Link href="/sign-in"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block rounded-md bg-white border border-gray-300 px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 text-center">
                  Sign in
                </Link>
                <Link href="/sign-up"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block rounded-md bg-indigo-600 px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 text-center">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar