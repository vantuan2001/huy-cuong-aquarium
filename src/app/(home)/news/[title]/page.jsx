import Image from "next/image";
import styles from "./singleNews.module.css";
import Link from "next/link";
import { AiOutlineDoubleRight } from "react-icons/ai";
import Comment from "@/components/home/comment/comment";
import moment from "moment";
import Filter from "@/components/home/filter/filter";
import { getCategories } from "@/lib/categories/data";
import { fetchLimitNews, fetchNewsTitle } from "@/lib/news/data";

export const generateMetadata = async ({ params }) => {
  const { title } = params;
  const encode = title;
  const decode = decodeURIComponent(encode);
  const post = await fetchNewsTitle(decode);

  return {
    title: post.title,
    description: post.desc,
  };
};

const SingleNewsPage = async ({ params }) => {
  const { title } = params;
  const number = 5;
  const encode = title;
  const decode = decodeURIComponent(encode);
  const postNews = await fetchNewsTitle(decode);
  const categories = await getCategories();
  const news = await fetchLimitNews(number);
  const [postNewsObject, newsObject, categoriesObject] = [
    postNews,
    news,
    categories,
  ].map((item) => JSON.parse(JSON.stringify(item)));

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
        <p className="breadcrumbs-link">{postNewsObject.title}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <Filter news={newsObject} categories={categoriesObject} />
        </div>
        <div className={styles.right}>
          <h3 className={styles.title}>{postNewsObject.title}</h3>
          <span className={styles.date}>
            {moment(postNewsObject?.createdAt).format("HH:mm DD/MM/YYYY")}
          </span>
          <Image
            src={postNewsObject.img}
            alt=""
            width={450}
            height={450}
            className={styles.img}
          />
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: postNewsObject?.desc }}
          />
          <Comment post={postNewsObject} />
        </div>
      </div>
    </div>
  );
};

export default SingleNewsPage;
