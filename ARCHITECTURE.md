# HyperMail Technical Architecture

## System Overview

HyperMail is built as a distributed microservices architecture with real-time synchronization, AI-powered intelligence, and enterprise-grade security.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Web App (Next.js)  │  Desktop (Electron)  │  Mobile (RN)      │
│  - React UI         │  - Native APIs       │  - Native UI      │
│  - WebSocket Client │  - Notifications     │  - Gestures       │
│  - Offline Support  │  - Deep Integration  │  - Location       │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY (NGINX)                        │
│  - Load Balancing  - Rate Limiting  - SSL Termination          │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Auth API    │  │  Email API   │  │  AI API      │         │
│  │  - OAuth     │  │  - CRUD      │  │  - Drafting  │         │
│  │  - JWT       │  │  - Search    │  │  - Summary   │         │
│  │  - Sessions  │  │  - Filters   │  │  - Triage    │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                 │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐         │
│  │  User API    │  │  Team API    │  │  Analytics   │         │
│  │  - Profile   │  │  - Collab    │  │  - Metrics   │         │
│  │  - Settings  │  │  - Shared    │  │  - Insights  │         │
│  │  - Billing   │  │  - Assign    │  │  - Reports   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKGROUND SERVICES                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Email Sync   │  │ AI Processor │  │ Notification │         │
│  │ Engine       │  │ Worker       │  │ Service      │         │
│  │ - IMAP Poll  │  │ - Queue      │  │ - Push       │         │
│  │ - Parse      │  │ - ML Tasks   │  │ - Email      │         │
│  │ - Dedupe     │  │ - Embeddings │  │ - Webhook    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Search       │  │ Scheduler    │  │ Analytics    │         │
│  │ Indexer      │  │ Service      │  │ Processor    │         │
│  │ - Index      │  │ - Snooze     │  │ - Events     │         │
│  │ - Embeddings │  │ - Send Later │  │ - Aggregates │         │
│  │ - Sync       │  │ - Reminders  │  │ - Insights   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ PostgreSQL   │  │    Redis     │  │ Meilisearch  │         │
│  │ - Users      │  │ - Cache      │  │ - Emails     │         │
│  │ - Emails     │  │ - Sessions   │  │ - Contacts   │         │
│  │ - Teams      │  │ - Queue      │  │ - Threads    │         │
│  │ - Settings   │  │ - Realtime   │  │ - FTS        │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Qdrant     │  │    MinIO     │  │  Prometheus  │         │
│  │ - Embeddings │  │ - Attachments│  │ - Metrics    │         │
│  │ - Vectors    │  │ - Avatars    │  │ - Logs       │         │
│  │ - Semantic   │  │ - Assets     │  │ - Traces     │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                          │
├─────────────────────────────────────────────────────────────────┤
│  OpenAI API  │  Google OAuth  │  Microsoft Graph  │  Stripe    │
└─────────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Email Sync Engine

**Responsibilities:**
- Connect to email providers (IMAP/SMTP, Google, Microsoft)
- Real-time synchronization with incremental updates
- Thread detection and conversation grouping
- Attachment handling and storage
- Deduplication and conflict resolution

**Technology:**
- Node.js worker processes
- BullMQ for job queue
- PostgreSQL for email storage
- Redis for sync state

**Flow:**
```
1. OAuth connection established
2. Initial sync: Fetch all emails (paginated)
3. Parse and store emails + threads
4. Extract metadata (from, to, subject, date)
5. Index in Meilisearch for full-text search
6. Generate embeddings for semantic search
7. Push updates via WebSocket to client
8. Incremental sync: Poll for new emails (configurable interval)
```

### 2. AI Intelligence Engine

**Responsibilities:**
- Email summarization
- Draft generation
- Tone analysis
- Priority scoring
- Contact intelligence
- Predictive responses

**Technology:**
- OpenAI GPT-4 Turbo API
- Qdrant vector database
- Custom ML models (Python microservice)
- BullMQ for async processing

**AI Features:**

