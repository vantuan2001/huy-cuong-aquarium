import styles from "./news.module.css";
import Link from "next/link";
import { AiOutlineDoubleRight } from "react-icons/ai";
import NewsCard from "@/components/home/cardNews/newsCard";
import { fetchLimitNews, getCategories } from "@/lib/data";
import Filter from "@/components/home/filter/filter";

const fetchData = async () => {
  const res = await fetch("https://huy-cuong-aquarium.vercel.app/api/news", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Đã xảy ra lỗi");
  }

  return res.json();
};

const News = async () => {
  const newsAll = await fetchData();
  const categories = await getCategories();
  const limit = 5;
  const news = await fetchLimitNews(limit);
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
          <Filter news={news} categories={categories} />
        </div>
        <div className={styles.right}>
          <h3 className={styles.title}>TIN TỨC</h3>
          <div className={styles.list}>
            {newsAll.length === 0 ? (
              <div className={styles.noNews}>Không có tin tức nào.</div>
            ) : (
              newsAll.map((item) => <NewsCard post={item} key={item._id} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
