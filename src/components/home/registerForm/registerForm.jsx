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
      <input type="text" placeholder="Nhập họ và tên" name="username" />
      <input type="email" placeholder="Nhập địa chỉ email" name="email" />
      <input type="phone" placeholder="Nhập số điện thoại" name="phone" />
      <input type="password" placeholder="Nhập mật khẩu" name="password" />
      <input
        type="password"
        placeholder="Nhập lại mật khẩu"
        name="passwordRepeat"
      />
      <button>Đăng ký</button>
      {state?.error}
      <Link href="/login">
        Bạn đã có tài khoản? <b>Đăng nhập</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
