# Rugplay - React + Vite (Lovable Compatible)

Pure React frontend for Rugplay cryptocurrency trading simulator. **0% Svelte, 100% React!**

## ✅ Lovable Compatible

This project is fully configured for Lovable.dev:
- ✅ React + Vite framework
- ✅ TypeScript (non-strict mode)
- ✅ Tailwind CSS
- ✅ Database schema included
- ✅ All server logic ready

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Create `.env` File

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `VITE_DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Random secret for authentication
- `BETTER_AUTH_URL` - Your app URL (http://localhost:5173 for dev)

### 3. Run Development Server

```bash
npm run dev
```

App will be available at `http://localhost:5173`

### 4. Database Setup

```bash
# Push schema changes
npm run db:push

# Or run migrations
npm run db:migrate

# Open database studio
npm run db:studio
```

## 📁 Project Structure

```
website-react/
├── src/
│   ├── routes/           # React page components
│   ├── lib/
│   │   ├── server/      # Backend logic (database, auth, API)
│   │   └── utils/       # Utility functions
│   └── App.tsx          # Main app with routing
├── .env                  # Environment variables
└── package.json         # React dependencies only!
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run db:push` - Push database schema changes
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

## 🎯 What's Included

### Frontend (React)
- ✅ React Router DOM for navigation
- ✅ Basic routes (Home, Market, Portfolio, Leaderboard, Settings)
- ✅ Tailwind CSS for styling
- ✅ React Query for data fetching
- ✅ Lucide React for icons

### Backend (Ready to Use)
- ✅ Database schema (Drizzle ORM)
- ✅ Better Auth configuration
- ✅ API helpers
- ✅ S3 upload functions
- ✅ Redis integration
- ✅ AMM trading logic
- ✅ AI helpers (OpenRouter)

## 🚀 Using with Lovable

1. Clone this repository
2. Import the `website-react` folder into Lovable
3. Configure your `.env` file
4. Start building your features with Lovable AI!

## 📦 Dependencies

**Core:**
- React 19
- Vite 7
- TypeScript

**UI:**
- Tailwind CSS
- Lucide React
- React Router DOM

**Backend:**
- Better Auth
- Drizzle ORM
- PostgreSQL
- Redis
- AWS S3

## 🎉 Status

**Current**: Pure React foundation ready for development
**Next**: Build features with Lovable AI!

---

Made for Lovable.dev - No Svelte code remaining!
