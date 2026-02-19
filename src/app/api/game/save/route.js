import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client with service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabaseAdmin = null
if (supabaseUrl && supabaseServiceKey) {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
}

/**
 * POST /api/game/save
 * Save game result securely on server
 */
export async function POST(request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const body = await request.json()
    
    // Validate required fields
    const { userId, result, totalMoves, duration, aiDepth, boardStates } = body
    
    if (!userId || !result || totalMoves === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate result value
    if (!['win', 'loss', 'draw'].includes(result)) {
      return NextResponse.json(
        { error: 'Invalid result value' },
        { status: 400 }
      )
    }

    // Save game record
    const { data: gameData, error: gameError } = await supabaseAdmin
      .from('games')
      .insert([{
        user_id: userId,
        result,
        total_moves: totalMoves,
        duration: duration || 0,
        ai_depth_used: aiDepth || 0,
        board_states: boardStates || [],
      }])
      .select()

    if (gameError) {
      console.error('Error saving game:', gameError)
      return NextResponse.json(
        { error: 'Failed to save game' },
        { status: 500 }
      )
    }

    // Update user stats
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (userError && userError.code !== 'PGRST116') {
      console.error('Error fetching user:', userError)
      return NextResponse.json(
        { error: 'Failed to update user stats' },
        { status: 500 }
      )
    }

    // Calculate new stats
    const currentStats = userData || {
      games_played: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      highest_streak: 0,
    }

    const newStats = {
      games_played: currentStats.games_played + 1,
      wins: currentStats.wins + (result === 'win' ? 1 : 0),
      losses: currentStats.losses + (result === 'loss' ? 1 : 0),
      draws: currentStats.draws + (result === 'draw' ? 1 : 0),
    }

    newStats.win_rate = Math.round((newStats.wins / newStats.games_played) * 100)
    newStats.highest_streak = Math.max(
      currentStats.highest_streak,
      result === 'win' ? (currentStats.current_streak || 0) + 1 : 0
    )

    // Update or insert user stats
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .upsert([{
        id: userId,
        ...newStats,
        updated_at: new Date().toISOString(),
      }])

    if (updateError) {
      console.error('Error updating user stats:', updateError)
    }

    return NextResponse.json({
      success: true,
      game: gameData[0],
      stats: newStats,
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Rate limiting middleware (basic implementation)
 */
const requestCounts = new Map()

function rateLimit(identifier, limit = 10, window = 60000) {
  const now = Date.now()
  const requests = requestCounts.get(identifier) || []
  
  // Remove old requests outside the window
  const validRequests = requests.filter(time => now - time < window)
  
  if (validRequests.length >= limit) {
    return false
  }
  
  validRequests.push(now)
  requestCounts.set(identifier, validRequests)
  
  return true
}
