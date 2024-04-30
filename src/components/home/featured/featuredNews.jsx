import Link from "next/link";
import styles from "./featuredProducts.module.css";
import { BsChevronRight } from "react-icons/bs";
import NewsCard from "../cardNews/newsCard";
const FeaturedNews = ({ news }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.titleWrapper}>
          <h3>Tin nổi bật</h3>
        </div>
        <Link className={styles.link} href="/news">
          <div className={styles.more}>
            Xem Thêm <BsChevronRight />
          </div>
        </Link>
      </div>
      <div className={styles.center}>
        {news.map((post) => (
          <NewsCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedNews;
