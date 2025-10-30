import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const configSchema = z.object({
  // Server
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  port: z.coerce.number().default(4000),
  host: z.string().default('0.0.0.0'),
  apiUrl: z.string().default('http://localhost:4000'),
  appUrl: z.string().default('http://localhost:3000'),

  // Database
  databaseUrl: z.string(),

  // Redis
  redisUrl: z.string().default('redis://localhost:6379'),

  // JWT
  jwtSecret: z.string().min(32),
  jwtExpiresIn: z.string().default('15m'),
  refreshTokenExpiresIn: z.string().default('30d'),

  // Cookie
  cookieSecret: z.string().min(32),

  // OAuth - Google
  googleClientId: z.string().optional(),
  googleClientSecret: z.string().optional(),
  googleRedirectUri: z.string().optional(),

  // OAuth - Microsoft
  microsoftClientId: z.string().optional(),
  microsoftClientSecret: z.string().optional(),
  microsoftRedirectUri: z.string().optional(),

  // OpenAI
  openaiApiKey: z.string().optional(),
  openaiModel: z.string().default('gpt-4-turbo-preview'),

  // CORS
  corsOrigin: z.string().default('http://localhost:3000'),

  // Rate Limiting
  rateLimitWindow: z.coerce.number().default(60000), // 1 minute
  rateLimitMax: z.coerce.number().default(100),

  // Email Sync
  syncIntervalSeconds: z.coerce.number().default(300),
  maxEmailsPerSync: z.coerce.number().default(100),

  // Feature Flags
  enableAiFeatures: z.coerce.boolean().default(true),
  enableTeamFeatures: z.coerce.boolean().default(false),
  enableAnalytics: z.coerce.boolean().default(true),
})

const env = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  host: process.env.HOST,
  apiUrl: process.env.API_URL,
  appUrl: process.env.APP_URL,
  databaseUrl: process.env.DATABASE_URL,
  redisUrl: process.env.REDIS_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  cookieSecret: process.env.JWT_SECRET, // Using same secret for cookies
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
  microsoftClientId: process.env.MICROSOFT_CLIENT_ID,
  microsoftClientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  microsoftRedirectUri: process.env.MICROSOFT_REDIRECT_URI,
  openaiApiKey: process.env.OPENAI_API_KEY,
  openaiModel: process.env.OPENAI_MODEL,
  corsOrigin: process.env.CORS_ORIGIN || process.env.APP_URL,
  rateLimitWindow: process.env.RATE_LIMIT_WINDOW,
  rateLimitMax: process.env.RATE_LIMIT_MAX_REQUESTS,
  syncIntervalSeconds: process.env.SYNC_INTERVAL_SECONDS,
  maxEmailsPerSync: process.env.MAX_EMAILS_PER_SYNC,
  enableAiFeatures: process.env.ENABLE_AI_FEATURES,
  enableTeamFeatures: process.env.ENABLE_TEAM_FEATURES,
  enableAnalytics: process.env.ENABLE_ANALYTICS,
}

export const config = configSchema.parse(env)

export const isDevelopment = config.nodeEnv === 'development'
export const isProduction = config.nodeEnv === 'production'
export const isTest = config.nodeEnv === 'test'
