'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAgentsOpen, setIsAgentsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

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
  }

  const handleAgentsToggle = () => {
    setIsAgentsOpen(!isAgentsOpen)
  }

  return (
    <nav className="bg-white shadow-md">
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
              <img 
                className="h-8 w-auto" 
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" 
                alt="Your Company" 
              />
            </div>
          </div>

          {/* Navigation and Auth Buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
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
                <svg 
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${isAgentsOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isAgentsOpen && (
                <div 
                  ref={dropdownRef}
                  className="absolute left-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                >
                  <Link
                    href="/you-transcribe"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    You Transcribe
                  </Link>
                  <Link
                    href="/resume-ace"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Resume Ace
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/services" 
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              About
            </Link>
            
            <div className="flex space-x-4 ml-4">
              <Link 
                href="/sign-in"
                className="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </Link>
              <Link 
                href="/sign-up"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Agents section in mobile */}
            <button
              type="button"
              className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              onClick={handleAgentsToggle}
            >
              Agents
            </button>
            {isAgentsOpen && (
              <div className="pl-4">
                <Link
                  href="/you-transcribe"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  You Transcribe
                </Link>
                <Link
                  href="/resume-ace"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  Resume Ace
                </Link>
              </div>
            )}
            
            <Link 
              href="/services" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              About
            </Link>
            
            <div className="mt-4 flex flex-col space-y-2 px-3">
              <Link 
                href="/sign-in"
                className="rounded-md bg-gray-100 px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-200 text-center"
              >
                Sign in
              </Link>
              <Link 
                href="/sign-up"
                className="rounded-md bg-indigo-600 px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 text-center"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar