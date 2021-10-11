import { Router } from 'itty-router'
import User from './user'

// Load the router
const router = Router()

// Get the user
router.get('/v1/user/:user', async request => {
    let userData = await User.getUserData(request.params.user)
    return new Response(userData);
})

// All other routers
router.all('/*', () => new Response('Not Found', { status: 404 }))

// Return the router
export const handleRequest = request => router.handle(request)