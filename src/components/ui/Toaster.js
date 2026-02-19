'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// Simple toast notification system
let toastId = 0
const toastListeners = new Set()

export function toast(message, type = 'info') {
  const id = ++toastId
  toastListeners.forEach(listener => listener({ id, message, type }))
  
  // Auto dismiss after 3 seconds
  setTimeout(() => {
    toastListeners.forEach(listener => listener({ id, dismiss: true }))
  }, 3000)
}

export function Toaster() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const listener = (toast) => {
      if (toast.dismiss) {
        setToasts(prev => prev.filter(t => t.id !== toast.id))
      } else {
        setToasts(prev => [...prev, toast])
      }
    }

    toastListeners.add(listener)
    return () => toastListeners.delete(listener)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function Toast({ message, type }) {
  const colors = {
    info: 'from-blue-500 to-indigo-500',
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-pink-500',
    warning: 'from-yellow-500 to-orange-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      className={`glass dark:glass-dark rounded-xl p-4 min-w-[300px] shadow-lg border-l-4 bg-gradient-to-r ${colors[type]}`}
    >
      <p className="text-white font-semibold">{message}</p>
    </motion.div>
  )
}
