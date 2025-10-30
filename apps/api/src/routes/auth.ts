import { FastifyInstance } from 'fastify'
import { z } from 'zod'

const signupSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
})

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default async function authRoutes(server: FastifyInstance) {
  // Sign up endpoint
  server.post('/signup', async (request, reply) => {
    try {
      const body = signupSchema.parse(request.body)

      // TODO: Implement user creation logic
      return {
        success: true,
        message: 'User created successfully',
        user: {
          email: body.email,
          name: body.name,
        },
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply.code(400)
        return {
          error: 'Validation error',
          details: error.errors,
        }
      }
      throw error
    }
  })

  // Sign in endpoint
  server.post('/signin', async (request, reply) => {
    try {
      const body = signinSchema.parse(request.body)

      // TODO: Implement authentication logic
      return {
        success: true,
        token: 'mock-jwt-token',
        user: {
          email: body.email,
        },
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply.code(400)
        return {
          error: 'Validation error',
          details: error.errors,
        }
      }
      throw error
    }
  })

  // OAuth - Google
  server.get('/google', async (request, reply) => {
    // TODO: Redirect to Google OAuth
    return { message: 'Google OAuth - Coming soon' }
  })

  server.get('/google/callback', async (request, reply) => {
    // TODO: Handle Google OAuth callback
    return { message: 'Google OAuth callback - Coming soon' }
  })

  // OAuth - Microsoft
  server.get('/microsoft', async (request, reply) => {
    // TODO: Redirect to Microsoft OAuth
    return { message: 'Microsoft OAuth - Coming soon' }
  })

  server.get('/microsoft/callback', async (request, reply) => {
    // TODO: Handle Microsoft OAuth callback
    return { message: 'Microsoft OAuth callback - Coming soon' }
  })

  // Get current user
  server.get('/me', async (request, reply) => {
    // TODO: Implement JWT verification and user retrieval
    return {
      user: {
        id: 'mock-user-id',
        email: 'user@example.com',
        name: 'Mock User',
      },
    }
  })

  // Sign out
  server.post('/signout', async (request, reply) => {
    // TODO: Invalidate token/session
    return {
      success: true,
      message: 'Signed out successfully',
    }
  })
}
