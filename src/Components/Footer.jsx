import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 px-6 py-12">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1 */}
        <div>
          <h4 className="text-[#ABABAB] font-semibold mb-4">ALL ABOUT KHAKI</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/walk-tours" className="hover:text-white">Khaki Walks/Tours</Link></li>
            <li><Link to="/foundation" className="hover:text-white">Khaki Heritage Foundation</Link></li>
            <li><Link to="/khaki-lab" className="hover:text-white">Khaki Lab</Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-[#ABABAB] font-semibold mb-4">SUPPORT</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faqs" className="hover:text-white">FAQs</Link></li>
            <li><Link to="/cancellation-refund-policy" className="hover:text-white">Cancellation & Refund Policy</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-[#ABABAB] font-semibold mb-4">LET'S CONNECT</h4>
          <div className="text-sm space-y-4">
            <div className="border-l border-gray-600 pl-4">
              <p className="text-gray-400">Call Us</p>
              <a
                href="tel:+918828100111"
                className="text-[#ABABAB] hover:text-white"
              >
                +918828100111
              </a>
            </div>

            <div className="border-l border-gray-600 pl-4">
              <p className="text-gray-400">Email Us</p>
              <a
                href="mailto:hi@khakitours.com"
                className="text-[#ABABAB] hover:text-white"
              >
                hi@khakitours.com
              </a>
            </div>
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-[#ABABAB] font-semibold mb-4">VISIT US</h4>
          <p className="text-sm leading-relaxed">
            310, Hari Chambers, 3rd Floor, 58/64, Shahid Bhagat Singh Rd, above Copper Chimney, Fort, Mumbai, Maharashtra 400001.
          </p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mt-12 text-xl text-[#d6b88c]">
        <a href="https://wa.me/918828100111" className="hover:text-white"><i className="fab fa-whatsapp"></i></a>
        <a href="https://www.tripadvisor.in/Attraction_Review-g304554-d11774408-Reviews-Khaki_Tours-Mumbai_Maharashtra.html" className="hover:text-white"><svg fill="#d6b88c" width="30px" height="30px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" data-iconid="306877" data-svgname="Tripadvisor"><path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"></path></svg></a>
        <a href="https://twitter.com/Khaki_Tours" className="hover:text-white"><i class="fa-brands fa-x-twitter"></i></a>
        <a href="https://www.instagram.com/khaki.tours/" className="hover:text-white"><i className="fab fa-instagram"></i></a>
        <a href="https://www.facebook.com/Khaki.tours/" className="hover:text-white"><i className="fab fa-facebook-f"></i></a>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-sm text-gray-400 mt-6">
        All Rights Reserved © Khaki Tours 2026
      </div>
    </footer>
  );
};

export default Footer;
