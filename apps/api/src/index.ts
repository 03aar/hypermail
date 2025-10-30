import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import rateLimit from '@fastify/rate-limit'
import cookie from '@fastify/cookie'
import { config } from './lib/config'
import { logger } from './lib/logger'
import healthRoutes from './routes/health'
import authRoutes from './routes/auth'

const server = Fastify({
  logger: logger,
  trustProxy: true,
})

async function start() {
  try {
    // Register plugins
    await server.register(cors, {
      origin: config.corsOrigin,
      credentials: true,
    })

    await server.register(jwt, {
      secret: config.jwtSecret,
      sign: {
        expiresIn: config.jwtExpiresIn,
      },
    })

    await server.register(cookie, {
      secret: config.cookieSecret,
    })

    await server.register(rateLimit, {
      max: config.rateLimitMax,
      timeWindow: config.rateLimitWindow,
    })

    // Register routes
    await server.register(healthRoutes, { prefix: '/health' })
    await server.register(authRoutes, { prefix: '/api/auth' })

    // Global error handler
    server.setErrorHandler((error, request, reply) => {
      server.log.error(error)

      const statusCode = error.statusCode || 500
      const message = error.message || 'Internal Server Error'

      reply.status(statusCode).send({
        error: {
          message,
          statusCode,
        },
      })
    })

    // Start server
    const port = config.port
    const host = config.host

    await server.listen({ port, host })
    console.log(`🚀 HyperMail API Server running at http://${host}:${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await server.close()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await server.close()
  process.exit(0)
})

start()
