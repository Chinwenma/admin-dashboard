import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { NextAuthOptions, Session } from "next-auth";
import prisma from "./prisma";
import { JWT } from "next-auth/jwt";

/* eslint-disable @typescript-eslint/no-explicit-any */
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        if (!credentials.email || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.isActive) return null;

        const isValid = await compare(credentials.password, user.password!);
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account && user) {
        token.accessToken = account?.access_token;
        token.sub = account.id as string;
        token.role = (user as any).role;
        token.picture = (user as any).image;
      }
      if (account && profile) {
        console.log("account :", account);
        console.log("profile:", profile);
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        name: token.name as string,
        email: token.email as string,
        image: token.picture as string,
        role: token.role as string,
        id: token.id as string,
      };
      session.id = token.sub as string;
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/signout",
  },
};
export default authOptions;
