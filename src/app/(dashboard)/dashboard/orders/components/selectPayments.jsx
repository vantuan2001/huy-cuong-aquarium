"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import styles from "./component.module.css";

const SelectPayments = () => {
  const filterParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleFilter = useDebouncedCallback((e) => {
    const params = new URLSearchParams(filterParams);

    params.set("page", 1);

    if (e.target.value) {
      params.set("payments", e.target.value);
    } else {
      params.delete("payments");
    }
    replace(`${pathname}?${params}`);
  }, 300);
  const handleDelete = useDebouncedCallback(() => {
    const params = new URLSearchParams(filterParams);

    params.set("page", 1);

    params.delete("payments");

    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <select
      name="payments"
      id="payments"
      onClick={handleFilter}
      className={styles.select}
    >
      <option value="" onClick={handleDelete} className={styles.option}>
        Hình thức thanh toán
      </option>
      <option value="0" className={styles.option}>
        Thanh toán khi nhận hàng
      </option>
      <option value="1" className={styles.option}>
        Thanh toán VNPAY
      </option>
    </select>
  );
};

export default SelectPayments;
