import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./db";
import User from "./models/user";

export const authOptions: NextAuthOptions = {
  //   providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        try {
          await connectDB();
          // find user in database
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found");
          }
          // check password
          const isMatch = await user.comparePassword(credentials.password);
          if (!isMatch) {
            throw new Error("Invalid credentials");
          }
          // check is veryfide
          if (!user.isVerified) {
            throw new Error("Please verify your email");
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error: any) {
          console.error("Authorization error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],

  //   callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },

  //   pages
  pages: {
    signIn: "/login",
    error: "/login",
  },

  //   session
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // secret key
  secret: process.env.NEXTAUTH_SECRET,

  // base path for custom route
  basePath: "/api/v1/auth",
};
