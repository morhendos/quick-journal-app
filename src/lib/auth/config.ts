import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

// Login form schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // Add credentials provider
      async authorize(credentials) {
        // Validate the credentials
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new Error('Invalid credentials format');
        }

        const { email, password } = parsedCredentials.data;

        // TODO: Replace this with your actual authentication logic
        // This is just an example
        if (email === "user@example.com" && password === "password123") {
          return {
            id: "1",
            email: email,
            name: "Test User",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: '/api/auth/error',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});