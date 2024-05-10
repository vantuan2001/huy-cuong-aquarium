import { getNews } from "@/lib/news/data";
import styles from "./singleNews.module.css";
import NewsForm from "./newsForm";

const SingleNewsPage = async ({ params }) => {
  const { id } = params;
  const news = await getNews(id);
  return (
    <div className={styles.container}>
      <NewsForm news={news} key={news.id} />
    </div>
  );
};

export default SingleNewsPage;
