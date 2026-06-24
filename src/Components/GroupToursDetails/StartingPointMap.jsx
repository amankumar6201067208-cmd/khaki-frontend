const StartingPointMap = ({ location }) => {
  if (!location) return null;

  const query = encodeURIComponent(location);

  return (
    <iframe
      title="Starting Point"
      width="100%"
      height="300"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps?q=${query}&output=embed`}
      style={{ border: 0 }}
    ></iframe>
  );
};

export default StartingPointMap;