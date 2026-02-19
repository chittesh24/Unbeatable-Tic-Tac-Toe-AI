'use client'

import { motion } from 'framer-motion'
import { Sun, Moon, Github, Trophy } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import Link from 'next/link'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass dark:glass-dark rounded-2xl p-4 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">T³</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Unbeatable AI
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Game Theory Mastery
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Leaderboard Link */}
          <Link href="/leaderboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 glass dark:glass-dark rounded-lg hover:bg-white/20 transition-colors"
              aria-label="Leaderboard"
            >
              <Trophy className="w-5 h-5" />
            </motion.button>
          </Link>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 glass dark:glass-dark rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </motion.button>

          {/* GitHub Link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 glass dark:glass-dark rounded-lg hover:bg-white/20 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.button>
          </a>
        </div>
      </div>
    </motion.header>
  )
}
