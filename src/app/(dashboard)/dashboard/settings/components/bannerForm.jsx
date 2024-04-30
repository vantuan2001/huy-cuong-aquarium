"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "../settings.module.css";
import { updateBanner } from "@/lib/action";

const BannerForm = ({ setting }) => {
  const [file, setFile] = useState(null);
  const bannerUrl = setting.imgBanner;
  const getFileExtension = (bannerUrl) => {
    return bannerUrl.split(".").pop();
  };

  //  Chức năng xác định định dạng tệp dựa trên phần mở rộng của nó
  const getFileFormat = (extension) => {
    switch (extension) {
      case "png":
      case "jpg":
      case "jpeg":
      case "webp":
        return "image";
      case "mp4":
      case "avi":
      case "mkv":
      case "webm":
        return "video";
      default:
        return "unknown";
    }
  };

  const extension = getFileExtension(bannerUrl);
  const fileFormat = getFileFormat(extension);
  const [id, setId] = useState(setting._id);

  return (
    <form className={styles.imgContainer} action={updateBanner}>
      <div className={styles.bannerContainer}>
        <div className={styles.imgContainer}>
          <label htmlFor="img_banner">
            <input
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={{ display: "none" }}
            />
            <input
              type="file"
              id="img_banner"
              name="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />

            {fileFormat === "image" && (
              <div className={styles.images}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={file ? URL.createObjectURL(file) : bannerUrl}
                    alt=""
                    width={600}
                    height={310}
                  />
                </div>
              </div>
            )}
            {fileFormat === "video" && (
              <div className={styles.videopos}>
                <div className={styles.videoWrapper}>
                  <video
                    src={file ? URL.createObjectURL(file) : bannerUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
                    className={styles.video}
                    id="theplayer"
                  />
                </div>
              </div>
            )}
            {fileFormat === "unknown" && (
              <span className={styles.error}>
                <h2>Lỗi</h2>
              </span>
            )}
          </label>
        </div>
      </div>
      <button className={styles.button}>Cập nhật</button>
    </form>
  );
};

export default BannerForm;
