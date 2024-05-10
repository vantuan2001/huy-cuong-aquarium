import Image from "next/image";
import Link from "next/link";
import styles from "./products.module.css";
import Search from "@/components/dashboard/search/search";
import Pagination from "@/components/dashboard/pagination/pagination";
import { deleteProduct } from "@/lib/products/action";
import { fetchProducts } from "@/lib/products/data";
import SelectCategory from "./components/selectCategory";
import { getCategories } from "@/lib/categories/data";
import SelectBrand from "./components/selectBrand";
import { getBrands } from "@/lib/brands/data";

const ProductsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const b = searchParams?.b || "";
  const c = searchParams?.c || "";
  const page = searchParams?.page || 1;
  const number = 10;
  const { count, products } = await fetchProducts(q, b, c, page, number);
  const categories = await getCategories();
  const brands = await getBrands();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.filter}>
          <Search placeholder="Tìm kiếm sản phẩm..." />
          <SelectCategory categories={categories} />
          <SelectBrand brands={brands} />
        </div>
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Thêm mới</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Tên sản phẩm</td>
            <td>Danh mục</td>
            <td className="txt-end">Giá tiền</td>
            <td className="txt-center">Thương hiệu</td>
            <td className="txt-center">Đã bán</td>
            <td className="txt-center">Tồn kho</td>
            <td>Hành động</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={product.img}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {product.title}
                </div>
              </td>
              <td className="txt-center">{product.category}</td>
              <td className="txt-end">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </td>
              <td className="txt-center">{product.brand}</td>
              <td className="txt-center">{product.sold}</td>
              <td className="txt-center">{product.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${product.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Xem
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Xoá
                    </button>
                  </form>
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

export default ProductsPage;
