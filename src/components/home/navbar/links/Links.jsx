"use client";

import { useEffect, useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import { BsBasket } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { handleLogout } from "@/lib/action";
import { useSelector } from "react-redux";

const links = [
  {
    title: "Trang Chủ",
    path: "/",
  },
  {
    title: "Giới Thiệu",
    path: "/about",
  },
  {
    title: "Sản Phẩm",
    path: "/products",
  },
  {
    title: "Tin Tức",
    path: "/news",
  },
];

const Links = ({ header, session }) => {
  const [isClient, setIsClient] = useState(false);
  const quantity = useSelector((state) => state.cart.products.length);
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} header={header} />
        ))}

        <div
          className={`${styles.cart} ${header === true && styles.small} ${
            pathName === "/" && styles.navHome
          }`}
        >
          <Link href="/cart">
            <div className={styles.cartIcon}>
              <BsBasket />
              <div className={styles.cartLength}>{isClient ? quantity : 0}</div>
            </div>
          </Link>
        </div>

        {session?.user ? (
          <>
            {session.user?.isAdmin ? (
              <NavLink
                item={{ title: "Bảng điều khiển", path: "/dashboard" }}
                className={styles.container}
                header={header}
              />
            ) : (
              <NavLink
                item={{ title: "Quản lý đơn hàng", path: "/purchase" }}
                className={styles.container}
                header={header}
              />
            )}

            <form action={handleLogout}>
              <button
                className={`${styles.logout} ${
                  header === true && styles.logoutSmall
                } ${pathName === "/" && styles.logoutHome}`}
              >
                Đăng Xuất
              </button>
            </form>
          </>
        ) : (
          <NavLink
            item={{ title: "Đăng nhập", path: "/login" }}
            className={styles.container}
            header={header}
          />
        )}
      </div>
      <button
        className={open ? `${styles.menu} ${styles.active}` : `${styles.menu}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div>menu</div>
      </button>
      {open && (
        <div className={styles.mobileLinks}>
          <div className={styles.mobileContainer}>
            {links.map((link) => (
              <NavLink item={link} key={link.title} header={header} />
            ))}

            <div
              className={`${styles.cart} ${header === true && styles.small} ${
                pathName === "/" && styles.navHome
              }`}
            >
              <Link href="/cart">
                <p>Giỏ hàng</p>
                <div className={styles.cartIcon}>
                  <BsBasket />
                  <div className={styles.cartLength}>
                    {isClient ? quantity : 0}
                  </div>
                </div>
              </Link>
            </div>

            {session?.user ? (
              <>
                {session.user?.isAdmin ? (
                  <NavLink
                    item={{ title: "Bảng điều khiển", path: "/dashboard" }}
                    className={styles.container}
                    header={header}
                  />
                ) : (
                  <NavLink
                    item={{ title: "Quản lý đơn hàng", path: "/orders" }}
                    className={styles.container}
                    header={header}
                  />
                )}

                <form action={handleLogout}>
                  <button
                    className={`${styles.logout} ${
                      header === true && styles.logoutSmall
                    } ${pathName === "/" && styles.logoutHome}`}
                  >
                    Đăng Xuất
                  </button>
                </form>
              </>
            ) : (
              <NavLink
                item={{ title: "Đăng nhập", path: "/login" }}
                className={styles.container}
                header={header}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Links;
