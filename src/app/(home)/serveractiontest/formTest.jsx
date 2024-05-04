"use client";

import { addCategory, deleteNews } from "@/lib/action";
import emailjs from "@emailjs/browser";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

const FormTest = ({ product }) => {
  const order = "313sdfwr233424";
  const date = moment(Date.now()).format("h:mm DD-MM-YYYY");

  const [name, setName] = useState("Văn Tuấn");
  const [email, setEmail] = useState("bongcai2128@gmail.com");
  const [message, setMessage] = useState(
    `Đơn hàng #${order} của bạn đã được giao thành công ngày ${date}.`
  );
  const [sold, setSold] = useState("");
  const [stock, setStock] = useState("");

  const YOUR_SERVICE_ID = "service_a0uwnv6";
  const YOUR_TEMPLATE_ID = "template_ksomju7";
  const YOUR_PUBLIC_KEY = "M4Aev_KqPQXpxj4Sl";
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        YOUR_SERVICE_ID,
        YOUR_TEMPLATE_ID,
        {
          to_name: "Văn Tuấn",
          message: `Chúng tôi xin thông báo rằng có một đơn đặt hàng mới đã được nhận từ website của cửa hàng vào lúc ${date} hôm nay.`,
          // from_name: order,
        },
        {
          publicKey: YOUR_PUBLIC_KEY,
        }
      )

      // emailjs
      //   .sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, {
      //     publicKey: YOUR_PUBLIC_KEY,
      //   })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  const updateProduct = async () => {
    try {
      await axios.put(
        `https://huy-cuong-aquarium.vercel.app/api/products/quantity`,
        {
          id: product._id,
          stock: product.stock - stock,
          sold: product.sold + +sold,
          // stock: product.stock + stock,
          // sold: product.sold + +sold,
        }
      );
      console.log("Product quantity updated successfully");
    } catch (err) {
      console.error("Error updating product quantity:", err);
    }
  };

  return (
    <div>
      {/* <form action={addNews}>
        <input type="text" placeholder="title" name="title" />
        <input type="text" placeholder="desc" name="desc" />
        <input type="file" name="file" />

        <button>add news</button>
      </form> */}
      update
      <div>
        <input
          type="text"
          value={sold}
          onChange={(e) => setSold(e.target.value)}
        />
        <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button onClick={updateProduct}>update product</button>
      </div>
      <button onClick={sendEmail}>email</button>
      {/* <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="from_name" />
        <label>Name</label>
        <input
          type="text"
          name="user_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          name="user_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Message</label>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="Send" />
      </form> */}
      <div>add category</div>
      <form action={addCategory}>
        <input type="text" placeholder="name" name="name" />
        <input type="file" name="file" />
        <button>add category</button>
      </form>
      <form action={deleteNews}>
        <input type="text" placeholder="postId" name="id" />
        <button>Delete</button>
      </form>
    </div>
  );
};

export default FormTest;
