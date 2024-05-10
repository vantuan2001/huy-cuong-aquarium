import { getCategories } from "@/lib/products/data";

const SingleNewsPage = async (categoryName, setCategoryName) => {
  const categories = await getCategories();
  return (
    <select
      name="cat"
      id="cat"
      value={categoryName}
      onChange={(e) => setCategoryName(e.target.value)}
    >
      <option value="general">Choose a Category</option>
      {categories.map((category) => (
        <option value={category.name} key={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};
export default SingleNewsPage;
