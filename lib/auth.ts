import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"; 
import prisma from "@/lib/prisma"; 
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma), 
  providers: [GitHub, Google],
  callbacks: {
    authorized({auth, request: {nextUrl}}) {
      const isLoggedIn = !!auth;
      const isProtectedRouter = nextUrl.pathname.startsWith("/dashboard");
      if (isProtectedRouter && !isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl))
      }

      return true;
    },
  },
});

