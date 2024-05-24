import styles from "./statisticsCard.module.css";
import Link from "next/link";
import Image from "next/image";
const StatisticsCard = ({ icon, title, path, data, img, small }) => {
  return (
    <>
      {!small ? (
        <div className={styles.salesItem}>
          <div className={styles.itemHeader}>
            <div className={styles.icon}>{icon}</div>
            <Link href={`/dashboard/${path}`} className={styles.link}>
              Xem tất cả
            </Link>
          </div>
          <h4>{title}</h4>
          <div className={styles.info}>
            <span>{data}</span>
            {img === "null" ? (
              ""
            ) : (
              <Image
                src={img ? img : "/line-1.png"}
                alt=""
                width={105}
                height={59}
              />
            )}
          </div>
        </div>
      ) : (
        <div className={styles.small}>
          <div className={styles.left}>
            <div className={styles.icon}>{icon}</div>
          </div>
          <div className={styles.right}>
            <h4>{title}</h4> <span>{data}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default StatisticsCard;
