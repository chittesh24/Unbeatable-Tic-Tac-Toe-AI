/**
 * Sound Manager
 * Handles all audio effects for the game
 */

class SoundManager {
  constructor() {
    this.sounds = {}
    this.enabled = true
    this.initialized = false
  }

  /**
   * Initialize sound system
   */
  init() {
    if (this.initialized || typeof window === 'undefined') return

    // Create audio context
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    this.initialized = true
  }

  /**
   * Play a sound effect
   */
  play(type) {
    if (!this.enabled || !this.initialized) return

    try {
      switch (type) {
        case 'move':
          this.playTone(400, 0.1, 'sine')
          break
        case 'win':
          this.playMelody([523, 659, 784, 1047], 0.15)
          break
        case 'loss':
          this.playMelody([392, 330, 294, 262], 0.2)
          break
        case 'draw':
          this.playTone(440, 0.3, 'square')
          break
        case 'click':
          this.playTone(200, 0.05, 'sine')
          break
        default:
          break
      }
    } catch (error) {
      console.error('Sound playback error:', error)
    }
  }

  /**
   * Play a single tone
   */
  playTone(frequency, duration, type = 'sine') {
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.value = frequency
    oscillator.type = type

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    )

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }

  /**
   * Play a melody (sequence of tones)
   */
  playMelody(frequencies, noteDuration) {
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, noteDuration)
      }, index * noteDuration * 1000)
    })
  }

  /**
   * Enable sounds
   */
  enable() {
    this.enabled = true
    if (!this.initialized) {
      this.init()
    }
  }

  /**
   * Disable sounds
   */
  disable() {
    this.enabled = false
  }

  /**
   * Toggle sound
   */
  toggle() {
    this.enabled = !this.enabled
    if (this.enabled && !this.initialized) {
      this.init()
    }
    return this.enabled
  }

  /**
   * Check if sounds are enabled
   */
  isEnabled() {
    return this.enabled
  }
}

// Export singleton instance
export const soundManager = new SoundManager()

// Initialize on first user interaction (required by browsers)
if (typeof window !== 'undefined') {
  const initOnInteraction = () => {
    soundManager.init()
    document.removeEventListener('click', initOnInteraction)
    document.removeEventListener('touchstart', initOnInteraction)
  }
  
  document.addEventListener('click', initOnInteraction)
  document.addEventListener('touchstart', initOnInteraction)
}
