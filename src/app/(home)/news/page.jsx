import styles from "./news.module.css";
import Link from "next/link";
import { AiOutlineDoubleRight } from "react-icons/ai";
import NewsCard from "@/components/home/cardNews/newsCard";
import Filter from "@/components/home/filter/filter";
import { getCategories } from "@/lib/categories/data";
import { fetchLimitNews, fetchNews } from "@/lib/news/data";
import Pagination from "@/components/dashboard/pagination/pagination";
export const generateMetadata = () => {
  return {
    title: "Tin tức",
  };
};

const News = async ({ searchParams }) => {
  const { q = "", page = 1 } = searchParams || {};
  const number = 10;
  const { count, news } = await fetchNews(q, page, number);
  const newsSmall = await fetchLimitNews(5);
  const categories = await getCategories();
  const [newsObject, newsSmallObject, categoriesObject] = [
    news,
    newsSmall,
    categories,
  ].map((item) => JSON.parse(JSON.stringify(item)));
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
          <Filter news={newsSmallObject} categories={categoriesObject} />
        </div>
        <div className={styles.right}>
          <h3 className={styles.title}>TIN TỨC</h3>
          <div className={styles.list}>
            {newsObject.length === 0 ? (
              <div className={styles.noNews}>Không có tin tức nào.</div>
            ) : (
              newsObject.map((item) => <NewsCard post={item} key={item._id} />)
            )}
          </div>
          <Pagination count={count} />
        </div>
      </div>
    </div>
  );
};

export default News;
