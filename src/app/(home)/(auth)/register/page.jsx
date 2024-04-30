import RegisterForm from "@/components/home/registerForm/registerForm";
import styles from "./register.module.css";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Đăng ký</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
