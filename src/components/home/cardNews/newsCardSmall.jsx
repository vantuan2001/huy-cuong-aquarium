import Image from "next/image";
import styles from "./newsCard.module.css";
import Link from "next/link";

const NewsCardSmall = async ({ post }) => {
  return (
    <div className={styles.containerSmall}>
      <Link className={styles.link} href={`/news/${post.title}`}>
        <div className={styles.top}>
          {post.img && (
            <div className={styles.imgContainer} key={post._id}>
              <Image
                src={post.img}
                alt=""
                width={300}
                height={170}
                className={styles.img}
              />
            </div>
          )}
        </div>
        <div className={styles.bottom}>
          <h2 className={styles.title}>{post.title}</h2>
        </div>
      </Link>
    </div>
  );
};

export default NewsCardSmall;
