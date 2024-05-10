// "use client";

import { fetchProduct } from "@/lib/products/data";
import FormTest from "./formTest";

// import { addCategory, deleteNews } from "@/lib/action";
// import emailjs from "@emailjs/browser";
// import axios from "axios";
// import { useEffect, useRef, useState } from "react";

const ServerActionTestPage = async () => {
  // const { title } = "SUNSUN HW704A";
  const id = "662133dfda311151432fa126";
  const product = await fetchProduct(id);

  // const form = useRef();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");
  // const [sold, setSold] = useState("");
  // const [stock, setStock] = useState("");

  // const serviceID = "service_a0uwnv6";
  // const templateId = "template_r785pfh";
  // const publicKey = "M4Aev_KqPQXpxj4Sl";

  // const sendEmail = async (e) => {
  //   e.preventDefault();

  //   const data = {
  //     service_id: serviceID,
  //     template_id: templateId,
  //     user_id: publicKey,
  //     templatePrams: {
  //       from_name: name,
  //       from_email: email,
  //       to_name: name,
  //       message: message,
  //     },
  //   };

  //   try {
  //     const res = await axios.post(
  //       "https://api.emailjs.com/api/v1.0/email/send",
  //       data
  //     );
  //     setName("");
  //     setEmail("");
  //     setMessage("");
  //     console.log("SUCCESS!", res.data);
  //   } catch (error) {
  //     console.log("FAILED...", error.text);
  //   }
  // };

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     try {
  //       const res = await axios.get("https://huy-cuong-aquarium.vercel.app/api/products");
  //       setData(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchAllData();
  // }, []);

  // console.log(data);
  // const updateProduct = async () => {
  //   try {
  //     await axios.put(`https://huy-cuong-aquarium.vercel.app/api/products/quantity`, {
  //       sold: data.SoLuong - sold,
  //       stock: data.DaBan + +stock,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <FormTest product={product} />
      {/* {product.title} */}
      {/* <form action={addNews}>
        <input type="text" placeholder="title" name="title" />
        <input type="text" placeholder="desc" name="desc" />
        <input type="file" name="file" />

        <button>add news</button>
      </form> */}

      {/* <form ref={form} onSubmit={sendEmail}>
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
      </form> */}
    </div>
  );
};

export default ServerActionTestPage;
