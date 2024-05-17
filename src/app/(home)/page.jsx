import styles from "./home.module.css";
import Banner from "@/components/home/banner/banner";
import Image from "next/image";
import Category from "@/components/home/categories/category";
import FeaturedProducts from "@/components/home/featured/featuredProducts";
import FeaturedNews from "@/components/home/featured/featuredNews";
import { fetchSetting } from "@/lib/settings/data";
import { getCategories } from "@/lib/categories/data";
import { getViewedProduct } from "@/lib/products/data";
import { fetchLimitNews } from "@/lib/news/data";

const Home = async () => {
  const id = "661a894e2c902060a3e28ed9";
  const banner = await fetchSetting(id);
  const categories = await getCategories();
  const categoriesObject = JSON.parse(JSON.stringify(categories));
  const number = 10;
  const products = await getViewedProduct(number);
  const productsObject = JSON.parse(JSON.stringify(products));
  const news = await fetchLimitNews(number);

  return (
    <div className={styles.container}>
      <Banner bannerUrl={banner.imgBanner} />
      <div className="container">
        <Category categories={categoriesObject} />
        <FeaturedProducts title="Sản phẩm nổi bật" products={productsObject} />
        <div className={styles.adv}>
          <Image
            src="/mid_banner_image_1.png"
            alt=""
            fill
            className={styles.advImage}
          />
          <Image
            src="/mid_banner_image_2.webp"
            alt=""
            fill
            className={styles.advImage}
          />
        </div>
        <FeaturedNews news={news} />
        <div className={styles.slider}>
          <Image src="/2.jpg" alt="" fill className={styles.sliderImage} />
        </div>
      </div>
    </div>
  );
};

export default Home;
