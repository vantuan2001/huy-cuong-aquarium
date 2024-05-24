"use client";
import styles from "./error.module.css";

const Error = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main_wrapper}>
        <div className={styles.main}>
          <div className={styles.antenna}>
            <div className={styles.antenna_shadow}></div>
            <div className={styles.a1}></div>
            <div className={styles.a1d}></div>
            <div className={styles.a2}></div>
            <div className={styles.a2d}></div>
            <div className={styles.a_base}></div>
          </div>
          <div className={styles.tv}>
            <div className={styles.cruve}></div>
            <div className={styles.display_div}>
              <div className={styles.screen_out}>
                <div className={styles.screen_out1}>
                  <div className={styles.screen}>
                    <span className={styles.notfound_text}>KHÔNG TÌM THẤY</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.lines}>
              <div className={styles.line1}></div>
              <div className={styles.line2}></div>
              <div className={styles.line3}></div>
            </div>
            <div className={styles.buttons_div}>
              <div className={styles.b1}>
                <div></div>
              </div>
              <div className={styles.b2}></div>
              <div className={styles.speakers}>
                <div className={styles.g1}>
                  <div className={styles.g11}></div>
                  <div className={styles.g12}></div>
                  <div className={styles.g13}></div>
                </div>
                <div className={styles.g}></div>
                <div className={styles.g}></div>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.base1}></div>
            <div className={styles.base2}></div>
            <div className={styles.base3}></div>
          </div>
        </div>
        <div className={styles.text_404}>
          <div className={styles.text_4041}>4</div>
          <div className={styles.text_4042}>0</div>
          <div className={styles.text_4043}>4</div>
        </div>
      </div>
    </div>
  );
};

export default Error;
