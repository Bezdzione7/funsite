# Rugplay - React + Vite Version

This is the fully converted React + Vite version of Rugplay, designed to work with Lovable.dev.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Redis (optional, for real-time features)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/rugplay
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-bucket
OPENROUTER_API_KEY=your-openrouter-key
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Database

```bash
# Push schema changes
npm run db:push

# Run migrations
npm run db:migrate

# Open database studio
npm run db:studio
```

## 🏗️ Project Structure

```
website-react/
├── src/
│   ├── components/       # React components
│   ├── lib/
│   │   ├── server/      # Backend logic
│   │   │   ├── db/      # Database schema
│   │   │   ├── auth.ts  # Authentication
│   │   │   └── api.ts   # API handlers
│   │   └── utils/       # Utility functions
│   ├── routes/          # React Router routes
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── drizzle/             # Database migrations
```

## 📦 Key Features

- ✅ React + Vite for fast development
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Better Auth for authentication
- ✅ Drizzle ORM for database
- ✅ React Router for navigation
- ✅ React Query for data fetching
- ✅ Fully compatible with Lovable.dev

## 🔧 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Router**: React Router v7
- **Auth**: Better Auth
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: React Query
- **Charts**: ApexCharts, Lightweight Charts
- **Icons**: Lucide React

## 🎯 Next Steps

1. Import this project into Lovable.dev
2. Connect your database
3. Configure environment variables
4. Start building features!

---

**Note**: This is a React-based project. All Svelte code has been removed.

