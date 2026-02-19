import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { findBestMove, getGameStatus, isValidMove, clearCache } from '@/ai/minimax'
import { createEmptyBoard, getOpponent, simulateThinking, boardToString } from '@/utils/gameLogic'

/**
 * Game Store - Zustand state management
 * Manages game state, AI logic, and analytics
 */

const initialState = {
  // Game state
  board: createEmptyBoard(),
  currentPlayer: 'X',
  humanPlayer: 'X',
  aiPlayer: 'O',
  gameStatus: 'idle', // idle, playing, finished
  winner: null,
  winPattern: null,
  isDraw: false,
  isAIThinking: false,
  
  // Move history
  moveHistory: [],
  lastMove: null,
  
  // Analytics
  analytics: {
    totalGames: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    winRate: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageMoveTime: 0,
    totalMoveTime: 0,
    totalMoves: 0,
    playerMoveHeatmap: Array(9).fill(0),
    aiMoveHeatmap: Array(9).fill(0),
    gamesHistory: [],
  },
  
  // Settings
  settings: {
    difficulty: 'impossible', // impossible (full minimax)
    soundEnabled: true,
    showHints: false,
    aiThinkingDelay: true,
  },
  
  // Learning data
  learningData: {
    openingMoves: {}, // Track successful opening moves
    losingStates: [], // Track board states that led to losses (should be empty)
    movePatterns: {},
  },
  
  // AI metadata
  aiMetadata: {
    lastMoveScore: 0,
    evaluatedMoves: [],
    searchDepth: 0,
    searchTime: 0,
    nodesEvaluated: 0,
  },
}

