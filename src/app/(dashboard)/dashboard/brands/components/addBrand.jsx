"use client";

import { useState } from "react";
import styles from "./formBrand.module.css";
import { BsSave, BsXLg } from "react-icons/bs";

import Image from "next/image";
import { addBrand } from "@/lib/brands/action";

const AddBrand = () => {
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <>
      <button className={styles.addButton} onClick={() => setOpenAdd(true)}>
        Thêm mới
      </button>
      <AddFormBrand open={openAdd} onClose={() => setOpenAdd(false)} />
    </>
  );
};

export default AddBrand;

const AddFormBrand = ({ open, onClose }) => {
  const [file, setFile] = useState(null);
  if (!open) return null;
  return (
    <div className={styles.container}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.wrapper}
        style={{ width: "auto" }}
      >
        <div className={styles.title}>
          <span>Thêm thương hiệu</span>
          <div className={styles.close} onClick={onClose}>
            <BsXLg />
          </div>
        </div>
        <form className={styles.form} action={addBrand}>
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
                  src={file ? URL.createObjectURL(file) : "/no-image.png"}
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.input}>
              <label>Tên thương hiệu</label>
              <input type="text" name="name" placeholder="Tên thương hiệu" />
            </div>
          </div>
          <div className={styles.buttons} style={{ justifyContent: "center" }}>
            <button className={styles.btnAdd}>
              <BsSave className="button-add-icon" />
              <span>Thêm mới</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
