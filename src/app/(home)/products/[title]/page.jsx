import styles from "./product.module.css";
import Image from "next/image";
import Comment from "@/components/home/comment/comment";
import { AiOutlineDoubleRight } from "react-icons/ai";
import Link from "next/link";
import ProductButton from "./productButton/productButton";
import Filter from "@/components/home/filter/filter";
import { getCategories } from "@/lib/categories/data";
import { fetchLimitNews } from "@/lib/news/data";
import StarRating from "@/components/home/starRating/starRating";
import Accordion from "@/components/home/accordion/accordion";
import { fetchProductTitle } from "@/lib/products/data";

export const generateMetadata = async ({ params }) => {
  const { title } = params;
  const encode = title;
  const decode = decodeURIComponent(encode);
  const post = await fetchProductTitle(decode);

  return {
    title: post.title,
    description: post.desc,
  };
};

const SingleProductPage = async ({ params }) => {
  const number = 5;
  const { title } = params;
  const encode = title;
  const decode = decodeURIComponent(encode);
  const product = await fetchProductTitle(decode);
  const categories = await getCategories();
  const news = await fetchLimitNews(number);

  const [productObject, newsObject, categoriesObject] = [
    product,
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
        <Link href="/products" className="breadcrumbs-link">
          Sản phẩm
        </Link>
        <AiOutlineDoubleRight />
        <p className="breadcrumbs-link">{productObject.title}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <Filter news={newsObject} categories={categoriesObject} />
        </div>
        <div className={styles.containerRight}>
          <div className={styles.content}>
            <div className={styles.images}>
              <Image
                src={productObject.img}
                alt=""
                width={300}
                height={300}
                className={styles.img}
              />
            </div>
            <div className={styles.text}>
              <h2>{productObject.title}</h2>
              <StarRating postId={productObject._id} />

              <span className={styles.price}>
                {productObject.stock <= 0
                  ? "Hết hàng"
                  : new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(productObject.price)}
              </span>
              <div className={styles.info}>
                <h3>Thông tin sản phẩm:</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: productObject?.info }}
                />
              </div>
              {productObject.stock <= 0 ? (
                ""
              ) : (
                <ProductButton product={productObject} />
              )}
            </div>
          </div>

          <Accordion
            description={
              <div
                className={styles.desc}
                dangerouslySetInnerHTML={{ __html: productObject?.desc }}
              />
            }
            reviews={<Comment post={productObject} />}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
