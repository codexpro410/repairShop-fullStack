import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export default withAuth(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function middleware(req:NextRequest) {
        //console.log(req.nextUrl.pathname);
    },{
        isReturnToCurrentPath: true,
    }
)
export const config = {
    matcher:
    //  ["/login"]
    // using regix
    [
        '/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|login|$).*)',
    ]
}