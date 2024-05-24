"use client";

import { useState } from "react";
import styles from "./categoryForm.module.css";
import { BsPencilSquare, BsSave, BsXLg } from "react-icons/bs";
import Image from "next/image";
import { addCategory, updateCategory } from "@/lib/categories/action";
import useSwal from "@/components/toast/useSwal";

const CategoryForm = ({ category, isUpdate }) => {
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <>
      <button
        className={isUpdate ? styles.buttonUpdate : styles.buttonAdd}
        onClick={() => setOpenAdd(true)}
      >
        {isUpdate ? <BsPencilSquare /> : "Thêm mới"}
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
        await updateCategory(formData);
        setOpenAdd(false);
        ToastSuccess({ title: "Cập nhật danh mục" });
      } else {
        await addCategory(formData);
        setOpenAdd(false);
        ToastSuccess({ title: "Thêm danh mục" });
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
          <span> {isUpdate ? "Cập nhật danh mục" : "Thêm danh mục"}</span>
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
              {category ? (
                <Image
                  src={file ? URL.createObjectURL(file) : category?.img_logo}
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
                Tên danh mục
              </label>
            </div>
          </div>

          <button className={styles.buttonForm}>
            <BsSave />
            <span> {isUpdate ? "Cập nhật danh mục" : "Thêm danh mục"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
