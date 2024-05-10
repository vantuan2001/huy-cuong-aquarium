"use client";

import { addProduct } from "@/lib/products/action";
import styles from "./addProduct.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://huy-cuong-aquarium.vercel.app/api/category"
        );
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();

    const fetchBrands = async () => {
      try {
        const res = await axios.get(
          "https://huy-cuong-aquarium.vercel.app/api/brands"
        );
        setBrands(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBrands();
  }, []);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className={styles.container}>
      <form className={styles.form} action={addProduct}>
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
                fill
              />
            </label>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Nhập tên sản phẩm"
              name="title"
              required
              // onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="number"
              placeholder="Nhập giá vốn"
              name="costPrice"
              required
              // onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Nhập giá bán"
              name="price"
              required
              // onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Nhập Số lượng tồn kho"
              name="stock"
              required
              // onChange={(e) => setStock(e.target.value)}
            />
            <input
              type="text"
              name="info"
              style={{ display: "none" }}
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
            <input
              type="text"
              name="desc"
              style={{ display: "none" }}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <label
              htmlFor="info"
              style={{ fontSize: "14px", marginBottom: "10px" }}
            >
              Thông tin sản phẩm
            </label>
            <ReactQuill
              className="editor"
              theme="snow"
              name="info"
              id="info"
              value={info}
              onChange={setInfo}
              style={{ minHeight: "280px" }}
            />
            <label
              htmlFor="info"
              style={{ fontSize: "14px", marginBottom: "10px" }}
            >
              Mô tả sản phẩm
            </label>
            <ReactQuill
              className="editor"
              theme="snow"
              name="desc"
              value={desc}
              onChange={setDesc}
              style={{ minHeight: "300px" }}
            />
            <select name="category" id="category">
              <option value="">Chọn danh mục</option>
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
            <label>Thương hiệu sản phẩm</label>
            <select name="brand" id="brand">
              <option value="">Chọn thương hiệu</option>
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
            <button type="submit">
              {/* <button type="submit" onClick={handleCreate}> */}
              Thêm mới
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
