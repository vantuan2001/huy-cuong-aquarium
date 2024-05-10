"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import styles from "./component.module.css";

const SelectCategory = ({ categories }) => {
  const filterParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleFilter = useDebouncedCallback((e) => {
    const params = new URLSearchParams(filterParams);

    params.set("page", 1);

    if (e.target.value) {
      params.set("c", e.target.value);
    } else {
      params.delete("c");
    }
    replace(`${pathname}?${params}`);
  }, 300);
  const handleDelete = useDebouncedCallback(() => {
    const params = new URLSearchParams(filterParams);

    params.set("page", 1);

    params.delete("c");

    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <select
      name="category"
      id="category"
      onClick={handleFilter}
      className={styles.select}
    >
      <option value="" onClick={handleDelete} className={styles.option}>
        Tất cả danh mục
      </option>
      {categories.map((category) => (
        <option
          id={category.name}
          value={category.name}
          name="category"
          key={category._id}
          className={styles.option}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCategory;
