"use client";
import Image from "next/image";
import styles from "./productForm.module.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { addProduct, updateProduct } from "@/lib/products/action";
import useSwal from "@/components/toast/useSwal";

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
        console.error("Lỗi khi lấy dữ liệu", err);
      }
    };
    fetchData();
  }, []);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["link", "image", "video"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"],
  ];
  const { ToastSuccess } = useSwal();
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
        ToastSuccess({ title: "Cập nhật sản phẩm" });
      } else {
        await addProduct(formData);
        ToastSuccess({ title: "Thêm sản phẩm" });
      }
    } catch (err) {
      console.error("Lỗi khi gửi biểu mẫu:", err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <div className="inputItem w50">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input"
        />
        <label htmlFor="title" className="label">
          Tên sản phẩm
        </label>
      </div>
      <div className="inputItem w50">
        <input
          type="number"
          name="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          className="input"
        />
        <label htmlFor="stock" className="label">
          Số lượng
        </label>
      </div>
      <div className="inputItem w50">
        <input
          type="number"
          name="costPrice"
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
          required
          className="input"
        />
        <label htmlFor="costPrice" className="label">
          Giá vốn
        </label>
      </div>
      <div className="inputItem w50">
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="input"
        />
        <label htmlFor="price" className="label">
          Giá bán
        </label>
      </div>
      {isUpdate && (
        <>
          <div className="inputItem w50">
            <input
              type="number"
              name="sold"
              value={sold}
              onChange={(e) => setSold(e.target.value)}
              required
              className="input"
            />
            <label htmlFor="sold" className="label">
              Số lượng đã bán
            </label>
          </div>
          <div className="inputItem w50">
            <input
              type="number"
              name="views"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              required
              className="input"
            />
            <label htmlFor="views" className="label">
              Số lượng lượt xem
            </label>
          </div>
        </>
      )}
      <div className="inputItem w50">
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select"
        >
          <option value="">---</option>
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
        <label htmlFor="category" className="label">
          Danh mục sản phẩm
        </label>
      </div>
      <div className="inputItem w50">
        <select
          name="brand"
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="input"
        >
          <option value="">---</option>
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
        <label htmlFor="brand" className="label">
          Thương hiệu sản phẩm
        </label>
      </div>
      <div className="inputItem w100">
        <input
          type="file"
          id="img"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="input"
        />
        <label htmlFor="img" className="label">
          Hình ảnh
        </label>

        {product ? (
          <div className={styles.imgContainer}>
            <Image
              src={file ? URL.createObjectURL(file) : product?.img}
              alt=""
              className={styles.img}
              width={200}
              height={200}
            />
          </div>
        ) : (
          file && (
            <div className={styles.imgContainer}>
              <Image
                src={file ? URL.createObjectURL(file) : "/no-image.png"}
                alt=""
                className={styles.img}
                width={200}
                height={200}
              />
            </div>
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
      </div>
      <button type="submit">
        {isUpdate ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
      </button>
    </form>
  );
};

export default ProductForm;
