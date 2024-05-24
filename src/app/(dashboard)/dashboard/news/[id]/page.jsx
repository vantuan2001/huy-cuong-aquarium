import { getNews } from "@/lib/news/data";

import NewsForm from "@/components/dashboard/newsForm/newsForm";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const post = await getNews(id);

  return {
    title: post.title,
  };
};

const SingleNewsPage = async ({ params }) => {
  const { id } = params;
  const news = await getNews(id);
  const newsObject = JSON.parse(JSON.stringify(news));
  return (
    <div>
      <NewsForm isUpdate={true} news={newsObject} />
    </div>
  );
};

export default SingleNewsPage;
