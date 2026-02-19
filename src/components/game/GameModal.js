'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { Trophy, HandshakeIcon, XCircle, RotateCcw } from 'lucide-react'

export default function GameModal() {
  const { gameStatus, winner, isDraw, humanPlayer, resetGame, analytics } = useGameStore()

  const isOpen = gameStatus === 'finished'

  const getModalContent = () => {
    if (isDraw) {
      return {
        icon: <HandshakeIcon className="w-16 h-16 text-yellow-500" />,
        title: "It's a Draw!",
        message: "Both players played perfectly!",
        color: 'yellow',
      }
    }

    if (winner === humanPlayer) {
      return {
        icon: <Trophy className="w-16 h-16 text-green-500" />,
        title: 'You Won!',
        message: 'Congratulations! You beat the AI!',
        color: 'green',
      }
    }

    return {
      icon: <XCircle className="w-16 h-16 text-red-500" />,
      title: 'AI Wins!',
      message: 'Better luck next time!',
      color: 'red',
    }
  }

  const content = getModalContent()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={resetGame}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="glass dark:glass-dark rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              {content.icon}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-center mb-3"
            >
              {content.title}
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-gray-600 dark:text-gray-400 mb-6"
            >
              {content.message}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-4 mb-6"
            >
              <StatBox label="Wins" value={analytics.wins} />
              <StatBox label="Losses" value={analytics.losses} />
              <StatBox label="Draws" value={analytics.draws} />
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3"
            >
              <button
                onClick={resetGame}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function StatBox({ label, value }) {
  return (
    <div className="glass dark:glass-dark rounded-xl p-3 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  )
}
