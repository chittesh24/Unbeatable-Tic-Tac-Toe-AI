'use client'

import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, Award, Target, Zap, X } from 'lucide-react'

export default function AnalyticsDashboard({ compact = true, onClose }) {
  const { analytics, aiMetadata } = useGameStore()

  // Prepare data for charts
  const winDistribution = [
    { name: 'Wins', value: analytics.wins, color: '#10b981' },
    { name: 'Losses', value: analytics.losses, color: '#ef4444' },
    { name: 'Draws', value: analytics.draws, color: '#f59e0b' },
  ]

  const heatmapData = analytics.playerMoveHeatmap.map((count, index) => ({
    position: index,
    name: getPositionName(index),
    moves: count,
  }))

  const recentGames = analytics.gamesHistory.slice(-10).map((game, index) => ({
    game: index + 1,
    result: game.result === 'win' ? 3 : game.result === 'draw' ? 1 : 0,
  }))

  if (compact) {
    return (
      <div className="glass dark:glass-dark rounded-3xl p-6 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-500" />
          Analytics
        </h2>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <QuickStat
            icon={<Award className="w-5 h-5 text-yellow-500" />}
            label="Win Rate"
            value={`${analytics.winRate}%`}
          />
          <QuickStat
            icon={<Target className="w-5 h-5 text-green-500" />}
            label="Best Streak"
            value={analytics.longestStreak}
          />
          <QuickStat
            icon={<Zap className="w-5 h-5 text-purple-500" />}
            label="Total Games"
            value={analytics.totalGames}
          />
          <QuickStat
            icon={<TrendingUp className="w-5 h-5 text-blue-500" />}
            label="Avg Time"
            value={`${Math.round(analytics.averageMoveTime)}ms`}
          />
        </div>

        {/* Pie Chart */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400">
            Game Results
          </h3>
          {analytics.totalGames > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={winDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {winDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-gray-400">
              No games played yet
            </div>
          )}
        </div>

        {/* AI Stats */}
        {aiMetadata.searchDepth > 0 && (
          <div className="glass dark:glass-dark rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-2">Last AI Move</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Search Time:</span>
                <span className="ml-2 font-semibold">{aiMetadata.searchTime.toFixed(2)}ms</span>
              </div>
              <div>
                <span className="text-gray-500">Nodes:</span>
                <span className="ml-2 font-semibold">{aiMetadata.nodesEvaluated}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Full Dashboard
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass dark:glass-dark rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-blue-500" />
          Full Analytics Dashboard
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Award className="w-6 h-6 text-yellow-500" />}
          label="Total Games"
          value={analytics.totalGames}
        />
        <StatCard
          icon={<Target className="w-6 h-6 text-green-500" />}
          label="Win Rate"
          value={`${analytics.winRate}%`}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-blue-500" />}
          label="Current Streak"
          value={analytics.currentStreak}
        />
        <StatCard
          icon={<Zap className="w-6 h-6 text-purple-500" />}
          label="Best Streak"
          value={analytics.longestStreak}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Win Distribution Pie Chart */}
        <div className="glass dark:glass-dark rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Win Distribution</h3>
          {analytics.totalGames > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={winDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {winDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-gray-400">
              No games played yet
            </div>
          )}
        </div>

        {/* Recent Games Trend */}
        <div className="glass dark:glass-dark rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Games Trend</h3>
          {recentGames.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={recentGames}>
                <XAxis dataKey="game" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  formatter={(value) => {
                    if (value === 3) return 'Win'
                    if (value === 1) return 'Draw'
                    return 'Loss'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="result" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-gray-400">
              No game history yet
            </div>
          )}
        </div>
      </div>

      {/* Move Heatmap */}
      <div className="glass dark:glass-dark rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Player Move Heatmap</h3>
        {analytics.totalMoves > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={heatmapData}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="moves" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            No moves tracked yet
          </div>
        )}
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DetailedStat
          label="Total Moves"
          value={analytics.totalMoves}
          color="blue"
        />
        <DetailedStat
          label="Avg Move Time"
          value={`${Math.round(analytics.averageMoveTime)}ms`}
          color="purple"
        />
        <DetailedStat
          label="Total Time"
          value={`${(analytics.totalMoveTime / 1000).toFixed(1)}s`}
          color="green"
        />
      </div>
    </motion.div>
  )
}

function QuickStat({ icon, label, value }) {
  return (
    <div className="glass dark:glass-dark rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass dark:glass-dark rounded-xl p-6 text-center"
    >
      <div className="flex justify-center mb-3">{icon}</div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  )
}

function DetailedStat({ label, value, color }) {
  const colors = {
    blue: 'from-blue-500 to-indigo-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
  }

  return (
    <div className={`glass dark:glass-dark rounded-xl p-6 bg-gradient-to-br ${colors[color]}`}>
      <p className="text-white/80 text-sm mb-1">{label}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  )
}

function getPositionName(index) {
  const positions = ['TL', 'TC', 'TR', 'ML', 'C', 'MR', 'BL', 'BC', 'BR']
  return positions[index]
}
