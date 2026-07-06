import strapi from "../../api/strapi";

import { mediaUrl } from "../../api/strapi";

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
    trip.FeatureImages?.map((img) => mediaUrl(img.url)) || [];

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
    // EventType: "Ofline" = a real event, "Online" = a talk (backend enum).
    eventType: trip.EventType,
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

// Fetch every page — Strapi returns only 25 records by default, so without
// this a growing list of walks/events would silently drop the newest ones.
const PAGE_SIZE = 100;

export const getPublicActivities = async () => {
  const baseQuery =
    "/public-walk-and-events?populate[FeatureImages]=true&populate[Highlights]=true&populate[BookingSlots][populate]=*&populate[StartingPoint]=true";

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

  return all.map((trip) => formatActivity(trip));
};
