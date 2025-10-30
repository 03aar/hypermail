'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const [introPhase, setIntroPhase] = useState(0)

  useEffect(() => {
    // Skip intro if user has seen it before
    const hasSeenIntro = localStorage.getItem('hypermail_intro_seen')
    if (hasSeenIntro) {
      setShowIntro(false)
      return
    }

    // Phase 0: Show H (1.5s)
    const timer1 = setTimeout(() => setIntroPhase(1), 1500)
    // Phase 1: Show HyperMail (1s)
    const timer2 = setTimeout(() => setIntroPhase(2), 2500)
    // Phase 2: Show logo mark (1.5s)
    const timer3 = setTimeout(() => setIntroPhase(3), 4000)
    // Phase 3: Show tagline (1s)
    const timer4 = setTimeout(() => setIntroPhase(4), 5000)
    // Phase 4: Transition to landing page (1s)
    const timer5 = setTimeout(() => {
      localStorage.setItem('hypermail_intro_seen', 'true')
      setShowIntro(false)
    }, 6500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [])

  const skipIntro = () => {
    localStorage.setItem('hypermail_intro_seen', 'true')
    setShowIntro(false)
  }

  if (showIntro) {
    return (
      <div
        className="fixed inset-0 bg-black flex items-center justify-center cursor-pointer"
        onClick={skipIntro}
      >
        <div className="text-center">
          <AnimatePresence mode="wait">
            {introPhase === 0 && (
              <motion.div
                key="h"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              >
                <h1 className="text-[120px] font-bold text-white">H</h1>
              </motion.div>
            )}

            {introPhase >= 1 && introPhase < 4 && (
              <motion.div
                key="hypermail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex gap-0">
                  {['H', 'y', 'p', 'e', 'r', 'M', 'a', 'i', 'l'].map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.08,
                        ease: 'easeOut',
                      }}
                      className="text-[80px] font-bold text-white"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                {introPhase >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative w-24 h-24 border-2 border-white/30 rounded-lg flex items-center justify-center">
                      <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="text-4xl"
                      >
                        ⚡
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {introPhase >= 3 && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                    className="text-2xl font-light text-gray-300 tracking-wider"
                  >
                    Email, elevated to intelligence
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
              H
            </div>
            <span className="text-xl font-bold">HyperMail</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full hover:shadow-lg transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-7xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6"
          >
            Email, elevated to
            <br />
            intelligence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            The fastest, smartest email platform built for executives and high-performance teams
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <Link
              href="/auth/signup"
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-semibold"
            >
              Get Started — It&apos;s free
            </Link>

            <p className="text-sm text-gray-500">
              Trusted by teams at Google, Stripe, Notion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="⚡"
              title="Lightning Fast"
              description="Zero-lag navigation with keyboard-first interface. Process emails in seconds, not minutes."
            />
            <FeatureCard
              icon="🤖"
              title="AI-Powered"
              description="Smart triage, auto-drafting, and predictive responses that learn your communication style."
            />
            <FeatureCard
              icon="🏢"
              title="Enterprise Ready"
              description="Built for teams with collaboration, analytics, and enterprise-grade security."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 HyperMail. Built with obsession to detail.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}
