import { Router } from 'itty-router'
import User from './user'

// Load the router
const router = Router()
const jsonHeader = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
}
const imageHeader = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'image/png'
}

// Get the user
router.get('/v1/user/:user', async request => {
    let userData = await User.getUserData(request.params.user)
    if(userData === null) return new Response('Not Found', { status: 404, headers: jsonHeader })
    return new Response(userData, { headers: jsonHeader });
})

router.get('/v1/user/:user/skin', async request => {
    let userData = await User.getSkin(request.params.user)
    if(userData === null) return new Response('Not Found', { status: 404, headers: jsonHeader })
    return new Response(userData, { headers: imageHeader });
})

router.get('/v1/user/:user/cape/:type?', async request => {
    let userData = await User.getCape(request.params.user, request.params.type)
    if(userData === null) return new Response('Not Found', { status: 404, headers: jsonHeader })
    return new Response(userData, { headers: imageHeader });
})

// All other routers
router.all('/*', () => new Response('Not Found', { status: 404, headers: jsonHeader }))

// Return the router
export const handleRequest = request => router.handle(request)