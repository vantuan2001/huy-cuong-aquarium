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
import { FaTags } from "react-icons/fa";
import { auth, signOut } from "@/lib/auth";

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

const Sidebar = async () => {
  const { user } = await auth();
  return (
    <div className={styles.container}>
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
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className={styles.logout}>
            <MdLogout />
            Đăng Xuất
          </button>
        </form>
      </ul>
    </div>
  );
};

export default Sidebar;
