"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import styles from "./component.module.css";

const SelectStatus = () => {
  const filterParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleFilter = useDebouncedCallback((e) => {
    const params = new URLSearchParams(filterParams);

    params.set("page", 1);

    if (e.target.value) {
      params.set("status", e.target.value);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params}`);
  }, 300);
  const handleDelete = useDebouncedCallback(() => {
    const params = new URLSearchParams(filterParams);

    params.set("page", 1);

    params.delete("status");

    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <select
      name="status"
      id="status"
      onClick={handleFilter}
      className={styles.select}
    >
      <option value="" onClick={handleDelete} className={styles.option}>
        Trạng thái đơn hàng
      </option>
      <option value="0" className={styles.option}>
        Đã huỷ
      </option>
      <option value="1" className={styles.option}>
        Chờ xác nhận
      </option>
      <option value="2" className={styles.option}>
        Xác nhận đơn hàng
      </option>
      <option value="3" className={styles.option}>
        Đang giao cho ĐVVC
      </option>
      <option value="4" className={styles.option}>
        Đang giao hàng
      </option>
      <option value="5" className={styles.option}>
        Đã nhận hàng
      </option>
    </select>
  );
};

export default SelectStatus;
