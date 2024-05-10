"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();
  let title;
  switch (pathname.split("/").pop()) {
    case "dashboard":
      title = "Bảng điều khiển";
      break;
    case "users":
      title = "Quản lý người dùng";
      break;
    case "products":
      title = "Quản lý sản phẩm";
      break;
    case "orders":
      title = "Quản lý đơn đặt hàng";
      break;
    case "categories":
      title = "Quản lý đơn danh mục";
      break;
    case "brands":
      title = "Quản lý đơn thương hiệu";
      break;
    case "news":
      title = "Quản lý tin tức";
      break;
    case "reviews":
      title = "Quản lý đánh giá và bình luận";
      break;
    case "settings":
      title = "Quản lý nội dung";
      break;
    default:
      title = pathname.split("/").pop();
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className={styles.input}
          />
        </div>
        <div className={styles.icons}>
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
