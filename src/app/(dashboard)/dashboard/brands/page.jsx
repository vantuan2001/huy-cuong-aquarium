import Image from "next/image";
import styles from "./brands.module.css";
import Search from "@/components/dashboard/search/search";
import Pagination from "@/components/dashboard/pagination/pagination";
import { fetchBrands } from "@/lib/brands/data";
import { deleteBrand } from "@/lib/brands/action";
import BrandForm from "@/components/dashboard/brandForm/brandForm";
import DeleteForm from "@/components/dashboard/deleteForm/deleteForm";

const BrandsPage = async ({ searchParams }) => {
  const { q = "", page = 1 } = searchParams || {};
  const number = 10;
  const { count, brands } = await fetchBrands(q, page, number);
  const brandsObject = JSON.parse(JSON.stringify(brands));

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Tìm kiếm tên thương hiệu..." />
        <BrandForm isUpdate={false} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>ID</td>
            <td>Tên thương hiệu</td>
            <td>Hình ảnh</td>
            <td>Hành động</td>
          </tr>
        </thead>
        <tbody>
          {brandsObject.map((brand) => (
            <tr key={brand._id}>
              <td>{brand._id}</td>
              <td>{brand.name}</td>
              <td>
                <div className={styles.product}>
                  <Image
                    src={brand.img}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                </div>
              </td>
              <td>
                <div className={styles.buttons}>
                  <BrandForm isUpdate={true} brand={brand} />
                  <DeleteForm
                    name="xoá thương hiệu"
                    deleteMethod={deleteBrand}
                    type={brand}
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

export default BrandsPage;
