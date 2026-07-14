import TripadvisorWidget from "./TripadvisorWidget";

// Travellers' Choice (previously Certificate of Excellence) badge widget.
const COE_HTML = `<div id="TA_certificateOfExcellence553" class="TA_certificateOfExcellence"><ul id="FKt88lO0V3dN" class="TA_links qdhuLxwH2M"><li id="Pkg5N1SDTjql" class="tXzpMzFzHU64"><a target="_blank" href="https://www.tripadvisor.in/Attraction_Review-g304554-d11774408-Reviews-Khaki_Tours-Mumbai_Maharashtra.html"><img src="https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_2026_LL.png" alt="TripAdvisor" class="widCOEImg" id="CDSWIDCOELOGO"/></a></li></ul></div>`;
const COE_SRC =
  "https://www.jscache.com/wejs?wtype=certificateOfExcellence&uniq=553&locationId=11774408&lang=en_IN&year=2026&display_version=2";

// "Your Rating" ratings-only wide widget (rating + review count bar).
const RATINGS_HTML = `<div id="TA_cdsratingsonlywide322" class="TA_cdsratingsonlywide"><ul id="7N6dcA" class="TA_links WcbcJ75j4"><li id="EjW9hXPa" class="WWSAF3aNsY2A"><a target="_blank" href="https://www.tripadvisor.in/Attraction_Review-g304554-d11774408-Reviews-Khaki_Tours-Mumbai_Maharashtra.html"><img src="https://www.tripadvisor.in/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-18034-2.svg" alt="TripAdvisor"/></a></li></ul></div>`;
const RATINGS_SRC =
  "https://www.jscache.com/wejs?wtype=cdsratingsonlywide&uniq=322&locationId=11774408&lang=en_IN&border=true&shadow=false&backgroundColor=gray&display_version=2";

const GuestReviewsCarousel = () => {
  return (
    <section className="bg-[url('/src/assets/Background/snow2.png')] py-16">
      <div className="max-w-285 mx-auto px-6 text-center flex flex-col items-center">
        {/* Travellers' Choice widget */}
        <TripadvisorWidget html={COE_HTML} scriptSrc={COE_SRC} className="mb-6" />

        {/* Heading */}
        <h2 className="text-[30px] font-bold text-[#DB4D27] mb-6 max-w-2xl">
          Visit our Tripadvisor page to see what our guests have to say
        </h2>

        {/* Ratings-only widget */}
        <TripadvisorWidget html={RATINGS_HTML} scriptSrc={RATINGS_SRC} />
      </div>
    </section>
  );
};

export default GuestReviewsCarousel;
