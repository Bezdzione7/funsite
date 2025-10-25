# 🎮 RobuxMarket - Premium Robux Trading Platform

Transformuotas iš Rugplay kriptovaliutų simuliatoriaus į modernų Robux prekybos platformą su patraukliu dizainu ir saugiais mokėjimais.

![RobuxMarket Preview](github_assets/preview.png)

## 🚀 Transformacijos Apžvalga

### ✅ Atlikti Pakeitimai

1. **Pašalinta Gambling Funkcionalumas**
   - Ištrinti visi gambling komponentai (`/gambling` route)
   - Pašalinti gambling API endpointai
   - Ištrinti gambling žaidimų komponentai (Coinflip, Slots, Mines, Dice)

2. **Valiutos Sistema Pakeista į Robux**
   - Pakeistas iš fake crypto į Robux valiutą (R$)
   - Atnaujinti visi UI elementai su Robux simboliais
   - Sukurtas pilnaverčė Robux mokėjimo sistema

3. **Vizualus Dizainas Drastikai Pagerintas**
   - **Naujas Hero Section**: Patrauklus gradientinis header su animacijomis
   - **Modernūs Card Komponentai**: Hover efektais ir smooth transitions
   - **Gradient Spalvos**: Mėlynos-purpurinės Robux tematikos spalvos
   - **Animacijos**: Floating, pulse glow, shimmer efektai
   - **Glass Morphism**: Peršviečiami elementai su blur efektu

4. **Nauja Robux Mokėjimo Sistema**
   - Sukurtas `RobuxPaymentModal` komponentas
   - Palaiko įvairius mokėjimo būdus (Card, PayPal, Apple Pay, Google Pay)
   - Saugus 3-step mokėjimo procesas
   - Integruotas į sidebar portfolio sekciją

5. **Duomenų Bazės Schema Atnaujinta**
   - Sukurtas `0003_robux_transformation.sql` migracijos failas
   - Pakeisti lentelių pavadinimai (coin → item, user_portfolio → user_inventory)
   - Pridėtos naujos Robux mokėjimo lentelės
   - Atnaujinti transaction types Robux sistemai

## 🎨 Nauji Dizaino Elementai

### CSS Animacijos ir Efektai
- **Gradient Backgrounds**: Mėlynos-purpurinės spalvų kombinacijos
- **Glass Morphism**: Peršviečiami elementai su blur efektu
- **Card Hover Effects**: Smooth transformacijos ir šešėliai
- **Button Animations**: Shimmer efektai ir hover animacijos
- **Floating Elements**: Subtilios animacijos
- **Pulse Glow**: Robux elementų švytėjimas

### Komponentai
- **Hero Section**: Patrauklus gradientinis header
- **Stats Cards**: Realaus laiko statistikos rodymas
- **Feature Cards**: Platformos funkcijų pristatymas
- **RobuxPaymentModal**: Pilnaverčė mokėjimo sistema

## 🔧 Techninis Stack

- **Frontend**: SvelteKit + TypeScript
- **Styling**: TailwindCSS + Custom CSS animacijos
- **Database**: PostgreSQL + Drizzle ORM
- **Real-time**: WebSocket (Bun)
- **Payment**: Robux mokėjimo sistema
- **Deployment**: Docker + Docker Compose

## 📦 Diegimo Instrukcijos

### 1. Prerequisites

- Node.js (LTS version)
- Bun (for websocket server)
- Docker (for Redis and PostgreSQL)

### 2. Clone Repository

```bash
git clone https://github.com/Bezdzione7/funsite.git
cd funsite
```

### 3. Environment Setup

```bash
cd website
cp .env.example .env
```

Atnaujinkite `.env` failą:
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/robuxmarket

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Authentication
PRIVATE_BETTER_AUTH_SECRET=your_secret_here
PUBLIC_BETTER_AUTH_URL=http://localhost:5173

# Robux Payment System
ROBUX_PAYMENT_PROVIDER=stripe
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
ROBUX_EXCHANGE_RATE=1.0
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Database Setup

```bash
# Run migrations
npm run db:migrate

# Or push schema
npm run db:push
```

### 6. Start Development Server

```bash
npm run dev
```

Aplikacija bus prieinama: `http://localhost:5173/`

## 🎯 Funkcionalumas

### Pagrindinės Funkcijos
- ✅ **Robux Prekyba**: Pirkimas/pardavimas su tikrais Robux
- ✅ **Item Marketplace**: Virtualių daiktų prekyba
- ✅ **Real-time Updates**: Live kainų ir prekybos atnaujinimai
- ✅ **User Portfolios**: Vartotojų portfelių valdymas
- ✅ **Payment Integration**: Saugus Robux mokėjimas
- ✅ **Leaderboards**: Lyderių lentelės
- ✅ **Notifications**: Realaus laiko pranešimai

### Pašalintos Funkcijos
- ❌ Gambling žaidimai (Coinflip, Slots, Mines, Dice)
- ❌ Fake crypto valiuta
- ❌ Crypto simuliatoriaus funkcionalumas

### Pridėtos Funkcijos
- ✅ Robux mokėjimo sistema
- ✅ Modernus dizainas
- ✅ Smooth animacijos
- ✅ Glass morphism efektai

## 🚀 Production Deployment

### Using Docker (Recommended)

```bash
./build.sh
```

### Manual Deployment

```bash
# Build the website
cd website
npm run build
npm run preview

# Start websocket server
cd websocket
bun run src/main.ts
```

## 🔒 Saugumas

- **SSL Encryption**: Visi mokėjimai šifruojami
- **Input Validation**: Saugūs vartotojo įvedimai
- **Rate Limiting**: API užklausų apribojimai
- **Authentication**: Google OAuth integracija

## 📱 Responsive Design

- **Mobile First**: Optimizuotas mobiliems įrenginiams
- **Tablet Support**: Pilnas palaikymas planšetėms
- **Desktop Enhanced**: Papildomi funkcijos desktop versijai

## 🚀 Ateities Plėtros Planai

- [ ] Roblox API integracija
- [ ] Advanced trading tools
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Social features (friends, groups)

## 📄 Licencija

Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Kontaktai

- **GitHub**: [@Bezdzione7](https://github.com/Bezdzione7)
- **Repository**: [https://github.com/Bezdzione7/funsite](https://github.com/Bezdzione7/funsite)

---

**Transformacija sėkmingai užbaigta!** 🎉

Platforma dabar yra pilnaverčė Robux prekybos sistema su moderniu dizainu ir saugiais mokėjimais.