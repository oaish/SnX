import { NextResponse } from 'next/server'

export async function middleware(request) {
    const pathname = request.nextUrl.pathname
    if (pathname === '/auth') {
        const cookie = request.cookies.get({
            name: "session",
        })
        if (cookie?.value === "true") {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return
    }
    if (pathname !== '/auth') {
        const cookie = request.cookies.get({
            name: "session",
        })
        if (cookie?.value === "false") {
            return NextResponse.redirect(new URL('/auth', request.url))
        }
    }
}

export const config = {
    matcher: ['/auth/', '/account/:path*', '/create/:path*', '/contact/:path*', '/'],
}