#### Email Summarization
```
Input: Email thread with N messages
Process:
  1. Extract conversation history
  2. Identify key points and action items
  3. Generate concise summary (3-5 sentences)
Output: Summary + action items + urgency score
```

#### Draft Generation
```
Input: Context (thread, user writing style, recipient)
Process:
  1. Analyze thread context
  2. Load user's writing style (learned from history)
  3. Generate contextual response
  4. Match tone (formal/casual/direct)
Output: Draft email with multiple variations
```

#### Priority Scoring
```
Input: Email metadata + content + sender history
Process:
  1. Sender importance (VIP, frequency, response rate)
  2. Keyword analysis (urgent, important, FYI)
  3. User behavior (opens, replies, archives)
  4. Time sensitivity
Output: Priority score (0-100) + category (Urgent/Important/Normal/FYI)
```

### 3. Real-time Communication

**Technology:**
- Socket.io (WebSocket + fallback)
- Redis Pub/Sub for multi-server sync

**Events:**
```typescript
// Client → Server
socket.emit('email:read', { emailId })
socket.emit('email:archive', { emailId })
socket.emit('email:send', { draft })

// Server → Client
socket.on('email:new', (email) => { /* update UI */ })
socket.on('email:updated', (email) => { /* sync state */ })
socket.on('team:activity', (activity) => { /* show presence */ })
```

### 4. Search Architecture

**Multi-level Search:**

1. **Full-Text Search (Meilisearch)**
   - Instant search as-you-type
   - Typo tolerance
   - Filtering (from, to, date, has:attachment)
   - Ranking by relevance

2. **Semantic Search (Qdrant)**
   - Natural language queries
   - "Find emails about Q4 budget"
   - Similar email finding
   - Contact intelligence

3. **SQL Search (PostgreSQL)**
   - Complex queries with joins
   - Analytical queries
   - Reporting and insights

### 5. Authentication & Authorization

**OAuth 2.0 Flow:**
```
1. User clicks "Continue with Google"
2. Redirect to Google OAuth consent
3. User grants permissions (email, profile)
4. Google redirects back with authorization code
5. Exchange code for access + refresh tokens
6. Store encrypted tokens in database
7. Generate JWT session token for client
8. Client uses JWT for API requests
```

**JWT Structure:**
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "user|admin|enterprise",
  "accounts": ["account_id_1", "account_id_2"],
  "exp": 1234567890
}
```

**Security:**
- Tokens encrypted at rest
- JWT rotation every 15 minutes
- Refresh tokens valid for 30 days
- Rate limiting per user/IP
- CSRF protection
- XSS prevention (Content Security Policy)

### 6. Database Schema

**Core Tables:**

```sql
-- Users
users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  role VARCHAR(50),
  settings JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Email Accounts
email_accounts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  provider VARCHAR(50), -- google, microsoft, imap
  email VARCHAR(255),
  access_token TEXT ENCRYPTED,
  refresh_token TEXT ENCRYPTED,
  sync_enabled BOOLEAN,
  last_sync_at TIMESTAMP,
  created_at TIMESTAMP
)

-- Emails
emails (
  id UUID PRIMARY KEY,
  account_id UUID REFERENCES email_accounts(id),
  message_id VARCHAR(255) UNIQUE,
  thread_id UUID REFERENCES threads(id),
  from_email VARCHAR(255),
  from_name VARCHAR(255),
  to_emails TEXT[],
  cc_emails TEXT[],
  subject TEXT,
  body_text TEXT,
  body_html TEXT,
  priority_score INTEGER,
  category VARCHAR(50), -- urgent, important, normal, fyi
  is_read BOOLEAN,
  is_starred BOOLEAN,
  is_archived BOOLEAN,
  received_at TIMESTAMP,
  created_at TIMESTAMP
)

-- Threads
threads (
  id UUID PRIMARY KEY,
  account_id UUID REFERENCES email_accounts(id),
  subject TEXT,
  participants TEXT[],
  message_count INTEGER,
  last_message_at TIMESTAMP,
  created_at TIMESTAMP
)

