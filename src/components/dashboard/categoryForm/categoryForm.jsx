"use client";

import { useState } from "react";
import styles from "./categoryForm.module.css";
import { BsSave, BsXLg } from "react-icons/bs";
import Image from "next/image";
import { addCategory, updateCategory } from "@/lib/categories/action";

const CategoryForm = ({ category, isUpdate }) => {
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <>
      <button
        className={
          isUpdate ? `${styles.button} ${styles.view}` : styles.addButton
        }
        onClick={() => setOpenAdd(true)}
      >
        {isUpdate ? "Xem" : "Thêm mới"}
      </button>

      <FormCategory
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        category={category}
        isUpdate={isUpdate}
        setOpenAdd={setOpenAdd}
      />
    </>
  );
};

export default CategoryForm;

const FormCategory = ({ open, onClose, setOpenAdd, category, isUpdate }) => {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(category ? category._id : "");
  const [name, setName] = useState(category ? category.name : "");

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
        await updateCategory(formData);
        setOpenAdd(false);
      } else {
        await addCategory(formData);
        setOpenAdd(false);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
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
        style={{ width: "auto" }}
      >
        <div className={styles.title}>
          <span> {isUpdate ? "Cập nhật danh mục" : "Thêm danh mục"}</span>
          <div className={styles.close} onClick={onClose}>
            <BsXLg />
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
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
                {category ? (
                  <Image
                    src={file ? URL.createObjectURL(file) : category?.img_logo}
                    alt=""
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    src={file ? URL.createObjectURL(file) : "/no-image.png"}
                    alt=""
                    width={100}
                    height={100}
                  />
                )}
              </label>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.input}>
              <input
                type="hidden"
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <label>Tên danh mục</label>
              <input
                type="text"
                name="name"
                placeholder="Tên danh mục"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.buttons} style={{ justifyContent: "center" }}>
            <button className={styles.btnAdd}>
              <BsSave className="button-add-icon" />
              <span> {isUpdate ? "Cập nhật danh mục" : "Thêm danh mục"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
