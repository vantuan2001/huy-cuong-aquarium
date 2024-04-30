"use client";

import Link from "next/link";
import styles from "./navLink.module.css";
import { usePathname } from "next/navigation";

const NavLink = ({ item, header }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.path}
      className={`
      ${styles.container} 
      ${pathName === item.path && styles.active} 
      ${header === true && styles.small} 
      ${pathName === "/" && styles.navHome}
      `}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
