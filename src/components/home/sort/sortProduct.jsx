"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import styles from "./sortProduct.module.css";
const SortProduct = () => {
  const filterParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleFilter = useDebouncedCallback((e) => {
    const params = new URLSearchParams(filterParams);

    params.set("page", 1);

    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className={styles.sort}>
      <span>Sắp xếp theo</span>
      <select onClick={handleFilter}>
        <option value="">Mặc định</option>
        <option value="newest">Mới nhất</option>
        <option value="best-selling">Bán chạy nhất</option>
        <option value="price-asc">Thứ tự theo giá: thấp đến cao</option>
        <option value="price-desc">Thứ tự theo giá: cao xuống thấp</option>
      </select>
    </div>
  );
};

export default SortProduct;
