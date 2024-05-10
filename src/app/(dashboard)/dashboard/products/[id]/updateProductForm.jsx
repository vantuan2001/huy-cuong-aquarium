"use client";
import Image from "next/image";
import styles from "./singleProduct.module.css";
import { useEffect, useState } from "react";
import { updateProduct } from "@/lib/products/action";
import dynamic from "next/dynamic";
import axios from "axios";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const UpdateProductForm = ({ product }) => {
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
  const [id, setId] = useState(product._id);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [costPrice, setCostPrice] = useState(product.costPrice);
  const [sold, setSold] = useState(product.sold);
  const [views, setViews] = useState(product.views);
  const [category, setCategory] = useState(product.category);
  const [brand, setBrand] = useState(product.brand);
  const [stock, setStock] = useState(product.stock);
  const [info, setInfo] = useState(product.info);
  const [desc, setDesc] = useState(product.desc);
  return (
    <form className={styles.form} action={updateProduct}>
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
              src={file ? URL.createObjectURL(file) : product.img}
              alt=""
              fill
            />
          </label>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <label>Tên sản phẩm</label>
          <input
            type="hidden"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nhập tên sản phẩm"
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Giá vốn</label>
          <input
            type="number"
            placeholder="Nhập giá vốn"
            name="costPrice"
            required
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />
          <label>Giá bán</label>
          <input
            type="number"
            placeholder="Nhập giá bán"
            name="price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>Số lượng tồn kho</label>
          <input
            type="number"
            placeholder="Nhập số lượng tồn kho"
            name="stock"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <label>Số lượng đã bán</label>
          <input
            type="number"
            placeholder="Nhập số lượng đã bán"
            name="sold"
            required
            value={sold}
            onChange={(e) => setSold(e.target.value)}
          />
          <label>Số lượng lượt xem</label>
          <input
            type="number"
            placeholder="Nhập số lượng lượt xem"
            name="views"
            required
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />

          <label htmlFor="info" style={{ marginBottom: "10px" }}>
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
          <input
            type="hidden"
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
          <label htmlFor="info" style={{ margin: "10px 0px" }}>
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
          <input
            type="hidden"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <label style={{ marginTop: "10px" }}>Danh mục sản phẩm</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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
          <select
            name="brand"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
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

          <button type="submit">Cập nhật</button>
        </div>
      </div>
    </form>
  );
};

export default UpdateProductForm;
