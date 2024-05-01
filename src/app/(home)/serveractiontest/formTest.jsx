"use client";

import { addCategory, deleteNews } from "@/lib/action";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const FormTest = ({ product }) => {
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sold, setSold] = useState("");
  const [stock, setStock] = useState("");

  const serviceID = "service_a0uwnv6";
  const templateId = "template_r785pfh";
  const publicKey = "M4Aev_KqPQXpxj4Sl";

  const sendEmail = async (e) => {
    e.preventDefault();

    const data = {
      service_id: serviceID,
      template_id: templateId,
      user_id: publicKey,
      templatePrams: {
        from_name: name,
        from_email: email,
        to_name: name,
        message: message,
      },
    };

    try {
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );
      setName("");
      setEmail("");
      setMessage("");
      console.log("SUCCESS!", res.data);
    } catch (error) {
      console.log("FAILED...", error.text);
    }
  };
  console.log(product._id);
  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:3000/api/products/quantity`, {
        id: product._id,
        stock: product.stock - stock,
        sold: product.sold + +sold,
        // stock: product.stock + stock,
        // sold: product.sold + +sold,
      });
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
      <form ref={form} onSubmit={sendEmail}>
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
      </form>
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
