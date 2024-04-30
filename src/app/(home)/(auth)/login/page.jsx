import LoginForm from "@/components/home/loginForm/loginForm";
import styles from "./login.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Đăng nhập</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
