"use client";
import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavbarItem = ({ session, imgLogo, title }) => {
  const [header, setHeader] = useState(false);
  const pathName = usePathname();

  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };
  useEffect(() => {
    // Listen to scroll event
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`${styles.navbar} ${header === true && styles.small}`}>
      <div className="container">
        <div className={styles.menu}>
          <Link href="/" className={styles.logo}>
            <Image
              src={imgLogo}
              alt=""
              height={40}
              width={40}
              className={styles.logoImg}
            />
            <span
              className={`${styles.title} ${
                pathName === "/" && styles.titleHome
              }`}
            >
              {title}
            </span>
          </Link>
          <div className={styles.boxMenu}>
            <Links header={header} session={session} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarItem;
