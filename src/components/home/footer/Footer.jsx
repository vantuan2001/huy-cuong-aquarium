import Link from "next/link";
import styles from "./footer.module.css";
import { fetchSetting } from "@/lib/data";

const Footer = async () => {
  const id = "661a894e2c902060a3e28ed9";
  const setting = await fetchSetting(id);
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.title}>{setting.title}</div>
            <ul className={styles.ul}>
              <li>
                <div className={styles.item}>
                  <span className={styles.address}>Địa chỉ:</span>
                  <p>{setting.address}</p>
                </div>
              </li>
              <li>
                <div className={styles.item}>
                  <span>Số điện thoại:</span>
                  <p>{setting.phone}</p>
                </div>
              </li>
              <li>
                <div className={styles.item}>
                  <span>Email:</span>
                  <p>{setting.email}</p>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>Hướng dẫn khách hàng</div>
            <ul className={styles.ul}>
              <li>
                <Link href="/">Hướng dẫn mua hàng</Link>
              </li>
              <li>
                <Link href="/">Hướng dẫn thanh toán</Link>
              </li>
              <li>
                <Link href="/">Hướng dẫn giao nhận</Link>
              </li>
            </ul>
            {/* Bạn đang tìm : Aqua setup bể cá thuỷ sinh đẹp uy tín, chất lượng.
            <br />
            Một shop cung cấp phụ kiện thuỷ sinh chất lượng hàng đầu.
            <br />
            Hay một cửa hàng có thiết bị cho bể cá cảnh phong phú nhất. */}
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        Bản quyền thuộc về Văn Tuấn | Cung cấp bởi Văn Tuấn
      </div>
    </div>
  );
};

export default Footer;
