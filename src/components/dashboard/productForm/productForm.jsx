"use client";
import Image from "next/image";
import styles from "./productForm.module.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { addProduct, updateProduct } from "@/lib/products/action";

// Dynamic import of ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ProductForm = ({ product, isUpdate }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [file, setFile] = useState(null);
  const [id, setId] = useState(product ? product._id : "");
  const [title, setTitle] = useState(product ? product.title : "");
  const [price, setPrice] = useState(product ? product.price : 0);
  const [costPrice, setCostPrice] = useState(product ? product.costPrice : 0);
  const [sold, setSold] = useState(product ? product.sold : 0);
  const [views, setViews] = useState(product ? product.views : 0);
  const [category, setCategory] = useState(product ? product.category : "");
  const [brand, setBrand] = useState(product ? product.brand : "");
  const [stock, setStock] = useState(product ? product.stock : 0);
  const [info, setInfo] = useState(product ? product.info : "");
  const [desc, setDesc] = useState(product ? product.desc : "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resBrands = await axios.get("/api/brands");
        const resCategories = await axios.get("/api/category");
        setBrands(resBrands.data);
        setCategories(resCategories.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchData();
  }, []);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["link", "image", "video"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    ["clean"], // remove formatting button
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("costPrice", costPrice);
      formData.append("sold", sold);
      formData.append("views", views);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("stock", stock);
      formData.append("info", info);
      formData.append("desc", desc);
      if (file) {
        formData.append("file", file);
      }

      if (isUpdate) {
        await updateProduct(formData);
      } else {
        await addProduct(formData);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <div className="inputContainer">
        <div className="formItem w50">
          <label>Tên sản phẩm</label>
          <input
            type="text"
            placeholder="Nhập tên sản phẩm"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="formItem w50">
          <label>Số lượng</label>
          <input
            type="number"
            placeholder="Nhập số lượng tồn kho"
            name="stock"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="formItem w50">
          <label>Giá vốn</label>
          <input
            type="number"
            placeholder="Nhập giá vốn"
            name="costPrice"
            required
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />
        </div>
        <div className="formItem w50">
          <label>Giá bán</label>
          <input
            type="number"
            placeholder="Nhập giá bán"
            name="price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {isUpdate && (
          <>
            <div className="formItem w50">
              <label>Số lượng đã bán</label>
              <input
                type="number"
                placeholder="Nhập số lượng đã bán"
                name="sold"
                required
                value={sold}
                onChange={(e) => setSold(e.target.value)}
              />
            </div>
            <div className="formItem w50">
              <label>Số lượng lượt xem</label>
              <input
                type="number"
                placeholder="Nhập số lượng lượt xem"
                name="views"
                required
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="formItem w50">
          <label>Danh mục sản phẩm</label>
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
        </div>
        <div className="formItem w50">
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
        </div>
        <div className="formItem w100">
          <label htmlFor="img">Hình ảnh</label>
          <input
            type="file"
            id="img"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {product ? (
            <Image
              src={file ? URL.createObjectURL(file) : product?.img}
              alt=""
              width={300}
              height={300}
            />
          ) : (
            file && (
              <Image
                src={file ? URL.createObjectURL(file) : "/no-image.png"}
                alt=""
                width={300}
                height={300}
              />
            )
          )}
        </div>
        <div className="w100">
          <label
            htmlFor="info"
            style={{ fontSize: "14px", marginBottom: "10px" }}
          >
            Thông tin sản phẩm
          </label>

          <ReactQuill
            className={`editor w100 ${styles.editor}`}
            theme="snow"
            name="info"
            id="info"
            value={info}
            onChange={setInfo}
            modules={{ toolbar: toolbarOptions }}
          />

          <input type="hidden" name="info" value={info} />
          <label
            htmlFor="desc"
            style={{ fontSize: "14px", marginBottom: "10px" }}
          >
            Mô tả sản phẩm
          </label>

          <ReactQuill
            className={`editor ${styles.editor}`}
            theme="snow"
            name="desc"
            value={desc}
            onChange={setDesc}
            modules={{ toolbar: toolbarOptions }}
          />

          <input type="hidden" name="desc" value={desc} />
        </div>
        <button type="submit">
          {isUpdate ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
