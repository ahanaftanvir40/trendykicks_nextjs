import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request , secret:process.env.NEXT_AUTH })
    console.log('token log middleware :', token);

    const url = request.nextUrl

    if (token && (
        url.pathname.startsWith('/signin') ||
        url.pathname.startsWith('/signup') ||
        url.pathname.startsWith('/verifyemail')
    )) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (token?.isAdmin === false && (
        url.pathname.startsWith('/adminpanel')
    )) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (!token && (
        url.pathname.startsWith('/products/cart')

    )) {
        console.log('Token info:' , token);
        
        return NextResponse.redirect(new URL('/signin', request.url))
    }
    if(!token && (
        url.pathname.startsWith('/products/orderconfirm')
    )){
        return NextResponse.redirect(new URL('/' , request.url))
    }

    return NextResponse.next()


}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/signin',
        '/signup',
        '/products/cart',
        '/products/orderconfirm',
        '/verifyemail/:path*',
        '/adminpanel/:path*'
    ],
}