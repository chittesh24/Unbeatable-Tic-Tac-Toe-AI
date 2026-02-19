# 🎮 Unbeatable Tic-Tac-Toe AI

> A production-grade web application featuring an AI that **never loses**, built with advanced game theory algorithms and modern web technologies.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-blue)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[🎮 Live Demo](#) | [📚 Documentation](#features) | [🚀 Deploy Your Own](#deployment)

---

## ✨ Features

### 🤖 Unbeatable AI Engine
- **Minimax Algorithm** with Alpha-Beta Pruning
- **Perfect Play Guarantee** - AI mathematically cannot lose
- **Depth-based Scoring** for optimal move selection
- **Memoization** with board state hashing for performance
- **Self-learning System** that tracks patterns and adapts

### 🎨 Modern UI/UX
- **Glassmorphism Design** with smooth animations
- **Dark/Light Mode** with seamless transitions
- **Fully Responsive** - Mobile-first design
- **Framer Motion** animations for delightful interactions
- **Real-time AI Thinking** visualization

### 📊 Advanced Analytics
- **Comprehensive Statistics** tracking
- **Interactive Charts** (Pie, Bar, Line)
- **Move Heatmaps** showing player patterns
- **Win Rate Calculations** and streak tracking
- **Game History** with detailed insights

### 🏆 Leaderboard System
- **Global Rankings** with real-time updates
- **Secure User Profiles** via Supabase Auth
- **Row-Level Security** (RLS) for data protection
- **Podium Display** for top 3 players

### 🔐 Production-Grade Security
- **Environment Variable Protection**
- **HTTPS Enforcement** (automatic on Vercel)
- **Row-Level Security** on all database tables
- **API Rate Limiting**
- **Input Validation** and sanitization
- **XSS & CSRF Protection**

### 🎵 Enhanced Experience
- **Sound Effects** for moves and game outcomes
- **Haptic Feedback** ready
- **Keyboard Navigation** support
- **Accessibility** compliant

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API**: Next.js API Routes
- **Storage**: Browser LocalStorage + Supabase

### Deployment
- **Hosting**: Vercel (Free Tier)
- **Database**: Supabase (Free Tier)
- **CI/CD**: Automatic deployments via GitHub

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+ installed
Git installed
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/unbeatable-tictactoe.git
cd unbeatable-tictactoe

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Visit `http://localhost:3000` 🎉

---

## 📁 Project Structure

```
unbeatable-tictactoe/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.js            # Main game page
│   │   ├── layout.js          # Root layout
│   │   ├── globals.css        # Global styles
│   │   ├── leaderboard/       # Leaderboard page
│   │   └── api/               # API routes
│   │       └── game/save/     # Save game endpoint
│   ├── components/
│   │   ├── game/              # Game components
│   │   │   ├── GameBoard.js
│   │   │   ├── Cell.js
│   │   │   ├── GameModal.js
│   │   │   ├── GameSettings.js
│   │   │   └── AIThinkingIndicator.js
│   │   ├── analytics/         # Analytics components
│   │   │   └── AnalyticsDashboard.js
│   │   ├── layout/            # Layout components
│   │   │   └── Header.js
│   │   └── ui/                # UI components
│   │       └── Toaster.js
│   ├── ai/                    # AI Engine
│   │   └── minimax.js        # Minimax + Alpha-Beta
│   ├── store/                 # State management
│   │   └── gameStore.js      # Zustand store
│   ├── lib/                   # Libraries
│   │   └── supabase.js       # Supabase client
│   ├── utils/                 # Utilities
│   │   ├── gameLogic.js
│   │   └── soundManager.js
│   └── context/               # React Context
│       └── ThemeContext.js
├── public/                    # Static assets
├── DATABASE_SETUP.md         # Database schema guide
├── DEPLOYMENT_GUIDE.md       # Deployment instructions
├── SECURITY_GUIDE.md         # Security best practices
└── package.json
```

---

## 🎯 How It Works

### AI Algorithm Explanation

The AI uses the **Minimax algorithm** with **Alpha-Beta pruning**:

1. **Minimax**: Explores all possible game states to find the optimal move
2. **Alpha-Beta Pruning**: Eliminates branches that cannot affect the final decision
3. **Depth-based Scoring**: Prefers faster wins and slower losses
4. **Memoization**: Caches evaluated board states for performance

```javascript
// Simplified example
function minimax(board, depth, isMaximizing, alpha, beta) {
  // Terminal state check
  if (gameOver) return evaluate(board, depth)
  
  // Maximize for AI, minimize for opponent
  if (isMaximizing) {
    let maxScore = -Infinity
    for (move of availableMoves) {
      score = minimax(makeMove(board, move), depth + 1, false, alpha, beta)
      maxScore = Math.max(maxScore, score)
      alpha = Math.max(alpha, score)
      if (beta <= alpha) break // Alpha-Beta pruning
    }
    return maxScore
  }
  // ... minimize logic
}
```

**Result**: The AI will never lose. Best case: AI wins. Worst case: Draw.

---

## 🔐 Environment Variables

Create `.env.local`:

```bash
# Supabase (Frontend - Safe)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Supabase (Backend - Secret)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

⚠️ **Never commit `.env.local` to Git!**

---

## 📖 Documentation

- [Database Setup Guide](DATABASE_SETUP.md) - Complete database schema and RLS setup
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Step-by-step deployment to Vercel
- [Security Guide](SECURITY_GUIDE.md) - Security best practices and implementation

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/unbeatable-tictactoe)

1. Click the button above
2. Add environment variables
3. Deploy!

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend platform
- [Vercel](https://vercel.com/) - Deployment platform
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

## 📞 Support

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/unbeatable-tictactoe/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/unbeatable-tictactoe/discussions)

---

## 🎓 Learning Resources

This project demonstrates:
- Game theory and AI algorithms
- Modern React patterns
- Secure backend architecture
- Production deployment
- Performance optimization

Perfect for learning advanced web development concepts!

---

**Made with ❤️ and ☕ | Built with game theory mastery**
