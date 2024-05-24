"use client";

import Link from "next/link";
import styles from "./navLink.module.css";
import { usePathname } from "next/navigation";

const NavLink = ({ item, header, setOpen }) => {
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
      onClick={() => setOpen(false)}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
