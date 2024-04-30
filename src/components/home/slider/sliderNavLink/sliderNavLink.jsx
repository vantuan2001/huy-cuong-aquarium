"use client";

import Link from "next/link";
import styles from "./sliderNavLink.module.css";
import { usePathname } from "next/navigation";

const SliderNavLink = ({ item }) => {
  const pathName = usePathname();

  return (
    <li
      className={`
    ${styles.container} 
    ${pathName === item.path && styles.active} 
    `}
    >
      <Link href={item.path} className={styles.link}>
        <span className={styles.icons}>
          <i className={item.icon}></i>
        </span>
        <span className={styles.title}>{item.title}</span>
      </Link>
    </li>
  );
};

export default SliderNavLink;
