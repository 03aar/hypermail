# HyperMail

> Email, elevated to intelligence

HyperMail is the ultimate email and productivity platform built for executives, founders, and high-performance teams. Combining lightning-fast performance, AI-powered intelligence, enterprise-grade features, and award-winning design.

## Vision

Build the fastest, smartest, and most delightful email platform in the world, with enterprise-grade capabilities and AI-driven intelligence.

## Core Pillars

1. **Speed & Performance** - Instant load times, zero-lag navigation, 60fps interactions
2. **AI-Driven Intelligence** - Smart triage, predictive responses, strategic communication coaching
3. **Enterprise-Grade** - Multi-user support, compliance, analytics, audit logs
4. **Collaboration & Workflow** - Team intelligence, shared templates, workflow automation
5. **Award-Winning Design** - Details matter. Every pixel, every animation, every interaction perfected.

## Tech Stack

### Frontend
- **Web App**: Next.js 14 (App Router) + React 18 + TypeScript
- **Desktop App**: Electron (coming in Phase 2)
- **Mobile App**: React Native (coming in Phase 3)
- **UI Framework**: Tailwind CSS + Radix UI + Framer Motion
- **State Management**: Zustand + TanStack Query (React Query)
- **Real-time**: Socket.io client

### Backend
- **API**: Node.js + Fastify + TypeScript
- **Database**: PostgreSQL 16 + Drizzle ORM
- **Cache**: Redis 7
- **Search**: Meilisearch
- **Queue**: BullMQ (email processing, AI jobs)
- **Real-time**: Socket.io server
- **Storage**: S3-compatible (MinIO for development)

### AI/ML
- **LLM**: OpenAI GPT-4 Turbo (drafting, summarization, tone analysis)
- **Vector Database**: Qdrant (semantic search, contact intelligence)
- **Embeddings**: OpenAI text-embedding-3-large

### Email Integration
- **IMAP/SMTP**: Custom sync engine with Nodemailer
- **OAuth Providers**: Google Workspace, Microsoft 365, Apple
- **Email Parsing**: Mailparser + custom thread detection

### Infrastructure
- **Monorepo**: Turborepo
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: NGINX
- **Testing**: Vitest + Playwright + React Testing Library
- **CI/CD**: GitHub Actions

## Project Structure

```
hypermail/
├── apps/
│   ├── web/              # Next.js web application
│   ├── api/              # Fastify backend API
│   ├── desktop/          # Electron desktop app (Phase 2)
│   └── mobile/           # React Native app (Phase 3)
├── packages/
│   ├── ui/               # Shared React components
│   ├── config/           # Shared configurations (ESLint, TypeScript, Tailwind)
│   ├── database/         # Database schema and migrations
│   ├── email-engine/     # Email sync and processing logic
│   ├── ai-engine/        # AI/ML processing
│   └── types/            # Shared TypeScript types
├── docker/               # Docker configurations
└── docs/                 # Documentation

```

## MVP Roadmap

### Phase 1: Core Features (Current)
- [x] Project architecture and setup
- [ ] Multi-account inbox with fast navigation
- [ ] AI-assisted drafting and summarization
- [ ] Keyboard-first interface
- [ ] Essential productivity features (snooze, send later, follow-ups)
- [ ] Basic enterprise user management

### Phase 2: Advanced AI & Workflow
- [ ] Predictive Inbox Zero
- [ ] Team collaboration features
- [ ] Contact intelligence and CRM integration
- [ ] Analytics dashboard
- [ ] Desktop application (Electron)

### Phase 3: Enterprise-Grade Expansion
- [ ] Full enterprise compliance and security certification
- [ ] Cross-company collaboration
- [ ] AI Coach for strategic communication
- [ ] Mobile applications
- [ ] Advanced workflow automation

## Design Principles

Inspired by Steve Jobs, Jonathan Ive, and Gordon Ramsay:

1. **Simplicity** - Remove everything unnecessary. What remains must be perfect.
2. **Details Matter** - It's worth waiting to get it right.
3. **Speed** - If it's not instant, it's broken.
4. **Delight** - Every interaction should spark joy.
5. **Excellence** - Good is the enemy of great.

## Getting Started

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Start development environment
pnpm dev

# Start all services (API + Web + Database)
docker-compose up -d
```

### Development

```bash
# Run web app only
pnpm dev:web

# Run API only
pnpm dev:api

# Run all apps
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

## Environment Variables

See `.env.example` for required environment variables.

## License

Proprietary - All rights reserved

---

Built with obsession to detail and commitment to excellence.
