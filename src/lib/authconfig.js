export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    // https://next-auth.js.org/configuration/callbacks
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnDashboardPanel =
        request.nextUrl?.pathname.startsWith("/dashboard");
      const isOnCheckoutPage =
        request.nextUrl?.pathname.startsWith("/checkout");
      const isOnThanksPage = request.nextUrl?.pathname.startsWith("/thanks");
      const isOnPurchasePage =
        request.nextUrl?.pathname.startsWith("/purchase");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      // Chỉ có quản trị viên mới có thể truy cập vào bảng điều khiển quản trị.
      if (isOnDashboardPanel && !user?.isAdmin) {
        return false;
      }
      // Chỉ người dùng đã xác thực mới có thể truy cập trang thanh toán.
      if (isOnCheckoutPage && !user) {
        return false;
      }
      // Chỉ người dùng đã xác thực mới có thể truy cập trang quản lý đơn hàng.
      if (isOnPurchasePage && !user) {
        return false;
      }
      // Chỉ người dùng đã xác thực mới có thể truy cập trang cảm ơn.
      if (isOnThanksPage && !user) {
        return false;
      }
      // Kiểm tra xem người dùng có đang ở trên trang đăng nhập không và liệu người dùng có phải là quản trị viên hay không. Nếu cả hai điều kiện đều đúng, mã sẽ chuyển hướng người dùng đến trang dashboard
      if (isOnLoginPage && user?.isAdmin) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      // Kiểm tra xem người dùng có đang ở trang đăng nhập và có tồn tại không. Nếu cả hai điều kiện đều đúng, mã sẽ chuyển hướng người dùng về trang chủ,
      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
