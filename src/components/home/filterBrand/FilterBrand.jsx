"use client";
import styles from "./filterBrand.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const FilterBrand = ({ brands }) => {
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
    <div className={styles.filterItem}>
      <h3>Thương hiệu</h3>
      <div className="box">
        <div className={styles.inputItem}>
          <label htmlFor="all-brand">
            Tất cả
            <input
              type="radio"
              id="all-brand"
              value=""
              name="brand"
              onClick={handleDelete}
              // checked="true"
            />
          </label>
        </div>

        {brands.map((brand) => (
          <div className={styles.inputItem} key={brand._id}>
            <label htmlFor={brand.name}>
              {brand.name}
              <input
                type="radio"
                id={brand.name}
                value={brand.name}
                name="brand"
                onClick={handleFilter}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBrand;
