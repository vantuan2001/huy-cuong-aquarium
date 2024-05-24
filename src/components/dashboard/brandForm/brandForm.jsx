"use client";

import { useState } from "react";
import styles from "./brandForm.module.css";
import { BsPencilSquare, BsSave, BsXLg } from "react-icons/bs";
import Image from "next/image";
import { addBrand, updateBrand } from "@/lib/brands/action";
import useSwal from "@/components/toast/useSwal";

const BrandForm = ({ brand, isUpdate }) => {
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <>
      <button
        className={isUpdate ? styles.buttonUpdate : styles.buttonAdd}
        onClick={() => setOpenAdd(true)}
      >
        {isUpdate ? <BsPencilSquare /> : "Thêm mới"}
      </button>

      <FormBrand
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        brand={brand}
        isUpdate={isUpdate}
        setOpenAdd={setOpenAdd}
      />
    </>
  );
};

export default BrandForm;

const FormBrand = ({ open, onClose, setOpenAdd, brand, isUpdate }) => {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(brand ? brand._id : "");
  const [name, setName] = useState(brand ? brand.name : "");
  const { ToastSuccess } = useSwal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      if (file) {
        formData.append("file", file);
      }

      if (isUpdate) {
        await updateBrand(formData);
        setOpenAdd(false);
        ToastSuccess({ title: "Cập nhật thương hiệu" });
      } else {
        await addBrand(formData);
        setOpenAdd(false);
        ToastSuccess({ title: "Thêm thương hiệu" });
      }
    } catch (err) {
      console.error("Lỗi khi gửi biểu mẫu:", err);
    }
  };

  if (!open) return null;
  return (
    <div className={styles.container}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.wrapper}
      >
        <div className={styles.title}>
          <span> {isUpdate ? "Cập nhật thương hiệu" : "Thêm thương hiệu"}</span>
          <div className={styles.close} onClick={onClose}>
            <BsXLg />
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.imgContainer}>
            <label htmlFor="img">
              <input
                type="file"
                id="img"
                name="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              {brand ? (
                <Image
                  src={file ? URL.createObjectURL(file) : brand?.img}
                  alt=""
                  className={styles.img}
                  fill
                />
              ) : (
                <Image
                  src={file ? URL.createObjectURL(file) : "/no-image.png"}
                  alt=""
                  className={styles.img}
                  fill
                />
              )}
            </label>
          </div>

          <div className={styles.inputContainer}>
            <input
              type="hidden"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <div className="inputItem w100">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input"
              />
              <label htmlFor="address" className="label">
                Tên thương hiệu
              </label>
            </div>
          </div>

          <button className={styles.buttonForm}>
            <BsSave />
            <span>
              {isUpdate ? "Cập nhật thương hiệu" : "Thêm thương hiệu"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
