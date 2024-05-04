import Image from "next/image";
import styles from "./singleNews.module.css";
import Link from "next/link";
import { AiOutlineDoubleRight } from "react-icons/ai";
import Comment from "@/components/home/comment/comment";
import moment from "moment";
import Filter from "@/components/home/filter/filter";
import { fetchLimitNews, getCategories } from "@/lib/data";

// LẤY DỮ LIỆU BẰNG API
const getData = async (title) => {
  const res = await fetch(
    `https://huy-cuong-aquarium.vercel.app/api/news/${title}`,
    {
      next: { revalidate: 3600 },
    }
  );

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
  const postNews = await getData(title);
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
        <Link href="/news" className="breadcrumbs-link">
          Tin tức
        </Link>
        <AiOutlineDoubleRight />
        <p className="breadcrumbs-link">{postNews.title}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <Filter news={news} categories={categories} />
        </div>
        <div className={styles.right}>
          <h3 className={styles.title}>{postNews.title}</h3>
          <span className={styles.date}>
            {moment(postNews.createdAt).format("DD/MM/YYYY")}
          </span>
          <Image
            src={postNews.img}
            alt=""
            width={450}
            height={450}
            className={styles.img}
          />
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: postNews?.desc }}
          />
          <Comment post={postNews} />
        </div>
      </div>
    </div>
  );
};

export default SingleNewsPage;