-- AI Insights
ai_insights (
  id UUID PRIMARY KEY,
  email_id UUID REFERENCES emails(id),
  summary TEXT,
  action_items TEXT[],
  sentiment VARCHAR(50),
  urgency_score INTEGER,
  generated_at TIMESTAMP
)

-- Team Collaboration
team_assignments (
  id UUID PRIMARY KEY,
  email_id UUID REFERENCES emails(id),
  assigned_by UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  note TEXT,
  status VARCHAR(50), -- assigned, in_progress, completed
  created_at TIMESTAMP
)
```

## Performance Optimizations

### Frontend
- **Code Splitting**: Dynamic imports for routes
- **Virtual Scrolling**: Render only visible emails
- **Optimistic Updates**: Update UI before API response
- **Service Worker**: Cache static assets
- **Image Optimization**: WebP with lazy loading
- **Bundle Size**: Target <200KB initial JS

### Backend
- **Connection Pooling**: Reuse database connections
- **Query Optimization**: Indexed columns, EXPLAIN ANALYZE
- **Caching Strategy**:
  - Email list: Redis cache (5 min TTL)
  - User settings: Redis cache (1 hour TTL)
  - Search results: Meilisearch cache
- **Rate Limiting**: 100 req/min per user
- **Compression**: Gzip/Brotli for API responses

### Database
- **Indexes**:
  - emails(account_id, received_at DESC)
  - emails(thread_id, received_at)
  - emails(is_archived, is_read)
  - threads(account_id, last_message_at DESC)
- **Partitioning**: Partition emails table by month
- **Archiving**: Move emails >1 year to cold storage

## Scalability

### Horizontal Scaling
- **API Servers**: Stateless, scale with load balancer
- **Worker Processes**: Scale background jobs independently
- **Database**: Read replicas for queries
- **Cache**: Redis cluster with sharding

### Vertical Scaling
- **Database**: Increase resources for primary
- **Search**: Scale Meilisearch with more memory

### Data Growth Strategy
- **Hot Data**: Last 3 months in primary DB
- **Warm Data**: 3-12 months in compressed format
- **Cold Data**: >1 year in S3/archive storage

## Security Architecture

### Data Protection
- **Encryption at Rest**: AES-256 for sensitive data
- **Encryption in Transit**: TLS 1.3
- **Token Encryption**: Separate encryption keys
- **PII Handling**: GDPR-compliant data handling

### Access Control
- **RBAC**: Role-based permissions (user, admin, enterprise)
- **API Keys**: Separate keys for integrations
- **Audit Logs**: Track all sensitive operations
- **Session Management**: Secure session handling

### Threat Mitigation
- **SQL Injection**: Parameterized queries
- **XSS**: Content Security Policy, input sanitization
- **CSRF**: Token validation
- **DDoS**: Rate limiting, Cloudflare protection
- **Brute Force**: Account lockout after failed attempts

## Monitoring & Observability

### Metrics (Prometheus)
- API response times (p50, p95, p99)
- Error rates by endpoint
- Database query performance
- Queue processing times
- Active WebSocket connections

### Logging (Winston + ELK)
- Structured JSON logs
- Error tracking with stack traces
- User activity logs
- Security events

### Tracing (Jaeger)
- Distributed tracing across services
- Identify bottlenecks
- Request flow visualization

### Alerting
- API error rate >1%
- Database connection pool exhausted
- Queue backlog >1000 jobs
- Disk usage >80%

## Disaster Recovery

### Backup Strategy
- **Database**: Daily full backup + WAL archiving
- **Retention**: 30 days of backups
- **Testing**: Monthly restore tests
- **RTO**: 1 hour
- **RPO**: 5 minutes

### High Availability
- **Database**: Primary + replica with auto-failover
- **Redis**: Sentinel for automatic failover
- **API**: Multiple instances behind load balancer
- **Multi-region**: (Phase 3) Deploy in multiple regions

---

This architecture is designed to scale from MVP to enterprise-grade platform handling millions of emails daily.
