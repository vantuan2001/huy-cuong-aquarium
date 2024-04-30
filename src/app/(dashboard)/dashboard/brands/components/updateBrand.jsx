"use client";

import { useState } from "react";
import styles from "./formBrand.module.css";
import { BsSave, BsXLg } from "react-icons/bs";

import Image from "next/image";
import { updateBrand } from "@/lib/action";

const UpdateBrand = ({ brand }) => {
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <>
      <button
        className={`${styles.button} ${styles.view}`}
        onClick={() => setOpenAdd(true)}
      >
        Xem
      </button>

      <UpdateFormBrand
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        brand={brand}
      />
    </>
  );
};

export default UpdateBrand;

const UpdateFormBrand = ({ open, onClose, brand }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(brand.name);
  if (!open) return null;
  return (
    <div className={styles.container}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.wapper}
        style={{ width: "auto" }}
      >
        <div className={styles.title}>
          <span>Thêm thương hiệu</span>
          <div className={styles.close} onClick={onClose}>
            <BsXLg />
          </div>
        </div>
        <form className={styles.form} action={updateBrand}>
          <div className={styles.infoContainer}>
            <div className={styles.imgContainer}>
              <label htmlFor="img">
                <input
                  type="file"
                  id="img"
                  name="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <Image
                  src={file ? URL.createObjectURL(file) : brand.img}
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.input}>
              <input type="hidden" name="id" value={brand._id} />
              <label>Tên thương hiệu</label>
              <input
                type="text"
                name="name"
                placeholder="Tên thương hiệu"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.buttons} style={{ justifyContent: "center" }}>
            <button className={styles.btnAdd}>
              <BsSave className="button-add-icon" />
              <span>Cập nhật</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
