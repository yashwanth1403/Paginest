import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { LoginSchema } from "./Types";
import { getUserByEmail } from "./data/user";
import prisma from "./lib/db";
export default {
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const { id, email, image, name } = user;
          if (!email) {
            console.error("no email provided by provider");
            return false;
          }
          const existUser = await getUserByEmail(email as string);
          if (!existUser) {
            await prisma.user.create({
              data: {
                email: email,
                image,
                name: name || " ",
                emailVerified: new Date(),
                loginProvider: "GOOGLE",
              },
            });
            return true;
          } else {
            if (existUser.loginProvider !== "GOOGLE") {
              await prisma.user.update({
                where: {
                  email: existUser.email,
                },
                data: {
                  loginProvider: "GOOGLE",
                  image: user.image,
                },
              });
              return true;
            }
            return true;
          }
        }
        if (account?.provider === "github") {
          const { name, email, image } = user;
          if (email) {
            const existUser = await getUserByEmail(email as string);
            if (!existUser) {
              await prisma.user.create({
                data: {
                  email: email,
                  image,
                  name: name || "Anonymous",
                  emailVerified: new Date(),
                  loginProvider: "GITHUB",
                },
              });
              return true;
            } else {
              if (existUser.loginProvider !== "GITHUB") {
                await prisma.user.update({
                  where: {
                    email: existUser.email,
                  },
                  data: {
                    loginProvider: "GITHUB",
                    image: user.image,
                  },
                });
                return true;
              }
              return true;
            }
          } else {
            return false;
          }
        }
        if (account?.provider === "credentials") {
          const { email } = user;
          if (!email) {
            console.error("No email found");
            return false;
          }
          const Existuser = await getUserByEmail(email as string);
          if (!Existuser) {
            console.error("No user found");
            return false;
          }
          if (!Existuser?.emailVerified) {
            console.error("Please confirm your email");
            return false;
          }
          return true;
        }
        return false;
      } catch (err) {
        console.error("Error during sign-in: ", err);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findFirst({
          where: {
            email: user?.email || " ",
          },
        });
        console.log(dbUser);
        if (dbUser) {
          token.id = dbUser?.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
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
        if (!user.password) {
          return null;
        }
        const result = await bcrypt.compare(
          loginCredentials.data.password,
          user.password
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
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
