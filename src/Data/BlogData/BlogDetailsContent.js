import axios from "axios";
import { STRAPI_BASE_URL } from "../../api/strapi";

export const getBlogBySlug = async (slug) => {
  try {

    const res = await axios.get(`${STRAPI_BASE_URL}/api/blogs`, {
      params: {
        "filters[slug][$eq]": slug,
        "populate[Content][populate]": "*",
        populate: "featureImage"
      }
    });

    const blog = res.data.data[0];

    if (!blog) return null;

    return {
      id: blog.id,
      title: blog.title,
      publishDate: blog.publishDate,
      image: blog.featureImage
        ? `${STRAPI_BASE_URL}${blog.featureImage.url}`
        : null,
      content: blog.Content
    };

  } catch (error) {
    console.error("Blog API Error:", error);
    return null;
  }
};