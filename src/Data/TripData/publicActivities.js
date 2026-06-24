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

const formatActivity = (trip) => {
  const images =
    trip.FeatureImages?.map((img) => STRAPI_BASE_URL + img.url) || [];

  const highlights = trip.Highlights?.map((h) => h.Text) || [];

  const schedule = trip.BookingSlots
    ? trip.BookingSlots.map((slot) => ({
        date: slot.TourDate,
        time: formatTime(slot.Slots?.TourTime),
        availableSeats: Number(slot.Slots?.availableTickets),
        discountUsedCount: Number(slot.Slots?.discountUsedCount || 0),
      }))
    : [];

  const startingPoint = trip.StartingPoint?.length
    ? {
        title: trip.StartingPoint[0].title,
        location_name: trip.StartingPoint[0].location_name,
        location_address: trip.StartingPoint[0].location_address,
      }
    : null;

  return {
    id: trip.id,
    type: trip.TourType === "Public Walk" ? "walk" : "event",
    title: `#${trip.Title}`,
    slug: trip.Slug,
    price: Number(trip.Price),
    duration: trip.Duration,
    distance: trip.Distance,
    schedule,
    images,
    description: trip.Description,
    note: trip.Note,
    highlights,
    startingPoint,
  };
};

export const getPublicActivities = async () => {
  const res = await strapi.get(
  "/public-walk-and-events?populate[FeatureImages]=true&populate[Highlights]=true&populate[BookingSlots][populate]=*&populate[StartingPoint]=true"
);

  return res.data.data.map((trip) => formatActivity(trip));
};
