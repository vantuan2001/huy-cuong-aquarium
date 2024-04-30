"use client";
import { useState } from "react";
import styles from "./banner.module.css";
import Image from "next/image";

const Banner = ({ bannerUrl }) => {
  const [muted, setMuted] = useState(true);
  const getFileExtension = (bannerUrl) => {
    return bannerUrl.split(".").pop();
  };

  // Chức năng xác định định dạng tệp dựa trên phần mở rộng của nó
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

  return (
    <div className={styles.banner}>
      {fileFormat === "image" && (
        <div className={styles.images}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={bannerUrl}
              alt=""
              width={1690}
              height={602}
            />
          </div>
        </div>
      )}
      {fileFormat === "video" && (
        <div className={styles.videopos}>
          <div className={styles.videoWrapper}>
            <video
              src={bannerUrl}
              autoPlay
              muted={muted}
              loop
              playsInline
              controls={false}
              className={styles.video}
              id="theplayer"
            />
            <input
              type="checkbox"
              id="volume-switcher"
              style={{ display: "none" }}
              onClick={() => setMuted((prev) => !prev)}
            ></input>

            {muted ? (
              <label
                className={styles.switcherContainer}
                htmlFor="volume-switcher"
              ></label>
            ) : (
              <label
                className={`${styles.switcherContainer} ${styles.switcherOpen}`}
                htmlFor="volume-switcher"
              ></label>
            )}
          </div>
        </div>
      )}
      {fileFormat === "unknown" && (
        <span className={styles.error}>
          <h2>Lỗi</h2>
        </span>
      )}
    </div>
  );
};

export default Banner;
