'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Award, ArrowLeft, Crown, TrendingUp } from 'lucide-react'
import { getLeaderboard } from '@/lib/supabase'
import Link from 'next/link'

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    try {
      setLoading(true)
      const data = await getLeaderboard(50)
      setLeaderboard(data)
      setError(null)
    } catch (err) {
      setError('Failed to load leaderboard')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass dark:glass-dark rounded-2xl p-6 mb-8 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  Global Leaderboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Top players worldwide
                </p>
              </div>
            </div>
            <button
              onClick={loadLeaderboard}
              className="px-4 py-2 glass dark:glass-dark rounded-lg hover:scale-105 transition-transform"
            >
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Leaderboard Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass dark:glass-dark rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={loadLeaderboard} />
          ) : leaderboard.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {/* Top 3 Podium */}
              {leaderboard.length >= 3 && (
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <PodiumCard player={leaderboard[1]} rank={2} />
                  <PodiumCard player={leaderboard[0]} rank={1} />
                  <PodiumCard player={leaderboard[2]} rank={3} />
                </div>
              )}

              {/* Rest of Leaderboard */}
              <div className="space-y-3">
                {leaderboard.slice(3).map((player, index) => (
                  <LeaderboardRow
                    key={player.id || index}
                    player={player}
                    rank={index + 4}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}

function PodiumCard({ player, rank }) {
  const icons = {
    1: <Crown className="w-8 h-8 text-yellow-500" />,
    2: <Medal className="w-7 h-7 text-gray-400" />,
    3: <Award className="w-6 h-6 text-orange-600" />,
  }

  const heights = {
    1: 'h-48',
    2: 'h-40',
    3: 'h-36',
  }

  const gradients = {
    1: 'from-yellow-500 to-orange-500',
    2: 'from-gray-400 to-gray-500',
    3: 'from-orange-500 to-red-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className={`${rank === 1 ? 'order-2' : rank === 2 ? 'order-1' : 'order-3'}`}
    >
      <div className={`glass dark:glass-dark rounded-2xl p-4 ${heights[rank]} flex flex-col items-center justify-center text-center`}>
        <div className="mb-2">{icons[rank]}</div>
        <div className={`text-2xl font-bold bg-gradient-to-r ${gradients[rank]} bg-clip-text text-transparent mb-1`}>
          #{rank}
        </div>
        <p className="font-bold text-sm truncate w-full">{player.username}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {player.win_rate}% WR
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {player.games_played} games
        </p>
      </div>
    </motion.div>
  )
}

function LeaderboardRow({ player, rank }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.02 }}
      className="glass dark:glass-dark rounded-xl p-4 hover:scale-102 transition-transform"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
            {rank}
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg">{player.username}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Joined {new Date(player.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 text-center">
          <Stat label="Win Rate" value={`${player.win_rate}%`} />
          <Stat label="Games" value={player.games_played} />
          <Stat label="Wins" value={player.wins} />
          <Stat label="Streak" value={player.highest_streak} />
        </div>
      </div>
    </motion.div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-bold text-lg">{value}</p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
      />
      <p className="text-gray-600 dark:text-gray-400">Loading leaderboard...</p>
    </div>
  )
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-red-500 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
      >
        Try Again
      </button>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Trophy className="w-16 h-16 text-gray-400 mb-4" />
      <p className="text-gray-600 dark:text-gray-400 mb-2">No players yet</p>
      <p className="text-sm text-gray-500">Be the first to join the leaderboard!</p>
    </div>
  )
}
