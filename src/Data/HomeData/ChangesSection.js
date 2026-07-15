import axios from "axios";

import { STRAPI_BASE_URL, mediaUrl } from "../../api/strapi";

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
        ? mediaUrl(data.WhatsNewSection.image.url)
        : null,
    };

  } catch (error) {
    console.error("Home Page API Error:", error);
    return null;
  }
};

export const hasWhatsNewContent = (data) => {
  if (!data) return false;
  const blocks = Array.isArray(data.description) ? data.description : null;
  const hasParagraph = blocks
    ? blocks.some((b) => b?.children?.some((c) => (c?.text || "").trim()))
    : Boolean(data.description);
  return Boolean(data.image || data.tag || data.title || hasParagraph);
};

export const getInternationalImage = async () => {

  const res = await axios.get(
    `${STRAPI_BASE_URL}/api/home-page?populate[InternationalImage][populate]=*`
  );

  const data = res.data.data;
  const img = data?.InternationalImage?.InternationalImage;

  return {
    image: img
      ? mediaUrl(img.formats?.small?.url || img.url)
      : null,
    imageLink: data?.InternationalImage?.InternationalImageURL
  };

};