import { auth } from "@/lib/auth/config";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnLoginPage = req.nextUrl.pathname === "/login";

  if (isLoggedIn && isOnLoginPage) {
    return Response.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && !isOnLoginPage) {
    return Response.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};