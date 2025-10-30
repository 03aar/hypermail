'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
      >
        {/* Close button */}
        <div className="flex justify-end mb-4">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to HyperMail</h1>
          <p className="text-gray-600">Let&apos;s create your account</p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <button className="w-full h-14 border-2 border-gray-200 rounded-xl flex items-center justify-start px-4 hover:border-gray-900 hover:bg-gray-50 transition-all group">
            <div className="w-6 h-6 mr-3 flex items-center justify-center">
              <span className="text-xl">G</span>
            </div>
            <span className="font-medium text-gray-700 group-hover:text-gray-900">
              Continue with Google Workspace
            </span>
          </button>

          <button className="w-full h-14 border-2 border-gray-200 rounded-xl flex items-center justify-start px-4 hover:border-gray-900 hover:bg-gray-50 transition-all group">
            <div className="w-6 h-6 mr-3 flex items-center justify-center">
              <span className="text-xl">M</span>
            </div>
            <span className="font-medium text-gray-700 group-hover:text-gray-900">
              Continue with Microsoft 365
            </span>
          </button>

          <button className="w-full h-14 border-2 border-gray-200 rounded-xl flex items-center justify-start px-4 hover:border-gray-900 hover:bg-gray-50 transition-all group">
            <div className="w-6 h-6 mr-3 flex items-center justify-center">
              <span className="text-xl"></span>
            </div>
            <span className="font-medium text-gray-700 group-hover:text-gray-900">
              Continue with Apple
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="name@company.com"
            className={`w-full h-14 px-4 border-2 rounded-xl text-lg transition-all ${
              email && !isValid
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100'
            } outline-none`}
          />
          {email && isValid && (
            <div className="absolute right-4 top-4 text-green-500">✓</div>
          )}
        </div>

        {/* Continue Button */}
        <button
          disabled={!isValid}
          className={`w-full h-14 rounded-xl font-semibold text-white transition-all ${
            isValid
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:scale-[1.02]'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Continue with Email
        </button>

        {/* Sign In Link */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
