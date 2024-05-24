import ProductForm from "@/components/dashboard/productForm/productForm";
import { fetchProduct } from "@/lib/products/data";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const post = await fetchProduct(id);

  return {
    title: post.title,
  };
};

const SingleProductPage = async ({ params }) => {
  const { id } = params;
  const product = await fetchProduct(id);
  const productObject = JSON.parse(JSON.stringify(product));
  return (
    <div>
      <ProductForm isUpdate={true} product={productObject} />
    </div>
  );
};

export default SingleProductPage;
