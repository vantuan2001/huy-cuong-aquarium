import styles from "./product.module.css";
import Image from "next/image";
import Comment from "@/components/home/comment/comment";
import { AiOutlineDoubleRight } from "react-icons/ai";
import Link from "next/link";
import ProductButton from "./productButton/productButton";
import Filter from "@/components/home/filter/filter";
import { getCategories } from "@/lib/categories/data";
import { fetchLimitNews } from "@/lib/news/data";

const getData = async (title) => {
  const res = await fetch(`http://localhost:3000/api/products/${title}`, {
    next: { revalidate: 1 },
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

const SingleProductPage = async ({ params }) => {
  const number = 5;
  const { title } = params;
  const product = await getData(title);
  const categories = await getCategories();
  const news = await fetchLimitNews(number);
  const categoriesObject = JSON.parse(JSON.stringify(categories));
  const newsObject = JSON.parse(JSON.stringify(news));
  return (
    <div className="container">
      <div className="breadcrumbs">
        <Link href="/" className="breadcrumbs-link">
          Trang chủ
        </Link>
        <AiOutlineDoubleRight />
        <Link href="/products" className="breadcrumbs-link">
          Sản phẩm
        </Link>
        <AiOutlineDoubleRight />
        <p className="breadcrumbs-link">{product.title}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          {/* <Filter categories={categoriesObject} /> */}
          <Filter news={newsObject} categories={categoriesObject} />
        </div>
        <div className={styles.containerRight}>
          <div className={styles.content}>
            <div className={styles.images}>
              <Image
                src={product.img}
                alt=""
                width={300}
                height={300}
                className={styles.img}
              />
            </div>
            <div className={styles.text}>
              <h2>{product.title}</h2>
              <div>
                {[...Array(5)].map((i) => {
                  return (
                    <span className={styles.star} key={i}>
                      &#9733;
                    </span>
                  );
                })}
              </div>

              <span className={styles.price}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </span>
              <div className={styles.info}>
                <h3>Thông tin sản phẩm:</h3>
                <div dangerouslySetInnerHTML={{ __html: product?.info }} />
              </div>
              <ProductButton product={product} />
            </div>
          </div>

          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: product?.desc }}
          />

          <Comment post={product} />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
