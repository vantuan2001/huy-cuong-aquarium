import styles from "./products.module.css";
import ProductCard from "@/components/home/cardProduct/productCard";
import { fetchProducts } from "@/lib/data";
import Pagination from "@/components/dashboard/pagination/pagination";
import Search from "@/components/home/search/search";
import ProductLefttBar from "@/components/home/productLefttBar/productLefttBar";
import Link from "next/link";
import { AiOutlineDoubleRight } from "react-icons/ai";

const fetchCategories = async () => {
  const res = await fetch("http://localhost:3000/api/category", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Đã xảy ra lỗi");
  }
  return res.json();
};

const fetchBrands = async () => {
  const res = await fetch("http://localhost:3000/api/brands", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Đã xảy ra lỗi");
  }
  return res.json();
};

const Products = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const b = searchParams?.b || "";
  const c = searchParams?.c || "";
  const page = searchParams?.page || 1;
  const number = 16;
  const { count, products } = await fetchProducts(q, b, c, page, number);
  const productsObject = JSON.parse(JSON.stringify(products));
  const categories = await fetchCategories();
  const brands = await fetchBrands();
  return (
    <div className="container">
      <div className="breadcrumbs">
        <Link href="/" className="breadcrumbs-link">
          Trang chủ
        </Link>
        <AiOutlineDoubleRight />
        <p className="breadcrumbs-link">Sản phẩm</p>
      </div>
      <div className={styles.container}>
        <div className={styles.bottom}>
          <ProductLefttBar categories={categories} brands={brands} />

          <div className={styles.right}>
            <div className={styles.topProduct}>
              <div className={styles.search}>
                <Search placeholder="Tìm kiếm tên sản phẩm" />
              </div>
              <div className={styles.sort}>
                <span>Sắp xếp theo</span>
                <select name="" id="">
                  <option value="">Mặc định</option>
                  <option value="">Mới nhất</option>
                  <option value="">Thứ tự theo giá: thấp đến cao </option>
                  <option value="">Thứ tự theo giá: cao xuống thấp</option>
                </select>
              </div>
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
