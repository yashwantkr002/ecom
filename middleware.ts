import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  
    function middleware() {
        return NextResponse.next()
    },
      {
    callbacks: {
      authorized:({token,req})=>{
        const {pathname}= req.nextUrl

        // Allow unauthenticated access to auth-related routes

        if(
            pathname.startsWith("/api/v1/auth") ||
            pathname === "/" ||
            pathname === "/login" ||
            pathname === "/register" ||
            pathname === "/reset-password"

        ){
            return true
        }
         // Block everything else if no token
        return !!token;

      }
    },
  },
)

export const config = { matcher:  ["/((?!api|login|register|_next/static|_next/image|favicon.ico).*)"], }