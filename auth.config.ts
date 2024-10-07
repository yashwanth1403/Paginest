import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { LoginSchema } from "./Types";
import { getUserByEmail } from "./data/user";
export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", placeholder: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        const loginCredentials = LoginSchema.safeParse(credentials);
        if (!loginCredentials.success) {
          return null;
        }
        const user = await getUserByEmail(loginCredentials.data.email);
        if (!user) {
          return null;
        }
        const result = await bcrypt.compare(
          loginCredentials.data.password,
          user.password || ""
        );
        if (result) {
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
