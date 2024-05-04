"use client";
import Image from "next/image";
import styles from "./singleProduct.module.css";
import { useState } from "react";
import { updateProduct } from "@/lib/action";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const UpdateProductForm = ({ product }) => {
  // const router = useRouter();
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
            <option value="Bể cá">Bể cá</option>
            <option value="Cá tép">Cá tép</option>
            <option value="Cây thuỷ sinh">Cây thuỷ sinh</option>
            <option value="Đèn">Đèn</option>
            <option value="Bình CO2">Bình CO2</option>
            <option value="Đá lũa">Đá lũa</option>
            <option value="Máy lọc">Máy lọc</option>
            <option value="Vật liệu lọc">Vật liệu lọc</option>
            <option value="Đất nền">Đất nền</option>
            <option value="Phụ kiện">Phụ kiện</option>
            <option value="Hoá chất">Hoá chất</option>
          </select>
          <label>Thương hiệu sản phẩm</label>
          <select
            name="brand"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">Chọn thương hiệu</option>
            <option value="Extra Bio">Extra Bio</option>
            <option value="Biozym">Biozym</option>
            <option value="Chihiros">Chihiros</option>
            <option value="ADA">ADA</option>
            <option value="Week Aqua">Week Aqua</option>
            <option value="Control Soid">Control Soid</option>
            <option value="Vũ Aqua">Vũ Aqua</option>
            <option value="Atman">Atman</option>
            <option value="GEX">GEX</option>
            <option value="Seachem">Seachem</option>
            <option value="Mufan">Mufan</option>
            <option value="Vivid">Vivid</option>
            <option value="Sunsun">Sunsun</option>
            <option value="AquaBlue">AquaBlue</option>
          </select>

          <button type="submit">
            {/* <button type="submit" onClick={handleCreate}> */}
            Cập nhật
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateProductForm;
