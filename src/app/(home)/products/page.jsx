import styles from "./products.module.css";
import ProductCard from "@/components/home/cardProduct/productCard";
import Pagination from "@/components/dashboard/pagination/pagination";
import Search from "@/components/home/search/search";
import Link from "next/link";
import { AiOutlineDoubleRight } from "react-icons/ai";
import Filter from "@/components/home/filter/filter";
import { fetchProducts } from "@/lib/products/data";
import { getCategories } from "@/lib/categories/data";
import { getBrands } from "@/lib/brands/data";
import SortProduct from "@/components/home/sort/sortProduct";

export const generateMetadata = ({ searchParams }) => {
  return {
    title: !searchParams?.c ? "Sản phẩm" : searchParams?.c,
  };
};

const Products = async ({ searchParams }) => {
  const { q = "", b = "", c = "", sort = "", page = 1 } = searchParams || {};
  const number = 16;

  const { count, products } = await fetchProducts(q, b, c, page, number, sort);
  const categories = await getCategories();
  const brands = await getBrands();
  const [productsObject, categoriesObject, brandsObject] = [
    products,
    categories,
    brands,
  ].map((item) => JSON.parse(JSON.stringify(item)));

  return (
    <div className="container">
      <div className="breadcrumbs">
        {!searchParams?.q ? (
          !searchParams?.c ? (
            <>
              <Link href="/" className="breadcrumbs-link">
                Trang chủ
              </Link>
              <AiOutlineDoubleRight />
              <p className="breadcrumbs-link">Sản phẩm</p>
            </>
          ) : (
            <>
              <Link href="/" className="breadcrumbs-link">
                Trang chủ
              </Link>
              <AiOutlineDoubleRight />
              <Link href="/products" className="breadcrumbs-link">
                Sản phẩm
              </Link>
              <AiOutlineDoubleRight />
              <p className="breadcrumbs-link">{searchParams?.c}</p>
            </>
          )
        ) : (
          <>
            <Link href="/" className="breadcrumbs-link">
              Trang chủ
            </Link>
            <AiOutlineDoubleRight />
            <p className="breadcrumbs-link"> Kết quả cho từ khoá {q}</p>
          </>
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.bottom}>
          <Filter
            categories={categoriesObject}
            brands={brandsObject}
            c={c}
            b={b}
          />
          <div className={styles.right}>
            <div className={styles.topProduct}>
              <div className={styles.search}>
                <Search placeholder="Tìm kiếm tên sản phẩm" />
              </div>
              <SortProduct />
            </div>

            <div className={styles.bottomProduct}>
              <div className={styles.list}>
                {productsObject.length === 0 ? (
                  <div className={styles.noProduct}>Không có sản phẩm nào.</div>
                ) : (
                  productsObject.map((product) => (
                    <ProductCard
                      product={product}
                      key={product._id.toString()}
                    />
                  ))
                )}
              </div>
              <Pagination count={count} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
