'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, Trophy, Play } from 'lucide-react'
import { useState } from 'react'

export default function WelcomeScreen({ onStart }) {
  const [selectedPlayer, setSelectedPlayer] = useState('X')

  const handleStart = () => {
    onStart(selectedPlayer)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="glass dark:glass-dark rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4"
        >
          <Brain className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
        >
          Unbeatable Tic-Tac-Toe AI
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 dark:text-gray-400 text-lg"
        >
          Challenge an AI that never loses
        </motion.p>
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <FeatureCard
          icon={<Brain className="w-6 h-6" />}
          title="Minimax Algorithm"
          description="Perfect strategic play"
        />
        <FeatureCard
          icon={<Zap className="w-6 h-6" />}
          title="Alpha-Beta Pruning"
          description="Optimized performance"
        />
        <FeatureCard
          icon={<Trophy className="w-6 h-6" />}
          title="Unbeatable"
          description="Mathematically proven"
        />
      </motion.div>

      {/* Player Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <label className="block text-center text-lg font-semibold mb-4">
          Choose Your Symbol
        </label>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <button
            onClick={() => setSelectedPlayer('X')}
            className={`p-6 rounded-2xl font-bold text-2xl transition-all transform hover:scale-105 ${
              selectedPlayer === 'X'
                ? 'bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-lg scale-105'
                : 'glass dark:glass-dark hover:bg-white/20'
            }`}
          >
            <div className="text-4xl mb-2">✖️</div>
            <div className="text-sm font-semibold">X - Go First</div>
          </button>
          <button
            onClick={() => setSelectedPlayer('O')}
            className={`p-6 rounded-2xl font-bold text-2xl transition-all transform hover:scale-105 ${
              selectedPlayer === 'O'
                ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg scale-105'
                : 'glass dark:glass-dark hover:bg-white/20'
            }`}
          >
            <div className="text-4xl mb-2">⭕</div>
            <div className="text-sm font-semibold">O - Go Second</div>
          </button>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <button
          onClick={handleStart}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 mx-auto"
        >
          <Play className="w-6 h-6" />
          Start Game
        </button>
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center"
      >
        <p className="text-sm text-blue-600 dark:text-blue-400">
          💡 <strong>Pro Tip:</strong> The AI uses advanced game theory. Your best outcome is a draw!
        </p>
      </motion.div>
    </motion.div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="glass dark:glass-dark rounded-xl p-4 text-center hover:scale-105 transition-transform">
      <div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}