export const useGameStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * Start a new game
       */
      startNewGame: (playerSymbol = 'X') => {
        clearCache()
        const humanPlayer = playerSymbol
        const aiPlayer = getOpponent(playerSymbol)
        const startingPlayer = 'X' // X always starts
        
        set({
          board: createEmptyBoard(),
          currentPlayer: startingPlayer,
          humanPlayer,
          aiPlayer,
          gameStatus: 'playing',
          winner: null,
          winPattern: null,
          isDraw: false,
          moveHistory: [],
          lastMove: null,
          isAIThinking: false,
          aiMetadata: initialState.aiMetadata,
        })
        
        // If AI starts first, make AI move (use requestAnimationFrame for proper timing)
        if (startingPlayer === aiPlayer) {
          requestAnimationFrame(() => {
            setTimeout(() => {
              const currentState = get()
              if (currentState.gameStatus === 'playing' && currentState.board.every(cell => cell === null)) {
                currentState.makeAIMove()
              }
            }, 300)
          })
        }
      },

      /**
       * Make a player move
       */
      makeMove: async (position) => {
        const state = get()
        const { board, currentPlayer, humanPlayer, gameStatus, settings } = state
        
        if (gameStatus !== 'playing') return false
        if (currentPlayer !== humanPlayer) return false
        if (!isValidMove(board, position)) return false
        
        const startTime = performance.now()
        
        // Make the move
        const newBoard = [...board]
        newBoard[position] = currentPlayer
        
        // Update heatmap
        const newHeatmap = [...state.analytics.playerMoveHeatmap]
        newHeatmap[position]++
        
        // Add to move history
        const moveTime = performance.now() - startTime
        const newMoveHistory = [
          ...state.moveHistory,
          {
            position,
            player: currentPlayer,
            timestamp: Date.now(),
            moveTime,
          },
        ]
        
        set({
          board: newBoard,
          moveHistory: newMoveHistory,
          lastMove: position,
          analytics: {
            ...state.analytics,
            playerMoveHeatmap: newHeatmap,
            totalMoves: state.analytics.totalMoves + 1,
            totalMoveTime: state.analytics.totalMoveTime + moveTime,
            averageMoveTime: (state.analytics.totalMoveTime + moveTime) / (state.analytics.totalMoves + 1),
          },
        })
        
        // Play sound
        if (settings.soundEnabled) {
          get().playSound('move')
        }
        
        // Check game status
        const status = getGameStatus(newBoard)
        if (status.isOver) {
          get().endGame(status)
          return true
        }
        
        // Switch to AI
        set({ currentPlayer: getOpponent(currentPlayer) })
        
        // Make AI move
        setTimeout(() => get().makeAIMove(), settings.aiThinkingDelay ? 100 : 0)
        
        return true
      },

      /**
       * Make AI move
       */
      makeAIMove: async () => {
        const state = get()
        const { board, aiPlayer, settings, learningData } = state
        
        set({ isAIThinking: true })
        
        // Simulate thinking delay for better UX
        if (settings.aiThinkingDelay) {
          await simulateThinking(400, 900)
        }
        
        // Calculate best move
        const result = findBestMove(board, aiPlayer, learningData)
        
        if (result.move === -1) {
          set({ isAIThinking: false })
          return
        }
        
        // Make the move
        const newBoard = [...board]
        newBoard[result.move] = aiPlayer
        
        // Update AI heatmap
        const newAIHeatmap = [...state.analytics.aiMoveHeatmap]
        newAIHeatmap[result.move]++
        
        // Update move history
        const newMoveHistory = [
          ...state.moveHistory,
          {
            position: result.move,
            player: aiPlayer,
            timestamp: Date.now(),
            moveTime: result.time,
          },
        ]
        
        set({
          board: newBoard,
          moveHistory: newMoveHistory,
          lastMove: result.move,
          isAIThinking: false,
          currentPlayer: getOpponent(aiPlayer),
          aiMetadata: {
            lastMoveScore: result.score,
            evaluatedMoves: result.evaluatedMoves,
            searchDepth: result.depth,
            searchTime: result.time,
            nodesEvaluated: result.nodesEvaluated,
          },
          analytics: {
            ...state.analytics,
            aiMoveHeatmap: newAIHeatmap,
          },
        })
        
        // Play sound
        if (settings.soundEnabled) {
          get().playSound('move')
        }
        
        // Check game status
        const status = getGameStatus(newBoard)
        if (status.isOver) {
          get().endGame(status)
        }
      },

      /**
       * End game and update analytics
       */
      endGame: (status) => {
        const state = get()
        const { humanPlayer, moveHistory, settings, analytics, board } = state
        
        let result = 'draw'
        if (status.winner === humanPlayer) {
          result = 'win'
        } else if (status.winner) {
          result = 'loss'
        }
        
        const newStreak = result === 'win' ? analytics.currentStreak + 1 : 0
        
        // Update analytics
        const newAnalytics = {
          ...analytics,
          totalGames: analytics.totalGames + 1,
          wins: analytics.wins + (result === 'win' ? 1 : 0),
          losses: analytics.losses + (result === 'loss' ? 1 : 0),
          draws: analytics.draws + (result === 'draw' ? 1 : 0),
          currentStreak: newStreak,
          longestStreak: Math.max(analytics.longestStreak, newStreak),
          gamesHistory: [
            ...analytics.gamesHistory.slice(-99), // Keep last 100 games
            {
              result,
              moves: moveHistory.length,
              timestamp: Date.now(),
              boardState: boardToString(board),
            },
          ],
        }
        
        newAnalytics.winRate = Math.round((newAnalytics.wins / newAnalytics.totalGames) * 100)
        
        set({
          gameStatus: 'finished',
          winner: status.winner,
          winPattern: status.winPattern,
          isDraw: status.isDraw,
          analytics: newAnalytics,
        })
        
        // Play end game sound
        if (settings.soundEnabled) {
          get().playSound(result)
        }
        
        // Save to learning data
        get().updateLearningData(result)
        
        // Save to database
        get().saveGameToDatabase(result, moveHistory, board)
      },

      /**
       * Update learning data based on game result
       */
      updateLearningData: (result) => {
        const state = get()
        const { moveHistory, learningData, board } = state
        
        if (moveHistory.length === 0) return
        
        const newLearningData = { ...learningData }
        
        // Track opening moves
        const firstAIMove = moveHistory.find(m => m.player === state.aiPlayer)
        if (firstAIMove) {
          const pos = firstAIMove.position
          newLearningData.openingMoves[pos] = (newLearningData.openingMoves[pos] || 0) + 1
        }
        
        // Track losing states (should be rare/impossible with perfect AI)
        if (result === 'loss') {
          newLearningData.losingStates.push({
            board: boardToString(board),
            timestamp: Date.now(),
          })
        }
        
        set({ learningData: newLearningData })
      },

      /**
       * Reset game
       */
      resetGame: () => {
        get().startNewGame(get().humanPlayer)
      },

      /**
       * Update settings
       */
      updateSettings: (newSettings) => {
        set({ settings: { ...get().settings, ...newSettings } })
      },

      /**
       * Play sound effect
       */
      playSound: (type) => {
        // Sound implementation placeholder
        // In production, use Web Audio API or audio elements
        console.log(`🔊 Sound: ${type}`)
      },

      /**
       * Reset all analytics
       */
      resetAnalytics: () => {
        set({
          analytics: initialState.analytics,
          learningData: initialState.learningData,
        })
      },

      /**
       * Get game statistics
       */
      getStatistics: () => {
        const { analytics } = get()
        return {
          totalGames: analytics.totalGames,
          wins: analytics.wins,
          losses: analytics.losses,
          draws: analytics.draws,
          winRate: analytics.winRate,
          currentStreak: analytics.currentStreak,
          longestStreak: analytics.longestStreak,
          averageMoveTime: Math.round(analytics.averageMoveTime),
        }
      },

      /**
       * Save game to database
       */
      saveGameToDatabase: async (result, moveHistory, board) => {
        try {
          // Get or create user ID from localStorage
          let userId = localStorage.getItem('tictactoe-user-id')
          if (!userId) {
            userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            localStorage.setItem('tictactoe-user-id', userId)
          }

          const response = await fetch('/api/game/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              result,
              totalMoves: moveHistory.length,
              duration: moveHistory.length > 0 
                ? moveHistory[moveHistory.length - 1].timestamp - moveHistory[0].timestamp 
                : 0,
              aiDepth: get().aiMetadata.searchDepth,
              boardStates: moveHistory.map(m => ({
                position: m.position,
                player: m.player,
                timestamp: m.timestamp,
              })),
            }),
          })

          if (!response.ok) {
            console.error('Failed to save game to database')
          }
        } catch (error) {
          console.error('Error saving game:', error)
        }
      },
    }),
    {
      name: 'tictactoe-game-storage',
      partialize: (state) => ({
        analytics: state.analytics,
        learningData: state.learningData,
        settings: state.settings,
      }),
    }
  )
)
