import AmbassadorSlider from "./AmbassadorSlider";

const AmbassadorsSection = () => {
  return (
    <section className="md:py-20 pt-20">
      <div className="max-w-285 mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Meet our Ambassadors of Mumbai
        </h2>

        <p className="text-black max-w-3xl mx-auto md:mb-16">
          They are not tourist guides – they have other careers.
          But the city is their passion, and they love sharing
          their passion with you!
        </p>

        <AmbassadorSlider />
      </div>
    </section>
  );
};

export default AmbassadorsSection;
