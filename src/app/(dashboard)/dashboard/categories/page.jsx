import Image from "next/image";
import styles from "./categories.module.css";
import Search from "@/components/dashboard/search/search";
import Pagination from "@/components/dashboard/pagination/pagination";
import { fetchCategories } from "@/lib/data";
import { deleteCategory } from "@/lib/action";
import AddCategory from "./components/addCategory";
import UpdateCategory from "./components/updateCategory";

const CategoriesPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const number = 10;
  const { count, categories } = await fetchCategories(q, page, number);
  const categoriesObject = JSON.parse(JSON.stringify(categories));

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Tìm kiếm tên danh mục..." />
        <AddCategory />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>ID</td>
            <td>Tên danh mục</td>
            <td>Hình ảnh</td>
            <td>Hành động</td>
          </tr>
        </thead>
        <tbody>
          {categoriesObject.map((category) => (
            <tr key={category._id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <div className={styles.product}>
                  <Image
                    src={category.img_logo}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                </div>
              </td>

              <td>
                <div className={styles.buttons}>
                  <UpdateCategory category={categoriesObject} />
                  <form action={deleteCategory}>
                    <input type="hidden" name="id" value={category.id} />
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

export default CategoriesPage;
