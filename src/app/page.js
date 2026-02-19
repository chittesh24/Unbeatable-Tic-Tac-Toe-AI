'use client'
export const dynamic = "force-dynamic"
import { useState } from 'react'
import GameBoard from '@/components/game/GameBoard'
import GameSettings from '@/components/game/GameSettings'
import AIThinkingIndicator from '@/components/game/AIThinkingIndicator'
import GameModal from '@/components/game/GameModal'
import WelcomeScreen from '@/components/game/WelcomeScreen'
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard'
import Header from '@/components/layout/Header'
import { useGameStore } from '@/store/gameStore'
import { motion } from 'framer-motion'
import { Brain, Trophy, Settings } from 'lucide-react'

export default function Home() {
  const [showSettings, setShowSettings] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const { isAIThinking, gameStatus, startNewGame } = useGameStore()
  const totalGames = useGameStore(state => state.analytics.totalGames)
  const winRate = useGameStore(state => state.analytics.winRate)
  const currentStreak = useGameStore(state => state.analytics.currentStreak)

  const handleStartGame = (playerSymbol) => {
    startNewGame(playerSymbol)
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <Header />
      
      <div className="max-w-7xl mx-auto mt-8">
        {/* Show Welcome Screen if game is idle */}
        {gameStatus === 'idle' ? (
          <WelcomeScreen onStart={handleStartGame} />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Game Section */}
              <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass dark:glass-dark rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              {/* Game Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Unbeatable AI
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Powered by Minimax + Alpha-Beta Pruning
                  </p>
                </div>
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-3 rounded-xl glass dark:glass-dark hover:scale-110 transition-transform"
                  aria-label="Settings"
                >
                  <Settings className="w-6 h-6" />
                </button>
              </div>

              {/* AI Thinking Indicator */}
              {isAIThinking && <AIThinkingIndicator />}

              {/* Game Board */}
              <GameBoard />

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <StatCard 
                  icon={<Brain className="w-5 h-5" />}
                  label="Games Played"
                  value={totalGames}
                />
                <StatCard 
                  icon={<Trophy className="w-5 h-5" />}
                  label="Win Rate"
                  value={`${winRate}%`}
                />
                <StatCard 
                  icon={<Settings className="w-5 h-5" />}
                  label="Current Streak"
                  value={currentStreak}
                />
              </div>
            </motion.div>
          </div>

          {/* Analytics Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AnalyticsDashboard compact />
            </motion.div>
          </div>
        </div>

            {/* Full Analytics Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-center"
            >
              <button
                onClick={() => setShowAnalytics(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                View Full Analytics Dashboard
              </button>
            </motion.div>
          </>
        )}
      </div>

      {/* Modals */}
      <GameModal />
      {showSettings && <GameSettings onClose={() => setShowSettings(false)} />}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-6xl">
            <AnalyticsDashboard 
              compact={false} 
              onClose={() => setShowAnalytics(false)} 
            />
          </div>
        </div>
      )}
    </main>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <div className="glass dark:glass-dark rounded-xl p-4 text-center">
      <div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}
