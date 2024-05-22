"use client";
import Image from "next/image";
import styles from "./newsForm.module.css";
import { useState } from "react";
import dynamic from "next/dynamic";
import { addNews, updateNews } from "@/lib/news/action";
import useSwal from "@/components/toast/useSwal";

// Dynamic import of ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NewsForm = ({ news, isUpdate }) => {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(news ? news._id : "");
  const [title, setTitle] = useState(news ? news.title : "");
  const [desc, setDesc] = useState(news ? news.desc : "");

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["link", "image", "video"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    ["clean"], // remove formatting button
  ];
  const { ToastSuccess } = useSwal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("desc", desc);
      if (file) {
        formData.append("file", file);
      }

      if (isUpdate) {
        await updateNews(formData);
        ToastSuccess({ title: "Cập nhật tin tức" });
      } else {
        await addNews(formData);
        ToastSuccess({ title: "Thêm tin tức" });
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
          <label>Tên tin tức</label>
          <input
            type="text"
            placeholder="Nhập tên tin tức"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="formItem w50">
          <label htmlFor="img">Hình ảnh</label>
          <input
            type="file"
            id="img"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {news ? (
          <div className={styles.imgContainer}>
            <Image
              src={file ? URL.createObjectURL(file) : news?.img}
              alt=""
              fill
              className={styles.img}
            />
          </div>
        ) : (
          file && (
            <div className={styles.imgContainer}>
              <Image
                src={file ? URL.createObjectURL(file) : "/no-image.png"}
                alt=""
                fill
                className={styles.img}
              />
            </div>
          )
        )}

        <div className="w100">
          <label
            htmlFor="desc"
            style={{ fontSize: "14px", marginBottom: "10px" }}
          >
            Mô tả tin tức
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

export default NewsForm;
