import ProductForm from "@/components/dashboard/productForm/productForm";
import { fetchProduct } from "@/lib/products/data";

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
