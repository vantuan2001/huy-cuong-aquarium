"use client";

import { addProduct } from "@/lib/action";
import styles from "./addProduct.module.css";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddProductPage = () => {
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
            <select
              name="category"
              id="category"
              // onChange={(e) => setCategory(e.target.value)}
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
            <select
              name="brand"
              id="brand"
              // onChange={(e) => setBrand(e.target.value)}
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

            {/* 
            <input type="text" placeholder="color" name="color" />
            <input type="text" placeholder="size" name="size" />
            <textarea
              required
              name="desc"
              id="desc"
              rows="16"
              placeholder="Description"
            ></textarea> */}
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
