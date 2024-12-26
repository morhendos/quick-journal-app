import { auth } from "./lib/auth/config";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnLoginPage = req.nextUrl.pathname === "/login";

  // If user is not logged in and trying to access protected routes
  if (!isLoggedIn && !isOnLoginPage) {
    return Response.redirect(new URL("/login", req.url));
  }

  // If user is logged in and trying to access login page
  if (isLoggedIn && isOnLoginPage) {
    return Response.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};