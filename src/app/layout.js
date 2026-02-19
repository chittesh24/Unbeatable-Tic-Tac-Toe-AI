import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { Toaster } from '@/components/ui/Toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Unbeatable Tic-Tac-Toe AI',
  description: 'Challenge an AI that never loses. Built with Minimax algorithm and Alpha-Beta pruning.',
  keywords: 'tic-tac-toe, AI, minimax, game theory, unbeatable',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
