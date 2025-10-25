# 🚀 Vercel Deployment Guide for RobuxMarket

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be on GitHub
3. **Database**: PostgreSQL database (Vercel Postgres, Supabase, or external)
4. **Environment Variables**: Prepare your production environment variables

## Step 1: Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

## Step 2: Prepare Your Project

### Update package.json
Make sure you have the Vercel adapter:
```bash
npm install @sveltejs/adapter-vercel
```

### Update svelte.config.js
```javascript
import adapter from '@sveltejs/adapter-vercel';

const config = {
  kit: {
    adapter: adapter({
      runtime: 'nodejs18.x',
      regions: ['iad1']
    })
  }
};
```

## Step 3: Deploy to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import your GitHub repository**: `Bezdzione7/funsite`
4. **Configure Project**:
   - Framework Preset: `SvelteKit`
   - Root Directory: `website`
   - Build Command: `npm run build`
   - Output Directory: `.svelte-kit`
   - Install Command: `npm install`

### Method 2: Vercel CLI

```bash
cd website
vercel
```

Follow the prompts:
- Set up and deploy? `Y`
- Which scope? `Your account`
- Link to existing project? `N`
- Project name: `robuxmarket`
- Directory: `./website`
- Override settings? `N`

## Step 4: Configure Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

### Required Variables
```
DATABASE_URL=postgresql://username:password@host:5432/robuxmarket
PRIVATE_BETTER_AUTH_SECRET=your_super_secret_auth_key_here
PUBLIC_BETTER_AUTH_URL=https://your-app.vercel.app
```

### Optional Variables
```
REDIS_URL=redis://username:password@host:6379
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
ROBUX_EXCHANGE_RATE=1.0
```

## Step 5: Database Setup

### Option 1: Vercel Postgres (Recommended)
1. Go to Vercel Dashboard → Storage
2. Create new Postgres database
3. Copy connection string to `DATABASE_URL`

### Option 2: External Database
- **Supabase**: Free tier available
- **PlanetScale**: MySQL compatible
- **Railway**: PostgreSQL hosting
- **Neon**: Serverless PostgreSQL

## Step 6: Deploy

1. **Push to GitHub**:
```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

2. **Vercel will automatically deploy** when you push to main branch

3. **Check deployment status** in Vercel Dashboard

## Step 7: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `PUBLIC_BETTER_AUTH_URL` environment variable

## Step 8: WebSocket Server (Separate Deployment)

Since Vercel doesn't support persistent WebSocket connections, you'll need to deploy the WebSocket server separately:

### Option 1: Railway
```bash
cd websocket
railway login
railway init
railway up
```

### Option 2: Render
1. Connect GitHub repository
2. Select `websocket` folder
3. Build command: `bun install && bun run src/main.ts`
4. Runtime: `Bun`

### Option 3: Fly.io
```bash
cd websocket
fly launch
fly deploy
```

## Troubleshooting

### Common Issues

1. **Build Fails**: Check Node.js version in Vercel settings
2. **Environment Variables**: Make sure all required vars are set
3. **Database Connection**: Verify DATABASE_URL format
4. **WebSocket Errors**: Deploy WebSocket server separately

### Build Settings

In Vercel Dashboard → Settings → General:
- **Node.js Version**: `18.x`
- **Build Command**: `npm run build`
- **Output Directory**: `.svelte-kit`
- **Install Command**: `npm install`

### Performance Optimization

1. **Enable Edge Functions**: For API routes
2. **Use CDN**: Static assets are automatically cached
3. **Database Connection Pooling**: Use connection pooling
4. **Image Optimization**: Use Vercel's image optimization

## Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Function Logs**: Check Vercel Dashboard → Functions
3. **Performance**: Monitor Core Web Vitals
4. **Errors**: Set up error tracking (Sentry, LogRocket)

## Cost Considerations

### Vercel Pricing
- **Hobby**: Free tier (100GB bandwidth, 100 serverless functions)
- **Pro**: $20/month (1TB bandwidth, unlimited functions)
- **Enterprise**: Custom pricing

### Database Costs
- **Vercel Postgres**: $20/month for 1GB
- **Supabase**: Free tier available
- **PlanetScale**: Free tier available

## Security

1. **Environment Variables**: Never commit secrets
2. **HTTPS**: Automatically enabled
3. **CORS**: Configure in API routes
4. **Rate Limiting**: Implement in API routes
5. **Authentication**: Use secure session management

## Next Steps

1. **Set up CI/CD**: Automatic deployments on push
2. **Add monitoring**: Error tracking and analytics
3. **Optimize performance**: Image optimization, caching
4. **Add staging environment**: Preview deployments
5. **Set up backups**: Database backups

---

**Your RobuxMarket will be live at**: `https://your-app.vercel.app` 🎉
