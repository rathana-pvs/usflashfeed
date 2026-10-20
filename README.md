# US Flash Feed

**The news moves fast. Stay ahead.** A fast, clear, independent digital newsroom covering politics, business, technology, culture, climate, and world affairs at [usflashfeed.com](https://usflashfeed.com).

Built with **Next.js 15 (App Router)**, **Payload CMS v3**, and **PostgreSQL**, with a responsive editorial design system and a purpose-built newsroom workflow.

---

## 🌟 Key Features

- **Editorial Layout & Design**:
  - Lightning-bolt identity, deep navy and news-red palette, and a compact usflashfeed.com wordmark.
  - Clear masthead, breaking-news ticker, and multi-channel navigation.
  - Compact, ranked **Most Read** sidebar and curated section blocks.
  - Full-width hero coverage, regional beat explorer, and video hub.

- **Article & Reading Experience**:
  - **Monochrome Executive Summary**: High-impact editorial summary box with bulleted key points.
  - **Continue Reading Gate**: Smooth, viewability-optimized article truncation with non-intrusive expansion.
  - **Adskeeper Native Monetization**: Optimized placements for In-Article, Sidebar, Under-Article grid, and Bottom Feed widgets.

- **AI-Powered Editorial Suite**:
  - Integrated **Gemini AI** assistant (`/api/ai/assist`) enforcing strict editorial constraints (4-paragraph summaries, character-capped lead excerpts, SEO meta generation).

- **Enterprise CMS & Architecture**:
  - Headless **Payload CMS v3** admin panel (`/admin`) for articles, authors, categories, media, and trackable share links.
  - PostgreSQL database with automated migrations.
  - Full static generation (SSG) with Incremental Static Regeneration (ISR).
  - Schema.org `NewsArticle` structured data and dynamic OpenGraph social share cards.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **CMS**: [Payload CMS v3](https://payloadcms.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via `@payloadcms/db-postgres`)
- **AI & Processing**: [Google Gemini AI SDK](https://ai.google.dev/) + [Sharp](https://sharp.pixelplumbing.com/)
- **Styling**: Vanilla CSS Variables + Modern CSS Grid / Flexbox
- **Monetization**: Adskeeper Native Ad Network
- **Deployment**: Docker & Docker Compose / Standalone Node.js

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm`
- **Database**: PostgreSQL `v15+` (or Docker)

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
POSTGRES_USER=uspolicybrief
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=uspolicybrief
DATABASE_URI=postgresql://uspolicybrief:your_secure_password@localhost:5432/uspolicybrief

# Payload CMS
PAYLOAD_SECRET=your_secure_32_byte_secret

# Site Config
NEXT_PUBLIC_SITE_URL=https://usflashfeed.com
NEXT_PUBLIC_SITE_NAME="US Flash Feed"
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Gemini AI API
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

# Adskeeper Widgets
NEXT_PUBLIC_ADS_KEEPER_SITE_ID=1116942
NEXT_PUBLIC_ADS_KEEPER_WIDGET_SIDEBAR=2099712
NEXT_PUBLIC_ADS_KEEPER_WIDGET_IN_ARTICLE_1=2099686
NEXT_PUBLIC_ADS_KEEPER_WIDGET_IN_ARTICLE_2=
NEXT_PUBLIC_ADS_KEEPER_WIDGET_UNDER_ARTICLE=
NEXT_PUBLIC_ADS_KEEPER_WIDGET_FEED=2099685
```

Adskeeper's loader is included once in the public site `<head>` in production.
The feed widget (2099685) appears below the home, category, and article feeds;
the in-article widget (2099686) appears after the first paragraph, and the
sidebar widget (2099712) appears beside articles. Development uses labeled
mock ads. Live ads require the domain to be added to your Adskeeper dashboard.
These public settings are included at build time, so rebuild the app after
changing them. Docker Compose passes them to the image build automatically.

### 3. Installation

```bash
# Install dependencies
npm install
```

### 4. Database Setup & Seeding

```bash
# Seed initial demo articles and categories
npm run seed
```

### 5. Running the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied).
The Payload Admin Panel is accessible at `/admin`.

---

## 📦 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server |
| `npm run seed` | Seed database with initial articles and categories |
| `npm run clean` | Clean test or duplicate database entries |
| `npm run lint` | Run ESLint check |

---

## Domain rollout

The application, CMS, SEO URLs, and deployment templates target `https://usflashfeed.com` under the name **US Flash Feed**. The local `.env` and `.env.local` site settings use this identity as well.

For the PM2 installation, use `/var/www/usflashfeed`, the `usflashfeed` process in `ecosystem.config.cjs`, and `nginx/usflashfeed.conf` (port 3004). The older port 3003 Nginx template has been removed. Install only the matching Nginx site configuration.

Before deploying, point the apex and `www` DNS records to the server and provision certificates for both names at `/etc/letsencrypt/live/usflashfeed.com/`. Update the server environment, retain or copy the existing uploaded media, and replace the old PM2/Nginx site when switching traffic. Configure redirects from the old domain on the server that still owns its certificate. Deployment requires explicit confirmation.

Database credentials and Docker database/media volume names intentionally retain their existing identifiers so existing content remains available. Keep the existing Compose project name (or explicitly bind its existing volumes) when moving the checkout; changing the project directory can otherwise create fresh volumes. Do not rename databases or volumes as part of the domain switch.

Article page titles and bylines using US Flash News or The Minute Feed are normalized for display. Historical image domains remain allowed for previously published media. The rebrand does not rewrite live CMS records. Confirm analytics, Adskeeper registration, and the new domain's contact mailboxes before launching.

---

## 🔒 License & Copyright

© 2026 **US Flash Feed**. All rights reserved.
