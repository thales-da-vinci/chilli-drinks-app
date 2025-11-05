import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Verifica se o usuário está autenticado via cookie
  const isAuthenticated = request.cookies.get('chilli_drinks_auth')?.value

  // Se não autenticado e tentando acessar área protegida, redireciona para login
  if (!isAuthenticated && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Permite acesso livre à landing page, login e register
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}