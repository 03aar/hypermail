import { FastifyInstance } from 'fastify'
import { config } from '../lib/config'

export default async function healthRoutes(server: FastifyInstance) {
  // Health check endpoint
  server.get('/', async (request, reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.nodeEnv,
      version: '0.1.0',
    }
  })

  // Readiness check
  server.get('/ready', async (request, reply) => {
    // TODO: Check database connection, redis connection, etc.
    return {
      status: 'ready',
      checks: {
        database: 'ok',
        redis: 'ok',
      },
    }
  })

  // Liveness check
  server.get('/live', async (request, reply) => {
    return {
      status: 'alive',
    }
  })
}
