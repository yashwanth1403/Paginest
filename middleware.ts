import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { PublicRoutes, AuthRoutes, Apiprefix } from "./routes";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  const isloggedIn = !!req.auth;
  const AuthDetails = req.auth;
  const { pathname } = req.nextUrl;
  const isAuthRoute = AuthRoutes.some((route) => pathname.startsWith(route));
  if (isloggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(`${AuthDetails?.user.id}`, req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
