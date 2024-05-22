"use client";

import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
  MdOutlineFormatListBulleted,
  MdNewspaper,
  MdOutlineReviews,
  MdHome,
} from "react-icons/md";
import { FaBars, FaTags, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { handleLogout } from "@/lib/auth/action";

const menuItems = [
  {
    title: "Trang",
    list: [
      {
        title: "Bảng điều khiển",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Người Dùng",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Sản Phẩm",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },

      {
        title: "Đơn Hàng",
        path: "/dashboard/orders",
        icon: <MdAttachMoney />,
      },
      {
        title: "Danh Mục",
        path: "/dashboard/categories",
        icon: <MdOutlineFormatListBulleted />,
      },
      {
        title: "Thương Hiệu",
        path: "/dashboard/brands",
        icon: <FaTags />,
      },
      {
        title: "Tin Tức",
        path: "/dashboard/news",
        icon: <MdNewspaper />,
      },
      {
        title: "Đánh Giá",
        path: "/dashboard/reviews",
        icon: <MdOutlineReviews />,
      },
    ],
  },
  {
    title: "Phân tích",
    list: [
      {
        title: "Doanh thu",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Báo cáo",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
    ],
  },
  {
    title: "Người dùng",
    list: [
      {
        title: "Trang người dùng",
        path: "/",
        icon: <MdHome />,
      },
      {
        title: "Cài đặt",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Giúp đỡ",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const SidebarContainer = ({ user }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <button
        className={
          open ? `${styles.buttons} ${styles.buttonsOpen}` : `${styles.buttons}`
        }
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <FaTimes /> : <FaBars className={styles.icon} />}
      </button>
      <div
        className={
          open ? `${styles.wrapper} ${styles.wrapperOpen}` : `${styles.wrapper}`
        }
      >
        <div className={styles.user}>
          <div className={styles.avatar}>
            <div className={styles.text}>
              {user.username.toString().slice(0, 1)}
            </div>
          </div>
          <div className={styles.userDetail}>
            <span className={styles.username}>{user.username}</span>
            <span className={styles.userTitle}>Quản trị viên</span>
          </div>
        </div>
        <ul className={styles.list}>
          {menuItems.map((cat) => (
            <li key={cat.title}>
              <span className={styles.cat}>{cat.title}</span>
              {cat.list.map((item) => (
                <MenuLink item={item} key={item.title} setOpen={setOpen} />
              ))}
            </li>
          ))}
          <form action={handleLogout}>
            <button className={styles.logout}>
              <MdLogout />
              Đăng Xuất
            </button>
          </form>
        </ul>
      </div>
    </div>
  );
};

export default SidebarContainer;
