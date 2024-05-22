import { getNews } from "@/lib/news/data";

import NewsForm from "@/components/dashboard/newsForm/newsForm";

const SingleNewsPage = async ({ params }) => {
  const { id } = params;
  const news = await getNews(id);
  return (
    <div>
      <NewsForm isUpdate={true} news={news} />
    </div>
  );
};

export default SingleNewsPage;
