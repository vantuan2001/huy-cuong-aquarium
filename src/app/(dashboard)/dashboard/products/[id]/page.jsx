import { fetchProduct } from "@/lib/products/data";
import ProductForm from "@/components/dashboard/productForm/ProductForm";

const SingleProductPage = async ({ params }) => {
  const { id } = params;
  const product = await fetchProduct(id);

  return (
    <div>
      <ProductForm isUpdate={true} product={product} />
    </div>
  );
};

export default SingleProductPage;
