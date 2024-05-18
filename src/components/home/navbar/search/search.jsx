"use client";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import styles from "./search.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

const Search = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleNavigation = (query) => {
    router.push(`/products?q=${query}`);
    setOpen(false);
  };
  const handleLink = (title) => {
    router.push(`/products/${title}`);
    setOpen(false);
    setQuery("");
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (!query) return;

      try {
        const res = await axios.get(
          `http://localhost:3000/api/search?title=${query}`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [query]);

  return (
    <div className={styles.container}>
      <div
        className={styles.iconContainer}
        onClick={() => setOpen((prev) => !prev)}
      >
        <BsSearch className={styles.icon} />
      </div>
      <div
        className={open ? styles.backgroundShow : styles.backgroundHidden}
        onClick={() => setOpen((prev) => !prev)}
      ></div>
      <div className={open ? styles.wrapperShow : styles.wrapperHidden}>
        <div className={styles.mainbox}>
          <div
            className={styles.backContainer}
            onClick={() => setOpen((prev) => !prev)}
          >
            <BsArrowLeft className={styles.icon} />
          </div>
          <div className={styles.inputContainer}>
            <BsSearch className={styles.icon} />
            <form
              action={() => handleNavigation(query)}
              className={styles.form}
            >
              <input
                className={styles.input}
                placeholder="Tìm kiếm..."
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className={styles.list}>
          {!query ? (
            " "
          ) : (
            <div
              className={styles.item}
              onClick={() => handleNavigation(query)}
            >
              <div className={styles.itemContainer}>
                <BsSearch className={styles.icon} />
              </div>
              <p>{query}</p>
            </div>
          )}

          {query.length > 2
            ? products.map((product) => (
                <div
                  className={styles.item}
                  onClick={() => handleLink(product.title)}
                  key={product.id}
                >
                  <div className={styles.itemContainer}>
                    <Image
                      src={product.img}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.img}
                    />
                  </div>
                  <p>{product.title}</p>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Search;
