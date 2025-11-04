import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Verifica se o usuário está autenticado (simplificado para demo)
  const isAuthenticated = request.cookies.get('auth-token')?.value

  // Se não autenticado e tentando acessar área protegida, redireciona para Landing Page
  if (!isAuthenticated && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Se autenticado e acessando raiz, redireciona para dashboard
  if (isAuthenticated && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*']
}