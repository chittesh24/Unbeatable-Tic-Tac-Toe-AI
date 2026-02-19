/**
 * Game Logic Utilities
 * Supporting functions for game state management
 */

/**
 * Create a new empty board
 * @returns {Array} Empty board array
 */
export function createEmptyBoard() {
  return Array(9).fill(null)
}

/**
 * Get opposite player
 * @param {string} player - Current player
 * @returns {string} Opposite player
 */
export function getOpponent(player) {
  return player === 'X' ? 'O' : 'X'
}

/**
 * Format time duration
 * @param {number} ms - Milliseconds
 * @returns {string} Formatted time
 */
export function formatTime(ms) {
  if (ms < 1000) return `${Math.round(ms)}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

/**
 * Calculate win rate
 * @param {number} wins - Number of wins
 * @param {number} totalGames - Total games played
 * @returns {number} Win rate percentage
 */
export function calculateWinRate(wins, totalGames) {
  if (totalGames === 0) return 0
  return Math.round((wins / totalGames) * 100)
}

/**
 * Get cell position name
 * @param {number} index - Cell index
 * @returns {string} Position name
 */
export function getCellPosition(index) {
  const positions = [
    'Top Left', 'Top Center', 'Top Right',
    'Middle Left', 'Center', 'Middle Right',
    'Bottom Left', 'Bottom Center', 'Bottom Right'
  ]
  return positions[index]
}

/**
 * Simulate AI thinking delay
 * @param {number} min - Minimum delay (ms)
 * @param {number} max - Maximum delay (ms)
 * @returns {Promise} Delayed promise
 */
export function simulateThinking(min = 400, max = 900) {
  const delay = Math.random() * (max - min) + min
  return new Promise(resolve => setTimeout(resolve, delay))
}

/**
 * Get move suggestion for player
 * @param {Array} board - Current board state
 * @returns {number|null} Suggested move or null
 */
export function getHint(board) {
  // Simple hint: return first available move
  return board.findIndex(cell => cell === null)
}

/**
 * Check if position is corner
 * @param {number} index - Cell index
 * @returns {boolean}
 */
export function isCorner(index) {
  return [0, 2, 6, 8].includes(index)
}

/**
 * Check if position is center
 * @param {number} index - Cell index
 * @returns {boolean}
 */
export function isCenter(index) {
  return index === 4
}

/**
 * Check if position is edge
 * @param {number} index - Cell index
 * @returns {boolean}
 */
export function isEdge(index) {
  return [1, 3, 5, 7].includes(index)
}

/**
 * Convert board to string for storage
 * @param {Array} board - Board array
 * @returns {string}
 */
export function boardToString(board) {
  return board.map(cell => cell || '-').join('')
}

/**
 * Convert string to board
 * @param {string} str - Board string
 * @returns {Array}
 */
export function stringToBoard(str) {
  return str.split('').map(char => char === '-' ? null : char)
}
