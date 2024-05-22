import Image from "next/image";
import Link from "next/link";
import styles from "./products.module.css";
import Search from "@/components/dashboard/search/search";
import Pagination from "@/components/dashboard/pagination/pagination";
import { deleteProduct } from "@/lib/products/action";
import { fetchProducts, getProducts } from "@/lib/products/data";
import SelectCategory from "./components/selectCategory";
import { getCategories } from "@/lib/categories/data";
import SelectBrand from "./components/selectBrand";
import { getBrands } from "@/lib/brands/data";
import SortProduct from "@/components/home/sort/sortProduct";

const ProductsPage = async ({ searchParams }) => {
  const { q = "", b = "", c = "", sort = "", page = 1 } = searchParams || {};
  const number = 10;
  const { count, products } = await fetchProducts(q, b, c, page, number, sort);

  const categories = await getCategories();
  const brands = await getBrands();
  const totalProducts = await getProducts();
  const productsObject = JSON.parse(JSON.stringify(products));
  const categoriesObject = JSON.parse(JSON.stringify(categories));
  const brandsObject = JSON.parse(JSON.stringify(brands));
  const totalSold = totalProducts.reduce((total, item) => total + item.sold, 0);
  const stock = totalProducts.reduce((total, item) => total + item.stock, 0);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.filter}>
          <Search placeholder="Tìm kiếm sản phẩm..." />
          <SelectCategory categories={categoriesObject} />
          <SelectBrand brands={brandsObject} />
          <SortProduct />
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
            <td className="txt-center">Giá tiền</td>
            <td className="txt-center">Thương hiệu</td>
            <td className="txt-center">Đã bán</td>
            <td className="txt-center">Tồn kho</td>
            <td>Hành động</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tổng {totalProducts.length} sản phẩm</td>
            <td className="txt-center"></td>
            <td className="txt-end"></td>
            <td className="txt-center"></td>
            <td className="txt-center">{totalSold}</td>
            <td className="txt-center">{stock}</td>
            <td></td>
          </tr>
          {productsObject.map((product) => (
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
                  <Link href={`/dashboard/products/${product._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Xem
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product._id} />
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
