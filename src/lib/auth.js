import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "./authconfig";
import { connectToDb } from "./utils";
import { User } from "./models";

const login = async (credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({ phone: credentials.phone });

    if (!user) throw new Error("Thông tin đăng nhập không đúng!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Thông tin đăng nhập không đúng!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Đăng nhập không thành công!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.phone = user.phone;
        token._id = user._id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.phone = token.phone;
        session.user._id = token._id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
});
