import Image from "next/image";
import styles from "./newsCard.module.css";
import Link from "next/link";
import moment from "moment";
import StarRating from "../starRating/starRating";

const NewsCard = async ({ post }) => {
  return (
    <div className={styles.container}>
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
          <StarRating postId={post._id} />

          <span className={styles.date}>
            {moment(post?.createdAt).format("HH:mm DD/MM/YYYY")}
          </span>
          <h2 className={styles.title}>{post.title}</h2>
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: post?.desc.toString().slice(0, 100),
            }}
          />
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
