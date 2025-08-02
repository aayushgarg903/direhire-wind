import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

// List of public routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth',
  '/api/auth/worker/signup',
  '/api/auth/worker/login',
  '/api/auth/customer/signup',
  '/api/auth/customer/login',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get the token from the Authorization header
  const authHeader = request.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication required' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as { userId: string; userType: string };
    
    // Add user info to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId);
    requestHeaders.set('x-user-type', decoded.userType);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid or expired token' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }
}

// Configure which routes should use the middleware
export const config = {
  matcher: [
    '/api/user/:path*',
    // Add other protected routes here
  ],
};
