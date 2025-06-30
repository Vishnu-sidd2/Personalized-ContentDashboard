# 📊 Personalized Content Dashboard

> A modern, responsive dashboard for personalized content consumption across multiple platforms

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.0-purple)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-cyan)](https://tailwindcss.com/)

## 📸 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400/1f2937/ffffff?text=Dashboard+Light+Mode" alt="Dashboard Light Mode" width="400"/>
  <img src="https://via.placeholder.com/800x400/111827/ffffff?text=Dashboard+Dark+Mode" alt="Dashboard Dark Mode" width="400"/>
</div>

## ✨ Features

- 🔄 **Real-time Content Feed** - Personalized news, movies, and social media
- 🎯 **Smart Recommendations** - AI-powered content suggestions
- 🔍 **Advanced Search** - Debounced search with filters
- 🌙 **Dark/Light Mode** - Smooth theme switching
- 📱 **Fully Responsive** - Works on all devices
- 🎭 **Drag & Drop** - Reorder content cards
- ⚡ **Infinite Scroll** - Smooth content loading
- 💾 **Offline Support** - Cache management with Redux Persist
- 🌐 **Multilingual** - Support for multiple languages

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/personalized-dashboard.git

# Navigate to project directory
cd personalized-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Built With

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 14.x | React framework |
| [React](https://reactjs.org/) | 18.x | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [Redux Toolkit](https://redux-toolkit.js.org/) | 2.x | State management |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Styling |
| [Framer Motion](https://www.framer.com/motion/) | 10.x | Animations |
| [React Hook Form](https://react-hook-form.com/) | 7.x | Form handling |

## 📁 Project Structure

```
src/
├── 📁 components/
│   ├── 📁 ui/           # Reusable UI components
│   ├── 📁 layout/       # Layout components
│   └── 📁 dashboard/    # Dashboard-specific components
├── 📁 hooks/            # Custom React hooks
├── 📁 store/
│   ├── 📁 slices/       # Redux slices
│   └── 📁 api/          # RTK Query APIs
├── 📁 types/            # TypeScript type definitions
├── 📁 utils/            # Utility functions
└── 📁 styles/           # Global styles
```

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Keys
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

# Optional: Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
```

### 🔑 Getting API Keys

- **News API**: Sign up at [newsapi.org](https://newsapi.org/)
- **TMDB API**: Get your key at [themoviedb.org](https://www.themoviedb.org/settings/api)

## 🎮 Usage

### 1. First Time Setup
- Configure your content preferences in Settings
- Select favorite categories (Tech, Sports, Finance, etc.)
- Choose your preferred theme

### 2. Dashboard Navigation
- **Feed**: Your personalized content stream
- **Trending**: Popular content across categories
- **Favorites**: Bookmarked content
- **Search**: Find specific content

### 3. Interactions
- ❤️ **Favorite**: Click heart icon to save content
- 🔄 **Reorder**: Drag and drop cards to reorganize
- 🔍 **Search**: Use the search bar for quick access
- 🌙 **Theme**: Toggle dark/light mode

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run specific test file
npm test -- components/Dashboard.test.tsx
```

### Test Coverage
- ✅ Unit tests for all components
- ✅ Integration tests for user flows
- ✅ E2E tests for critical paths
- 🎯 Target: 90%+ coverage

## 🚀 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/personalized-dashboard)

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Docker
```bash
# Build image
docker build -t dashboard .

# Run container
docker run -p 3000:3000 dashboard
```

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+
- 🚀 **First Contentful Paint**: <1.5s
- 📱 **Mobile Friendly**: 100% responsive
- 🔧 **Core Web Vitals**: All green

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
| `npm run test:e2e` | Run E2E tests |

## 🐛 Known Issues

- [ ] Safari drag-and-drop on iOS
- [ ] Rate limiting on free API tiers
- [ ] SSR hydration warnings (non-critical)

## 🔮 Roadmap

- [ ] 📱 PWA support
- [ ] 🤖 AI-powered content curation
- [ ] 📊 Analytics dashboard
- [ ] 🔊 Voice search
- [ ] 🌍 More language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [News API](https://newsapi.org/) for news data
- [TMDB](https://www.themoviedb.org/) for movie data
- [Unsplash](https://unsplash.com/) for images
- React community for inspiration

---
