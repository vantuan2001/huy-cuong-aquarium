import Image from "next/image";
import Link from "next/link";
import styles from "./news.module.css";
import Search from "@/components/dashboard/search/search";
import Pagination from "@/components/dashboard/pagination/pagination";
import { fetchNews } from "@/lib/news/data";
import { deleteNews } from "@/lib/news/action";
import { BsPencilSquare } from "react-icons/bs";
import DeleteForm from "@/components/dashboard/deleteForm/deleteForm";

const NewsPage = async ({ searchParams }) => {
  const { q = "", page = 1 } = searchParams || {};
  const number = 10;
  const { count, news } = await fetchNews(q, page, number);
  const newsObject = JSON.parse(JSON.stringify(news));
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Tìm kiếm tên tin tức..." />
        <Link href="/dashboard/news/add">
          <button className={styles.addButton}>Thêm mới</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Tên tin tức</td>
            <td>Nội dung</td>
            <td>Hành động</td>
          </tr>
        </thead>
        <tbody>
          {newsObject.map((news) => (
            <tr key={news._id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={news.img}
                    alt=""
                    width={100}
                    height={100}
                    className={styles.productImage}
                  />
                  {news.title}
                </div>
              </td>
              <td className={styles.desc}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: news?.desc.toString().slice(0, 250),
                  }}
                />
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/news/${news._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      <BsPencilSquare />
                    </button>
                  </Link>
                  <DeleteForm
                    name="xoá xoá tin tức"
                    deleteMethod={deleteNews}
                    type={news}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default NewsPage;
