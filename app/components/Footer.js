import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/3 mb-4">
            <h4 className="font-bold">Company</h4>
            <ul>
              <li><a href="#" className="hover:underline">Agents</a></li>
              <li><a href="#" className="hover:underline">Pricing</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/3 mb-4">
            <h4 className="font-bold">Our Services</h4>
            <ul>
              <li><a href="#" className="hover:underline">Services</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/3 mb-4">
            <h4 className="font-bold">Address</h4>
            <p>27th Main, HSR Layout, Bangalore</p>
            <p>Karnataka, India, 560102</p>
          </div>
          <div className="w-full sm:w-1/3 mb-4">
            <h4 className="font-bold">Contact</h4>
            <p>Email: support@agentgenix.io</p>
            <p>Phone: (91) 9686978345</p>
          </div>
          <div className="w-full sm:w-1/3 mb-4">
            <h4 className="font-bold">Follow Us</h4>
            <div className="flex space-x-4 mt-2">
              <a  target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                <FaFacebook size={24} />
              </a>
              <a  target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <FaTwitter size={24} />
              </a>
              <a  target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                <FaInstagram size={24} />
              </a>
              <a  target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer