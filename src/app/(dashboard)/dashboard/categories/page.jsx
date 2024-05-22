import Image from "next/image";
import styles from "./categories.module.css";
import Search from "@/components/dashboard/search/search";
import Pagination from "@/components/dashboard/pagination/pagination";
import { fetchCategories } from "@/lib/categories/data";
import { deleteCategory } from "@/lib/categories/action";
import CategoryForm from "@/components/dashboard/categoryForm/categoryForm";
import DeleteForm from "@/components/dashboard/deleteForm/deleteForm";

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
        <CategoryForm isUpdate={false} />
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
              <td>{category._id}</td>
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
                  <CategoryForm isUpdate={true} category={category} />
                  <DeleteForm
                    name="danh mục"
                    deleteMethod={deleteCategory}
                    type={category}
                  />
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
