import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import logo from "./assets/logo.png";

function RootLayout({ children }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll for sticky header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    const navLinks = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/course" },
    { label: "Events", path: "/event" },
    { label: "Students", path: "/student" },
    { label: "Teachers", path: "/teacher" },
    { label: "Scholarships", path: "/scholarship" },
    { label: "Connect", path: "/contact" },
  ];

  return (
    <>
      {/* HEADER */}
     <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950 shadow-xl"
          : "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Noor Academy Logo" className="lg:w-20 w-16 h-10 lg:h-12" />
          <div>
            <p className="text-xl font-extrabold tracking-wide text-white">NOOR ACADEMY</p>
            <p className="text-sm text-slate-400">International Learning Hub</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8 text-slate-200 font-medium">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={i}>
                  <Link
                    to={link.path}
                    className={`group relative transition ${
                      isActive ? "text-white font-semibold" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute left-0 -bottom-1 h-0.5 bg-emerald-400 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            to="/admin/dashboard"
            className="bg-emerald-400 text-slate-950 px-5 py-2 rounded-full font-semibold shadow-lg shadow-emerald-500/20 hover:bg-emerald-300 transition"
          >
            Admin Panel
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none text-3xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-950 text-white px-6 py-4 space-y-4 rounded-b-3xl shadow-xl shadow-slate-900/40">
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={i}
                to={link.path}
                className={`block rounded-2xl px-4 py-3 transition ${
                  isActive ? "bg-emerald-500 text-white" : "hover:bg-slate-800"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/admin/dashboard"
            className="block bg-emerald-400 text-slate-950 px-4 py-3 rounded-2xl font-semibold text-center shadow-lg shadow-emerald-500/20 hover:bg-emerald-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Admin Panel
          </Link>
        </div>
      )}
    </header>

      {/* MAIN CONTENT */}
      <main className="pt-24">{children}</main>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-cyan-600 to-cyan-400 text-white py-8 mt-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left mb-4 md:mb-0">
            &copy; 2025 Noor Academy. All rights reserved.
          </p>
          <p className="text-center md:text-left mb-4 md:mb-0">
            <a href="https://www.facebook.com/muhammad.samishah.50">Developed By Muhammad Sami Shah</a>
              
          </p>

          {/* Social Icons */}
          <div className="flex space-x-6 text-2xl">
            <a href="https://whatsapp.com/channel/0029VbBCGrfHAdNQwLw85C2L" className="hover:text-black transition">
              <FaWhatsapp />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61573062945099" className="hover:text-black transition">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" className="hover:text-black transition">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@noor_academy_lark?_t=ZS-90IGWzYTer4&_r=1" className="hover:text-black transition" target="_blank" rel="noreferrer">
              <FaTiktok />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default RootLayout;
