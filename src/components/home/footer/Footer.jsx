import Link from "next/link";
import styles from "./footer.module.css";
import { getCategories } from "@/lib/categories/data";
import { FaFacebookF, FaTiktok } from "react-icons/fa";

const Footer = async () => {
  const categories = await getCategories();
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.left}>
            <h5 className={styles.title}>Về chúng tôi</h5>
            <p className={styles.text}>
              Website chính thức và duy nhất của Huy Cường Aquarium. Hiện tại
              chúng mình chỉ nhận đơn hàng trên website chứ không nhận bất kỳ
              nơi nào khác nhé!
            </p>
          </div>
          <div className={styles.center}>
            <div className={styles.item}>
              <h5 className={styles.title}>Danh mục sản phẩm</h5>
              <ul className={styles.ul}>
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link href={`/products?c=${category.name}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.item}>
              <h5 className={styles.title}>Thông tin</h5>
              <ul className={styles.ul}>
                <li>
                  <Link href="/about">Giới thiệu</Link>
                </li>
                <li>
                  <Link href="/">Chính sách bảo mật</Link>
                </li>
                <li>
                  <Link href="/">Điều khoản </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.right}>
            <h5 className={styles.title}>Hỗ trợ</h5>
            <p className={styles.text}>
              Mọi thắc mắc và góp ý cần hỗ trợ xin vui lòng liên hệ Fanpage và
              TikTok nhé!
            </p>
            <div className={styles.social}>
              <a href="https://www.facebook.com/profile.php?id=100076359561396">
                <FaFacebookF />
              </a>
              <a href="https://www.tiktok.com/@thuysinhhuycuong?lang=vi-VN">
                <FaTiktok />
              </a>
            </div>
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
