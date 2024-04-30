import { fetchProduct } from "@/lib/data";
import styles from "./singleProduct.module.css";
import UpdateProductForm from "./updateProductForm";

const SingleProductPage = async ({ params }) => {
  const { id } = params;
  const product = await fetchProduct(id);

  return (
    <div className={styles.container}>
      <UpdateProductForm product={product} />
    </div>
  );
};

export default SingleProductPage;
