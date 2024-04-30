import Link from "next/link";
import styles from "./widgetNews.module.css";
import Image from "next/image";
import NewsCard from "../cardNews/newsCard";
import { fetchNews } from "@/lib/data";
// import { getCategories } from "@/app/lib/data";

const getCategories = async () => {
  const res = await fetch("http://localhost:3000/api/category", {
    next: { revalidate: 1 },
  });

  if (!res.ok) {
    throw new Error("Đã xảy ra lỗi");
  }

  return res.json();
};

const WidgetNews = async () => {
  const q = "";
  const page = 1;
  const number = 5;
  const { news } = await fetchNews(q, page, number);
  const category = await getCategories();
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h3 className={styles.title}>Kiến thức và tư vấn</h3>
        <div className={styles.list}>
          {news.map((post) => (
            <NewsCard post={post} key={post._id} type="small" />
          ))}
        </div>
      </div>
      <div className={styles.item}>
        <h3 className={styles.title}>Danh mục sản phẩm</h3>
        <div className={styles.list}>
          {category.map((item) => (
            <div className={styles.categoryItem} key={item._id}>
              <Link
                className={styles.link}
                href={`/products/category/${item.title}`}
              >
                {item.img_logo && (
                  <Image src={item.img_logo} alt="" width={30} height={30} />
                )}
                <span className={styles.categoryTitle}>{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetNews;
