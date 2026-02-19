/**
 * Minimax Algorithm with Alpha-Beta Pruning
 * Guarantees optimal play - AI never loses
 * 
 * Key Features:
 * - Alpha-Beta pruning for performance optimization
 * - Depth-based scoring for faster wins
 * - Memoization with board hashing
 * - Perfect play guarantee
 */

const PLAYER_X = 'X'
const PLAYER_O = 'O'
const EMPTY = null

// Memoization cache for board states
const memoCache = new Map()

/**
 * Generate a hash key for the board state
 * @param {Array} board - The game board
 * @param {string} player - Current player
 * @returns {string} Hash key
 */
function getBoardHash(board, player) {
  return `${board.join(',')}_${player}`
}

/**
 * Check if there's a winner
 * @param {Array} board - The game board
 * @returns {string|null} Winner ('X', 'O') or null
 */
export function checkWinner(board) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ]

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], pattern }
    }
  }

  return null
}

/**
 * Check if the board is full (draw)
 * @param {Array} board - The game board
 * @returns {boolean}
 */
export function isBoardFull(board) {
  return board.every(cell => cell !== EMPTY)
}

/**
 * Get all available moves
 * @param {Array} board - The game board
 * @returns {Array} Array of available positions
 */
function getAvailableMoves(board) {
  return board.reduce((moves, cell, index) => {
    if (cell === EMPTY) moves.push(index)
    return moves
  }, [])
}

/**
 * Evaluate the board state
 * @param {Array} board - The game board
 * @param {number} depth - Current depth in the game tree
 * @param {boolean} isMaximizing - Whether maximizing player
 * @returns {number} Score
 */
function evaluate(board, depth, isMaximizing) {
  const result = checkWinner(board)
  
  if (result) {
    // AI wins: positive score, faster wins score higher
    // Human wins: negative score, faster losses score lower
    return result.winner === PLAYER_O ? (10 - depth) : -(10 - depth)
  }
  
  // Draw
  if (isBoardFull(board)) {
    return 0
  }
  
  return null // Game not over
}

/**
 * Minimax algorithm with Alpha-Beta pruning
 * @param {Array} board - The game board
 * @param {number} depth - Current depth
 * @param {boolean} isMaximizing - Maximizing player (AI)
 * @param {number} alpha - Alpha value for pruning
 * @param {number} beta - Beta value for pruning
 * @returns {number} Best score
 */
function minimax(board, depth, isMaximizing, alpha = -Infinity, beta = Infinity) {
  // Check memoization cache
  const hash = getBoardHash(board, isMaximizing ? PLAYER_O : PLAYER_X)
  if (memoCache.has(hash)) {
    return memoCache.get(hash)
  }

  // Terminal state evaluation
  const score = evaluate(board, depth, isMaximizing)
  if (score !== null) {
    memoCache.set(hash, score)
    return score
  }

  const availableMoves = getAvailableMoves(board)
  
  if (isMaximizing) {
    // AI's turn - maximize score
    let maxScore = -Infinity
    
    for (const move of availableMoves) {
      board[move] = PLAYER_O
      const currentScore = minimax(board, depth + 1, false, alpha, beta)
      board[move] = EMPTY
      
      maxScore = Math.max(maxScore, currentScore)
      alpha = Math.max(alpha, currentScore)
      
      // Beta cutoff
      if (beta <= alpha) {
        break
      }
    }
    
    memoCache.set(hash, maxScore)
    return maxScore
  } else {
    // Human's turn - minimize score
    let minScore = Infinity
    
    for (const move of availableMoves) {
      board[move] = PLAYER_X
      const currentScore = minimax(board, depth + 1, true, alpha, beta)
      board[move] = EMPTY
      
      minScore = Math.min(minScore, currentScore)
      beta = Math.min(beta, currentScore)
      
      // Alpha cutoff
      if (beta <= alpha) {
        break
      }
    }
    
    memoCache.set(hash, minScore)
    return minScore
  }
}

/**
 * Find the best move for AI
 * @param {Array} board - The game board
 * @param {string} aiPlayer - AI's symbol ('O' or 'X')
 * @param {Object} learningData - Self-learning data
 * @returns {Object} Best move and metadata
 */
export function findBestMove(board, aiPlayer = PLAYER_O, learningData = null) {
  const startTime = performance.now()
  let bestMove = -1
  let bestScore = -Infinity
  let evaluatedMoves = []
  
  const availableMoves = getAvailableMoves(board)
  
  // First move optimization - prefer center or corners
  if (availableMoves.length === 9) {
    const preferredMoves = [4, 0, 2, 6, 8] // Center, then corners
    
    // Use learning data if available
    if (learningData?.openingMoves) {
      const bestOpening = Object.entries(learningData.openingMoves)
        .sort(([, a], [, b]) => b - a)[0]
      if (bestOpening) {
        bestMove = parseInt(bestOpening[0])
      }
    } else {
      bestMove = preferredMoves.find(move => availableMoves.includes(move))
    }
    
    return {
      move: bestMove,
      score: 0,
      evaluatedMoves: [{ move: bestMove, score: 0 }],
      depth: 0,
      time: performance.now() - startTime,
      nodesEvaluated: 1
    }
  }
  
  // Evaluate all available moves
  for (const move of availableMoves) {
    board[move] = aiPlayer
    const score = minimax(board, 0, false)
    board[move] = EMPTY
    
    evaluatedMoves.push({ move, score })
    
    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }
  
  // Sort moves by score (for visualization)
  evaluatedMoves.sort((a, b) => b.score - a.score)
  
  const endTime = performance.now()
  
  return {
    move: bestMove,
    score: bestScore,
    evaluatedMoves,
    depth: availableMoves.length,
    time: endTime - startTime,
    nodesEvaluated: memoCache.size
  }
}

/**
 * Clear memoization cache
 */
export function clearCache() {
  memoCache.clear()
}

/**
 * Get current cache size
 * @returns {number} Cache size
 */
export function getCacheSize() {
  return memoCache.size
}

/**
 * Validate move
 * @param {Array} board - The game board
 * @param {number} position - Move position
 * @returns {boolean} Is valid move
 */
export function isValidMove(board, position) {
  return position >= 0 && position < 9 && board[position] === EMPTY
}

/**
 * Get game status
 * @param {Array} board - The game board
 * @returns {Object} Game status
 */
export function getGameStatus(board) {
  const winResult = checkWinner(board)
  
  if (winResult) {
    return {
      isOver: true,
      winner: winResult.winner,
      winPattern: winResult.pattern,
      isDraw: false
    }
  }
  
  if (isBoardFull(board)) {
    return {
      isOver: true,
      winner: null,
      winPattern: null,
      isDraw: true
    }
  }
  
  return {
    isOver: false,
    winner: null,
    winPattern: null,
    isDraw: false
  }
}
