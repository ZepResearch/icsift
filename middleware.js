// middleware.js
import { NextResponse } from 'next/server'

// In-memory store for rate limiting
// In production, consider using Redis or another external store for multi-instance deployments
const ipRequestMap = new Map()

// Rate limit configuration - adjust these values based on your needs
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds
const MAX_REQUESTS_PER_WINDOW = 100 // Maximum requests per IP per window

export function middleware(request) {
  const response = NextResponse.next()
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY') 
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';")
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Check if request is to the API
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Get IP address
    const ip = request.ip || 'unknown'
    
    // Get current timestamp
    const now = Date.now()
    
    // Initialize or retrieve IP data
    const ipData = ipRequestMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW }
    
    // If the reset time has passed, reset count
    if (now > ipData.resetTime) {
      ipData.count = 0
      ipData.resetTime = now + RATE_LIMIT_WINDOW
    }
    
    // Increment request count
    ipData.count++
    
    // Update IP data in the map
    ipRequestMap.set(ip, ipData)
    
    // If request count exceeds limit, return 429 Too Many Requests
    if (ipData.count > MAX_REQUESTS_PER_WINDOW) {
      // Set retry-after header (in seconds)
      const retryAfter = Math.ceil((ipData.resetTime - now) / 1000)
      
      return new NextResponse(
        JSON.stringify({ 
          error: 'Too many requests', 
          message: 'Please try again later' 
        }),
        { 
          status: 429, 
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': MAX_REQUESTS_PER_WINDOW.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.ceil(ipData.resetTime / 1000).toString()
          }
        }
      )
    }
    
    // Add rate limit headers to response
    response.headers.set('X-RateLimit-Limit', MAX_REQUESTS_PER_WINDOW.toString())
    response.headers.set('X-RateLimit-Remaining', Math.max(0, MAX_REQUESTS_PER_WINDOW - ipData.count).toString())
    response.headers.set('X-RateLimit-Reset', Math.ceil(ipData.resetTime / 1000).toString())
  }
  
  return response
}

// Configure which paths should be processed by this middleware
export const config = {
  matcher: [
    // Apply to all API routes
    '/api/:path*',
  ],
}