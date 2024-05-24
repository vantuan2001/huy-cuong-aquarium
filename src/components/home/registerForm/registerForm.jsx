"use client";
import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/lib/auth/action";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);
  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);
  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.item}>
        <input type="text" name="username" required className={styles.input} />
        <label htmlFor="username" className={styles.label}>
          Họ và tên
        </label>
      </div>
      <div className={styles.item}>
        <input type="email" name="email" required className={styles.input} />
        <label htmlFor="email" className={styles.label}>
          Địa chỉ email
        </label>
      </div>
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
      <div className={styles.item}>
        <input
          type="password"
          name="passwordRepeat"
          required
          className={styles.input}
        />
        <label htmlFor="passwordRepeat" className={styles.label}>
          Nhập lại mật khẩu
        </label>
      </div>
      <button>Đăng ký</button>
      {state?.error}
      <Link href="/login">
        Bạn đã có tài khoản? <b>Đăng nhập</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
