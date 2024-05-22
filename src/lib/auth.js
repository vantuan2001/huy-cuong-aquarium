import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "./authconfig";
import { connectToDb } from "./utils";
import { User } from "@/lib/models";

// Hàm login: Xác thực thông tin đăng nhập
const login = async (credentials) => {
  try {
    connectToDb(); // Kết nối đến cơ sở dữ liệu
    const user = await User.findOne({ phone: credentials.phone }); // Tìm người dùng trong cơ sở dữ liệu dựa trên số điện thoại
    if (!user) throw new Error("Thông tin đăng nhập không đúng!"); // Nếu không tìm thấy người dùng, ném lỗi
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    ); // So sánh mật khẩu đã nhập với mật khẩu được mã hóa trong cơ sở dữ liệu

    if (!isPasswordCorrect) throw new Error("Mật khẩu sai. Vui lòng thử lại."); // Nếu mật khẩu không chính xác, ném lỗi
    return user; // Trả về người dùng nếu xác thực thành công
  } catch (err) {
    console.log(err);
    throw new Error("Đăng nhập không thành công!"); // Nếu có lỗi xảy ra trong quá trình xác thực, ném lỗi
  }
};

// Config NextAuth với các cấu hình và nhà cung cấp xác thực
export const { signIn, signOut, auth } = NextAuth({
  ...authConfig, // Sử dụng các cấu hình xác thực từ tệp authconfig.js
  providers: [
    CredentialsProvider({
      // Sử dụng CredentialsProvider để xác thực bằng thông tin đăng nhập (username/password)
      async authorize(credentials) {
        // Hàm authorize xử lý quá trình xác thực
        try {
          const user = await login(credentials); // Gọi hàm login để xác thực thông tin đăng nhập
          return user; // Trả về người dùng nếu xác thực thành công
        } catch (err) {
          return null; // Trả về null nếu có lỗi trong quá trình xác thực
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Callback jwt được gọi sau khi JWT token được tạo
      if (user) {
        // Nếu tồn tại người dùng
        // Gán các thông tin người dùng vào token JWT
        token.username = user.username;
        token.phone = user.phone;
        token._id = user._id;
        token.isAdmin = user.isAdmin;
      }
      return token; // Trả về token JWT đã được cập nhật
    },
    async session({ session, token }) {
      // Callback session được gọi sau khi session được tạo
      if (token) {
        // Nếu tồn tại token JWT
        // Gán các thông tin người dùng từ token JWT vào session
        session.user.username = token.username;
        session.user.phone = token.phone;
        session.user._id = token._id;
        session.user.isAdmin = token.isAdmin;
      }
      return session; // Trả về session đã được cập nhật
    },
  },
});
