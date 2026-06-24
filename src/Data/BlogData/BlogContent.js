import axios from "axios";

import { STRAPI_BASE_URL } from "../../api/strapi";

export const getBlogs = async () => {
  try {
    const res = await axios.get(`${STRAPI_BASE_URL}/api/blogs?populate=*`);

    return res.data.data.map((blog) => ({
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      publishDate: blog.publishDate,
      excerpt: blog.excerpt,
      image: blog.featureImage
        ? `${STRAPI_BASE_URL}${blog.featureImage.url}`
        : null,
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};