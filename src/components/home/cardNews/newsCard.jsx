import Image from "next/image";
import styles from "./newsCard.module.css";
import Link from "next/link";

const NewsCard = ({ post, type }) => {
  return (
    <div
      className={`
    ${styles.container} 
    ${type === "small" && styles.containerSmall}`}
    >
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
          <span className={styles.date}>{post.date}</span>
          <h2 className={styles.title}>{post.title}</h2>
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: post?.desc }}
          />
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
