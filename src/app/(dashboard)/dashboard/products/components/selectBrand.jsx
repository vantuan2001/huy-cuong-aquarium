"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import styles from "./component.module.css";

const SelectBrand = ({ brands }) => {
  const filterParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleFilter = useDebouncedCallback((e) => {
    const params = new URLSearchParams(filterParams);

    params.set("page", 1);

    if (e.target.value) {
      params.set("b", e.target.value);
    } else {
      params.delete("b");
    }
    replace(`${pathname}?${params}`);
  }, 300);
  const handleDelete = useDebouncedCallback(() => {
    const params = new URLSearchParams(filterParams);

    params.set("page", 1);

    params.delete("b");

    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <select
      name="brand"
      id="brand"
      onClick={handleFilter}
      className={styles.select}
    >
      <option value="" onClick={handleDelete} className={styles.option}>
        Tất cả thương hiệu
      </option>
      {brands.map((brand) => (
        <option
          id={brand.name}
          value={brand.name}
          name="brand"
          key={brand._id}
          className={styles.option}
        >
          {brand.name}
        </option>
      ))}
    </select>
  );
};

export default SelectBrand;
