'use client'

import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { X, Volume2, VolumeX, Lightbulb, Zap } from 'lucide-react'

export default function GameSettings({ onClose }) {
  const { settings, updateSettings, humanPlayer, startNewGame } = useGameStore()

  const handlePlayerChange = (symbol) => {
    startNewGame(symbol)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass dark:glass-dark rounded-3xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Player Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3">Play as:</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handlePlayerChange('X')}
              className={`p-4 rounded-xl font-semibold transition-all ${
                humanPlayer === 'X'
                  ? 'bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-lg'
                  : 'glass dark:glass-dark hover:scale-105'
              }`}
            >
              X (First)
            </button>
            <button
              onClick={() => handlePlayerChange('O')}
              className={`p-4 rounded-xl font-semibold transition-all ${
                humanPlayer === 'O'
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg'
                  : 'glass dark:glass-dark hover:scale-105'
              }`}
            >
              O (Second)
            </button>
          </div>
        </div>

        {/* Sound Toggle */}
        <div className="mb-6">
          <label className="flex items-center justify-between p-4 glass dark:glass-dark rounded-xl cursor-pointer hover:scale-105 transition-transform">
            <div className="flex items-center gap-3">
              {settings.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-blue-500" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
              )}
              <span className="font-semibold">Sound Effects</span>
            </div>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
              className="w-12 h-6 appearance-none bg-gray-300 dark:bg-gray-600 rounded-full relative cursor-pointer transition-colors checked:bg-blue-500"
            />
          </label>
        </div>

        {/* AI Thinking Delay */}
        <div className="mb-6">
          <label className="flex items-center justify-between p-4 glass dark:glass-dark rounded-xl cursor-pointer hover:scale-105 transition-transform">
            <div className="flex items-center gap-3">
              <Zap className={`w-5 h-5 ${settings.aiThinkingDelay ? 'text-purple-500' : 'text-gray-400'}`} />
              <span className="font-semibold">AI Thinking Animation</span>
            </div>
            <input
              type="checkbox"
              checked={settings.aiThinkingDelay}
              onChange={(e) => updateSettings({ aiThinkingDelay: e.target.checked })}
              className="w-12 h-6 appearance-none bg-gray-300 dark:bg-gray-600 rounded-full relative cursor-pointer transition-colors checked:bg-purple-500"
            />
          </label>
        </div>

        {/* Hints Toggle */}
        <div className="mb-6">
          <label className="flex items-center justify-between p-4 glass dark:glass-dark rounded-xl cursor-pointer hover:scale-105 transition-transform">
            <div className="flex items-center gap-3">
              <Lightbulb className={`w-5 h-5 ${settings.showHints ? 'text-yellow-500' : 'text-gray-400'}`} />
              <span className="font-semibold">Show Hints</span>
            </div>
            <input
              type="checkbox"
              checked={settings.showHints}
              onChange={(e) => updateSettings({ showHints: e.target.checked })}
              className="w-12 h-6 appearance-none bg-gray-300 dark:bg-gray-600 rounded-full relative cursor-pointer transition-colors checked:bg-yellow-500"
            />
          </label>
        </div>

        {/* Info */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <p className="text-sm text-blue-600 dark:text-blue-400">
            💡 <strong>Tip:</strong> The AI uses Minimax with Alpha-Beta pruning. 
            It's mathematically impossible to beat!
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Add CSS for custom toggle switch
const style = `
  input[type="checkbox"]:checked::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    top: 3px;
    right: 3px;
    transition: all 0.3s;
  }
  
  input[type="checkbox"]::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    top: 3px;
    left: 3px;
    transition: all 0.3s;
  }
`

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.innerText = style
  document.head.appendChild(styleSheet)
}
