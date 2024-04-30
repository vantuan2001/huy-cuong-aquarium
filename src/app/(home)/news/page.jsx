import WidgetNews from "@/components/home/widget/widgetNews";
import styles from "./news.module.css";
import Link from "next/link";
import { AiOutlineDoubleRight } from "react-icons/ai";
import NewsCard from "@/components/home/cardNews/newsCard";

const fetchData = async () => {
  const res = await fetch("http://localhost:3000/api/news", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Đã xảy ra lỗi");
  }

  return res.json();
};

const News = async () => {
  const news = await fetchData();
  return (
    <div className="container">
      <div className="breadcrumbs">
        <Link href="/" className="breadcrumbs-link">
          Trang chủ
        </Link>
        <AiOutlineDoubleRight />
        <p className="breadcrumbs-link">Tin tức</p>
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <WidgetNews />
        </div>
        <div className={styles.right}>
          <h3 className={styles.title}>TIN TỨC</h3>
          <div className={styles.list}>
            {news.length === 0 ? (
              <div className={styles.noNews}>Không có tin tức nào.</div>
            ) : (
              news.map((item) => <NewsCard post={item} key={item._id} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
