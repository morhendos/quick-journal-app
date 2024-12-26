import { auth } from "@/lib/auth/config";

export default auth((req) => {
  // Allow the session endpoint
  if (req.nextUrl.pathname === '/api/auth/session') {
    return null;
  }

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
    '/((?!api/auth/session|_next/static|_next/image|favicon.ico).*)'
  ]
};