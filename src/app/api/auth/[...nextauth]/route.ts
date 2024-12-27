import NextAuth from "next-auth";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("[AUTH] authorize called:", credentials);

        if (
          credentials?.email === "user@example.com" &&
          credentials?.password === "password123"
        ) {
          console.log("[AUTH] Valid credentials");
          return {
            id: "1",
            email: credentials.email,
            name: "Test User",
          };
        }
        console.log("[AUTH] Invalid credentials");
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("[AUTH] JWT callback:", { token, user });
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("[AUTH] Session callback:", { session, token });
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
