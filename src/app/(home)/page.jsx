import styles from "./home.module.css";
import Banner from "@/components/home/banner/banner";
import Image from "next/image";
import Category from "@/components/home/categories/category";
import FeaturedProducts from "@/components/home/featured/featuredProducts";
import FeaturedNews from "@/components/home/featured/featuredNews";
import {
  fetchLimitNews,
  fetchProductsNews,
  fetchSetting,
  getCategories,
} from "@/lib/data";

const Home = async () => {
  const id = "661a894e2c902060a3e28ed9";
  const banner = await fetchSetting(id);
  const categories = await getCategories();
  const products = await fetchProductsNews();
  const limit = 10;
  const news = await fetchLimitNews(limit);

  return (
    <div className={styles.container}>
      <Banner bannerUrl={banner.imgBanner} />
      <div className="container">
        <Category categories={categories} />
        <FeaturedProducts title="Hàng mới về" products={products} />
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
