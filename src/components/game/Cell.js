'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { X, Circle } from 'lucide-react'

const Cell = memo(({ value, index, isWinning, disabled }) => {
  const { makeMove, lastMove, currentPlayer, humanPlayer } = useGameStore()

  const handleClick = () => {
    if (!disabled && !value && currentPlayer === humanPlayer) {
      makeMove(index)
    }
  }

  const isLastMove = lastMove === index
  const isHovered = !value && !disabled && currentPlayer === humanPlayer

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled || !!value}
      className={`
        relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
        rounded-xl
        transition-all duration-200
        ${isWinning 
          ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/50' 
          : isLastMove
          ? 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/50'
          : 'bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10'
        }
        ${!disabled && !value ? 'cursor-pointer cell-hover' : 'cursor-default'}
        ${disabled ? 'opacity-50' : ''}
        border-2 border-white/20 dark:border-white/10
      `}
      whileHover={isHovered ? { scale: 1.05 } : {}}
      whileTap={isHovered ? { scale: 0.95 } : {}}
      animate={isWinning ? {
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {value && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 260, 
            damping: 20 
          }}
          className="flex items-center justify-center w-full h-full"
        >
          {value === 'X' ? (
            <X 
              className={`w-12 h-12 sm:w-14 sm:h-14 ${
                isWinning 
                  ? 'text-white' 
                  : 'text-red-500 dark:text-red-400'
              }`}
              strokeWidth={3}
            />
          ) : (
            <Circle 
              className={`w-12 h-12 sm:w-14 sm:h-14 ${
                isWinning 
                  ? 'text-white' 
                  : 'text-blue-500 dark:text-blue-400'
              }`}
              strokeWidth={3}
            />
          )}
        </motion.div>
      )}

      {/* Hover effect for empty cells */}
      {!value && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {humanPlayer === 'X' ? (
            <X className="w-12 h-12 text-gray-400" strokeWidth={2} />
          ) : (
            <Circle className="w-12 h-12 text-gray-400" strokeWidth={2} />
          )}
        </motion.div>
      )}
    </motion.button>
  )
})

Cell.displayName = 'Cell'

export default Cell
