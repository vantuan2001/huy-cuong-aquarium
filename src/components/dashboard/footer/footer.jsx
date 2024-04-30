import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Huy Cường Aquarium</div>
      <div className={styles.text}>
        © Bản quyền thuộc về Văn Tuấn | Cung cấp bởi Văn Tuấn.
      </div>
    </div>
  );
};

export default Footer;
