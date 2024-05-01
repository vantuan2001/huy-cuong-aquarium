import Image from "next/image";
import styles from "./singleNews.module.css";
import Link from "next/link";
import { AiOutlineDoubleRight } from "react-icons/ai";
import WidgetNews from "@/components/home/widget/widgetNews";
import Comment from "@/components/home/comment/comment";
import moment from "moment";

// LẤY DỮ LIỆU BẰNG API
const getData = async (title) => {
  const res = await fetch(`http://localhost:3000/api/news/${title}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Đã xảy ra lỗi");
  }

  return res.json();
};

export const generateMetadata = async ({ params }) => {
  const { title } = params;

  const post = await getData(title);

  return {
    title: post.title,
    description: post.desc,
  };
};

const SingleNewsPage = async ({ params }) => {
  const { title } = params;
  const news = await getData(title);
  return (
    <div className="container">
      <div className="breadcrumbs">
        <Link href="/" className="breadcrumbs-link">
          Trang chủ
        </Link>
        <AiOutlineDoubleRight />
        <Link href="/news" className="breadcrumbs-link">
          Tin tức
        </Link>
        <AiOutlineDoubleRight />
        <p className="breadcrumbs-link">{news.title}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <WidgetNews />
        </div>
        <div className={styles.right}>
          <h3 className={styles.title}>{news.title}</h3>
          <span className={styles.date}>
            {moment(news.createdAt).format("DD/MM/YYYY")}
          </span>
          <Image
            src={news.img}
            alt=""
            width={450}
            height={450}
            className={styles.img}
          />
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: news?.desc }}
          />
          <Comment post={news} />
        </div>
      </div>
    </div>
  );
};

export default SingleNewsPage;
