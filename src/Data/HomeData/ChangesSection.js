import axios from "axios";

import { STRAPI_BASE_URL } from "../../api/strapi";

export const getHomePage = async () => {
  try {

    const res = await axios.get(`${STRAPI_BASE_URL}/api/home-page?populate[WhatsNewSection][populate]=*`);

    const data = res.data.data;

    return {
      tag: data.WhatsNewSection?.Heading?.[0]?.children?.[0]?.text || "",
      title: data.WhatsNewSection?.Heading?.[1]?.children?.[0]?.text || "",
      description: data.WhatsNewSection?.Paragraph || "",
      buttonText: data.WhatsNewSection?.ButtonText || "",
      buttonLink: data.WhatsNewSection?.ButtonURL || "",
      image: data.WhatsNewSection?.image
        ? `${STRAPI_BASE_URL}${data.WhatsNewSection.image.url}`
        : null,
    };

  } catch (error) {
    console.error("Home Page API Error:", error);
    return null;
  }
};

export const getInternationalImage = async () => {

  const res = await axios.get(
    `${STRAPI_BASE_URL}/api/home-page?populate[InternationalImage][populate]=*`
  );

  const data = res.data.data;
  const img = data?.InternationalImage?.InternationalImage;

  return {
    image: img
      ? `${STRAPI_BASE_URL}${img.formats?.small?.url || img.url}`
      : null,
    imageLink: data?.InternationalImage?.InternationalImageURL
  };

};