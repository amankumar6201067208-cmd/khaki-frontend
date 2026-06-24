import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Background/khaki-logo-1.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Walks/Tours", path: "/walk-tours" },
    { name: "Foundation", path: "/foundation" },
    { name: "Khaki Lab", path: "/khaki-lab" },
    { name: "Blog", path: "/blogs" },
    { name: "Contact", path: "/contact-us" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 navbar-mobile
        ${
          scrolled
            ? "bg-[url('/src/assets/Background/snow2.png')]  bg-center shadow-md"
            : "bg-[#FFFFFFB3]"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-2.5 md:px-25 py-1.25 flex items-center justify-between">
        {/* Logo → Home link */}
        <Link to="/">
          <img src={logo} alt="Khaki Tours" className="h-16.75 sm:h-22.5" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 text-sm font-semibold uppercase">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`hover:text-orange-600 transition-colors ${
                  scrolled ? "text-black" : "text-black"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-md transition-colors ${
            scrolled
              ? "text-black hover:bg-white/10"
              : "text-black hover:bg-black/10"
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden ${
            scrolled ? "bg-[url('/src/assets/Background/snow2.png')] backdrop-blur-sm" : "bg-[url('/src/assets/Background/snow2.png')]"
          }`}
        >
          <ul className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm font-semibold uppercase hover:text-orange-600 transition-colors py-2 ${
                    scrolled ? "text-black" : "text-black"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;