import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { PublicRoutes, AuthRoutes, Apiprefix } from "./routes";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  const isloggedIn = !!req.auth;
  const AuthDetails = req.auth;
  const { pathname } = req.nextUrl;
  const isAuthRoute = AuthRoutes.includes(pathname);
  const isPublicRoute = PublicRoutes.includes(pathname);
  const isApiPrefix = pathname.startsWith(Apiprefix);

  if (isloggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(`${AuthDetails?.user.id}`, req.url));
  }
  if (isApiPrefix) {
    return NextResponse.next();
  }
  if (!isloggedIn && !isAuthRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
