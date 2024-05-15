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
  const { Error } = useSwal();
  const products = useSelector((state) => state.cart.products);
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };
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
          total: totalPrice(),
          userId: user._id,
        };

        await axios.post(
          "https://huy-cuong-aquarium.vercel.app/api/orders",
          newOrder
        );
        console.log("saved to db");
        products.map((item) => {
          const updateProduct = async () => {
            try {
              await axios.put(
                `https://huy-cuong-aquarium.vercel.app/api/products/quantity`,
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
      }
    }
  };

  const handleVNPAY = async () => {
    const orderId = Math.floor(Math.random() * 999999);
    const response = await handleTransaction.bank(totalPrice(), orderId);
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
          total: totalPrice(),
          userId: user._id,
        };

        await axios.post(
          "https://huy-cuong-aquarium.vercel.app/api/orders",
          newOrder
        );
        console.log("saved to db");
        products.map((item) => {
          const updateProduct = async () => {
            try {
              await axios.put(
                `https://huy-cuong-aquarium.vercel.app/api/products/quantity`,
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
        window.location.href = url;
        dispatch(resetCart());
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
              placeholder="Nhập họ và tên"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
                  placeholder="Nhập số điện thoại"
                  name="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errorPhone}
              </div>
              <div className={styles.item}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Nhập địa chỉ email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                  placeholder="Nhập địa chỉ cụ thể. Số nhà, tên đường,..."
                  value={specificAddress}
                  onChange={(e) => setSpecificAddress(e.target.value)}
                />
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
              <SelectProvince />
              <SelectDistrict />
              <SelectWard />
            </div>
          </div>
          <div>
            <textarea
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={styles.textarea}
              cols="40"
              rows="10"
              placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
            ></textarea>
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
                }).format(totalPrice())
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
                }).format(totalPrice() + 30000)
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
