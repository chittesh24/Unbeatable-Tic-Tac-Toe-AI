'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import Cell from './Cell'

const GameBoard = memo(() => {
  const { board, winPattern, gameStatus } = useGameStore()

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-3 gap-3 p-4 bg-white/5 dark:bg-black/20 rounded-2xl backdrop-blur-sm"
      >
        {board.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            index={index}
            isWinning={winPattern?.includes(index)}
            disabled={gameStatus !== 'playing'}
          />
        ))}
      </motion.div>
    </div>
  )
})

GameBoard.displayName = 'GameBoard'

export default GameBoard
