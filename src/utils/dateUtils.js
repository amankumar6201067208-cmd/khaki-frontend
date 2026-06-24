export const isUpcoming = (date, time) => {
  const now = new Date();

  // combine date + time (YYYY-MM-DD + HH:mm)
  const eventDateTime = new Date(`${date}T${time}:00`);

  // 2 hours before event start
  const cutoffTime = new Date(
    eventDateTime.getTime() - 2 * 60 * 60 * 1000
  );

  // upcoming until 2 hours before event
  return now < cutoffTime;
};

export const getMonthDay = (date) => {
  const d = new Date(date);
  return {
    month: d.toLocaleString("en-US", { month: "short" }),
    day: d.getDate(),
  };
};

// sort by date + time (ascending)
export const sortByDateTime = (a, b) => {
  const dateTimeA = new Date(`${a.date}T${a.time}:00`);
  const dateTimeB = new Date(`${b.date}T${b.time}:00`);
  return dateTimeA - dateTimeB;
};
