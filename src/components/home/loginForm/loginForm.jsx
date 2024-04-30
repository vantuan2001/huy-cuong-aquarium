"use client";

import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";
import { login } from "@/lib/action";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="Số điện thoại" name="phone" />
      <input type="password" placeholder="Mật khẩu" name="password" />
      <button>Đăng nhập</button>
      {state?.error}
      <Link href="/register">
        {"Bạn chưa có tài khoản?"} <b>Đăng ký ngay</b>
      </Link>
    </form>
  );
};

export default LoginForm;
