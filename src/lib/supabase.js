import { createClient } from '@supabase/supabase-js'

// Supabase client for frontend (uses anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Leaderboard features will be disabled.')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured() {
  return supabase !== null
}

/**
 * Get user profile
 */
export async function getUserProfile(userId) {
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  
  return data
}

/**
 * Update user stats
 */
export async function updateUserStats(userId, stats) {
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('users')
    .update(stats)
    .eq('id', userId)
    .select()
  
  if (error) {
    console.error('Error updating user stats:', error)
    return null
  }
  
  return data
}

/**
 * Get leaderboard
 */
export async function getLeaderboard(limit = 10) {
  if (!supabase) return []
  
  const { data, error } = await supabase
    .from('users')
    .select('id, username, games_played, wins, losses, draws, win_rate, highest_streak')
    .order('win_rate', { ascending: false })
    .order('games_played', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching leaderboard:', error)
    return []
  }
  
  return data
}

/**
 * Save game record
 */
export async function saveGameRecord(userId, gameData) {
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('games')
    .insert([{
      user_id: userId,
      result: gameData.result,
      total_moves: gameData.totalMoves,
      duration: gameData.duration,
      ai_depth_used: gameData.aiDepth,
      board_states: gameData.boardStates,
    }])
    .select()
  
  if (error) {
    console.error('Error saving game record:', error)
    return null
  }
  
  return data
}
