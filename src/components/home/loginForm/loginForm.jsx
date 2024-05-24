"use client";

import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";
import { login } from "@/lib/auth/action";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.item}>
        <input type="phone" name="phone" required className={styles.input} />
        <label htmlFor="phone" className={styles.label}>
          Số điện thoại
        </label>
      </div>
      <div className={styles.item}>
        <input
          type="password"
          name="password"
          required
          className={styles.input}
        />
        <label htmlFor="password" className={styles.label}>
          Mật khẩu
        </label>
      </div>

      <button>Đăng nhập</button>
      {state?.error}
      <Link href="/register">
        {"Bạn chưa có tài khoản?"} <b>Đăng ký ngay</b>
      </Link>
    </form>
  );
};

export default LoginForm;
