'use client'

import { motion } from 'framer-motion'
import { Brain, Zap } from 'lucide-react'

export default function AIThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-4 flex items-center justify-center gap-3 p-4 glass dark:glass-dark rounded-xl"
    >
      {/* Animated Brain Icon */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Brain className="w-6 h-6 text-purple-500" />
      </motion.div>

      {/* Text */}
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          AI Thinking
        </span>
        
        {/* Animated dots */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-purple-500 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Lightning Icon */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        <Zap className="w-5 h-5 text-yellow-500" />
      </motion.div>
    </motion.div>
  )
}
