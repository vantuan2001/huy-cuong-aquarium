"use client";

import { useEffect, useState } from "react";
import styles from "./checkoutForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import CheckoutProductCard from "@/components/home/checkoutProductCard/checkoutProductCard";
import { handleTransaction } from "@/app/api/checkout/handleTransaction";
import axios from "axios";
import { useRouter } from "next/navigation";
import { resetCart } from "@/redux/cartReducer";
import Address from "@/components/address/address";
import useSwal from "@/components/toast/useSwal";
import { sendEmail } from "@/lib/email";

const CheckoutForm = ({ user }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { Error, ToastSuccess } = useSwal();
  const products = useSelector((state) => state.cart.products);

  const totalPrice = products.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );
  const [error, setError] = useState(false);
  const [specificAddress, setSpecificAddress] = useState("");
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const {
    getProvince,
    getDistrict,
    getWard,
    SelectProvince,
    SelectDistrict,
    SelectWard,
  } = Address(error);
  const province = getProvince;
  const district = getDistrict;
  const ward = getWard;
  const address = [specificAddress, ward, district, province]
    .filter(Boolean)
    .join(",");
  const [note, setNote] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let errorPhone;
  if (!phone) {
    errorPhone = (
      <div className="error">Xin vui lòng nhập vào số điện thoại</div>
    );
  } else if (phone.length < 10) {
    errorPhone = (
      <div className="error"> Xin vui lòng nhập đầy đủ số điện thoại</div>
    );
  } else {
    errorPhone = "";
  }

  const handleCOD = async () => {
    if (
      !username ||
      !phone ||
      !email ||
      !specificAddress ||
      !ward ||
      !district ||
      !province
    ) {
      setError(true);
      Error({ title: "Đã có lỗi trong quá trình thanh toán" });
    } else {
      try {
        const newOrder = {
          username,
          phone,
          email,
          address,
          products,
          note,
          paymentMethods: 0,
          paymentStatus: 0,
          total: totalPrice,
          userId: user._id,
        };

        await axios.post(
          "https://www.huycuongaquarium.online/api/orders",
          newOrder
        );
        ToastSuccess({ title: "Đặt hàng" });
        console.log("saved to db");
        products.map((item) => {
          const updateProduct = async () => {
            try {
              await axios.put(
                `https://www.huycuongaquarium.online/api/products/quantity`,
                {
                  id: item.id,
                  stock: item.stock - item.quantity,
                  sold: item.sold + +item.quantity,
                }
              );
              console.log("Số lượng sản phẩm được cập nhật thành công");
            } catch (err) {
              console.error("Lỗi cập nhật số lượng sản phẩm:", err);
            }
          };

          return updateProduct();
        });

        sendEmail();
        router.push("/thanks");
        dispatch(resetCart());
      } catch (err) {
        console.log(err);
        Error({ title: "Đã có lỗi trong quá trình thanh toán" });
      }
    }
  };

  const handleVNPAY = async () => {
    const orderId = Math.floor(Math.random() * 999999);
    const response = await handleTransaction.bank(totalPrice, orderId);
    const data = response.data;

    // Trích xuất URL từ trường "data"
    const url = data;
    if (
      !username ||
      !phone ||
      !email ||
      !specificAddress ||
      !ward ||
      !district ||
      !province
    ) {
      setError(true);
      Error({ title: "Đã có lỗi trong quá trình thanh toán" });
    } else {
      try {
        const newOrder = {
          username,
          phone,
          email,
          address,
          products,
          note,
          paymentMethods: 1,
          total: totalPrice,
          userId: user._id,
        };

        await axios.post(
          "https://www.huycuongaquarium.online/api/orders",
          newOrder
        );
        console.log("saved to db");
        products.map((item) => {
          const updateProduct = async () => {
            try {
              await axios.put(
                `https://www.huycuongaquarium.online/api/products/quantity`,
                {
                  id: item.id,
                  stock: item.stock - item.quantity,
                  sold: item.sold + +item.quantity,
                }
              );
              console.log("Số lượng sản phẩm được cập nhật thành công");
            } catch (err) {
              console.error("Lỗi cập nhật số lượng sản phẩm:", err);
            }
          };
          return updateProduct();
        });
        sendEmail();
        dispatch(resetCart());
        window.location.href = url;
        return url;
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>
          <h3>THÔNG TIN THANH TOÁN</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.item}>
            <input
              type="text"
              className={styles.input}
              name="username"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username" className={styles.label}>
              Họ và tên
            </label>

            {error && username.length < 3 ? (
              <div className="error">
                Xin vui lòng nhập vào số điện thoại người mua
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.center}>
            <div className={styles.itemContainer}>
              <div className={styles.item}>
                <input
                  type="text"
                  className={styles.input}
                  name="phone"
                  id="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="phone" className={styles.label}>
                  Số điện thoại
                </label>
                {errorPhone}
              </div>
              <div className={styles.item}>
                <input
                  type="text"
                  className={styles.input}
                  name="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email" className={styles.label}>
                  Địa chỉ email
                </label>
                {error && !email ? (
                  <div className="error">
                    Xin vui lòng nhập vào địa chỉ email
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.item}>
                <input
                  type="text"
                  className={styles.input}
                  id="address"
                  required
                  value={specificAddress}
                  onChange={(e) => setSpecificAddress(e.target.value)}
                />
                <label htmlFor="address" className={styles.label}>
                  Địa chỉ cụ thể
                </label>
                {error && specificAddress.length < 3 ? (
                  <div className="error">
                    Xin vui lòng nhập vào địa chỉ cụ thể
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={styles.itemContainer}>
              <div className={styles.item}>
                <SelectProvince />
                <input
                  type="text"
                  className={styles.input}
                  id="province"
                  style={{ display: "none" }}
                />
                <label htmlFor="province" className={styles.label}>
                  Tỉnh thành
                </label>
              </div>
              <div className={styles.item}>
                <SelectDistrict />
                <input
                  type="text"
                  className={styles.input}
                  id="district"
                  style={{ display: "none" }}
                />
                <label htmlFor="district" className={styles.label}>
                  Quận huyện
                </label>
              </div>
              <div className={styles.item}>
                <SelectWard />
                <input
                  type="text"
                  className={styles.input}
                  id="ward"
                  style={{ display: "none" }}
                />
                <label htmlFor="ward" className={styles.label}>
                  Phường xã
                </label>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <textarea
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={styles.textarea}
              required
              cols="40"
              rows="10"
            ></textarea>
            <label htmlFor="ward" className={styles.label}>
              Ghi chú về đơn hàng
            </label>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>
          <h3>THÔNG TIN ĐƠN HÀNG</h3>
        </div>
        {isClient
          ? products.map((product) => (
              <CheckoutProductCard product={product} key={product.title} />
            ))
          : ""}
        <div className={styles.price}>
          <div className={styles.priceItem}>
            <span>Tạm tính</span>
            <span>
              {isClient ? (
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice)
              ) : (
                <div>0 đ</div>
              )}
            </span>
          </div>

          <div className={styles.priceItem}>
            <span>Phí vận chuyển</span>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(30000)}
            </span>
          </div>
          <div className={styles.priceItem}>
            <span>Thành tiền</span>
            <span>
              {isClient ? (
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice + 30000)
              ) : (
                <div>0 đ</div>
              )}
            </span>
          </div>
        </div>
        <div className={styles.payment}>
          <button className={styles.button} onClick={handleCOD}>
            Thanh toán khi nhận hàng
          </button>
          <button className={styles.button} onClick={handleVNPAY}>
            Thanh toán VNPAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
