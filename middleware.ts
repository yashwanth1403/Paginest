import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { PublicRoutes, AuthRoutes, Apiprefix } from "./routes";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  const isloggedIn = !!req.auth;
  const user = req.auth;
  console.log(user);
  const { nextUrl } = req;
  const isPublicRoute = PublicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);
  const isApiPrefix = Apiprefix.startsWith(nextUrl.pathname);
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
