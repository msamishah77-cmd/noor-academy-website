import RootLayout from "./RootLayout";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

function Connect() {
  return (
    <RootLayout>
      <section className="bg-gradient-to-r from-cyan-600 to-cyan-400 text-white py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Connect With Noor Academy</h2>
        <p className="max-w-2xl mx-auto mb-12 text-lg text-white/90">
          Stay connected with us through social media. Follow, message, and be
          part of our growing Noor Academy community!
        </p>

        <div className="flex justify-center lg:gap-10 gap-2.5 flex-wrap">
          {/* WhatsApp */}
          <a
            href="https://whatsapp.com/channel/0029VbBCGrfHAdNQwLw85C2L"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 transition p-5 rounded-full shadow-lg"
          >
            <FaWhatsapp size={30} />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61573062945099"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 transition p-5 rounded-full shadow-lg"
          >
            <FaFacebookF size={30} />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 transition p-5 rounded-full shadow-lg"
          >
            <FaInstagram size={30} />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@noor_academy_lark?_t=ZS-90IGWzYTer4&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-gray-900 transition p-5 rounded-full shadow-lg"
          >
            <FaTiktok size={30} />
          </a>
        </div>

        <p className="mt-12 text-sm text-white/80">
          © {new Date().getFullYear()} Noor Academy. All Rights Reserved.
        </p>
      </section>
    </RootLayout>
  );
}

export default Connect;
