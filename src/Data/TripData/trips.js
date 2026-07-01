import strapi from "../../api/strapi";

import { STRAPI_BASE_URL } from "../../api/strapi";

const formatTime = (time) => {
  if (!time) return "";

  const date = new Date(`1970-01-01T${time}`);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatTrip = (trip) => {
  const featureImage = trip.featureImage
    ? STRAPI_BASE_URL + trip.featureImage.url
    : "";

  const images = trip.Images?.map((img) => STRAPI_BASE_URL + img.url) || [];

  const highlights = trip.highlight?.map((h) => h.Text) || [];

  const startingPoint = trip.startingPoint
    ? {
        title: trip.startingPoint.title,
        location_name: trip.startingPoint.location_name,
        location_address: trip.startingPoint.location_address,
      }
    : null;

  const schedule =
    trip.GroupTourBookingDetails?.map((item) => ({
      date: item.Date,

      slots:
        item.Slots?.map((slot) => ({
          time: formatTime(slot.Time),
          availableSeats: Number(slot.availableSeats),
        })) || [],
    })) || [];

  const privateConfig = trip.BookingSlots?.length
    ? {
        durationHours: trip.BookingSlots[0].TourDuraion,

        startSlots:
          trip.BookingSlots[0].BokingSlots?.map((slot) =>
            formatTime(slot.StartTime),
          ) || [],

        endSlots:
          trip.BookingSlots[0].BokingSlots?.map((slot) =>
            formatTime(slot.EndTime),
          ) || [],

        pricing:
          trip.BookingSlots[0].PersonPricing?.reduce((acc, item) => {
            acc[item.People] = Number(item.Price);
            return acc;
          }, {}) || {},
      }
    : null;

  return {
    id: trip.id,

    title: trip.Title,
    slug: trip.Slug,

    duration: trip.Duration,
    distance: trip.Distance,

    price: trip.Price,
    priceType: trip.priceType,

    tag: trip.Tag,

    category: trip.tripCategory,

    tourType: trip.tripType === "Group Tour" ? "group" : "private",

    publishDate: trip.publishDate,
    // Fallback ordering key when publishDate isn't set manually.
    publishedAt: trip.publishedAt,

    featureImage,

    images,

    description: trip.Description,

    note: trip.Note,

    highlights,

    startingPoint,

    schedule,

    privateConfig,
  };
};

// Fetch EVERY page, not just the first 25 (Strapi's default page size).
// Without this, once there are >25 trips the newest ones silently disappear
// from the home page and the Walk/Tours listing.
const PAGE_SIZE = 100;

const fetchAllPages = async (baseQuery) => {
  let page = 1;
  let all = [];

  while (true) {
    const res = await strapi.get(
      `${baseQuery}&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`
    );
    all = all.concat(res.data?.data || []);

    const pageCount = res.data?.meta?.pagination?.pageCount ?? 1;
    if (page >= pageCount) break;
    page += 1;
  }

  return all;
};

export const getTrips = async () => {
  const baseQuery =
    "/trips?populate[featureImage]=true&populate[Images]=true&populate[highlight]=true&populate[startingPoint]=true&populate[GroupTourBookingDetails][populate]=*&populate[BookingSlots][populate]=*";

  const trips = await fetchAllPages(baseQuery);

  return trips.map((trip) => formatTrip(trip));
};

export const getTripBySlug = async (slug) => {
  const res = await strapi.get(
    `/trips?filters[Slug][$eq]=${slug}&populate[featureImage]=true&populate[Images]=true&populate[highlight]=true&populate[startingPoint]=true&populate[GroupTourBookingDetails][populate]=*&populate[BookingSlots][populate]=*`
  );

  if (!res.data.data.length) return null;

  return formatTrip(res.data.data[0]);
};
