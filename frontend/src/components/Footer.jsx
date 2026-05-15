import { FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-white border-t mt-12">

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        {/* LOGO + ABOUT */}
        <div>
          <h2 className="text-xl font-bold text-pink-500">
            ApnaSpace
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Find affordable PGs, flats, and hostels with verified listings and easy booking.
          </p>
        </div>

        {/* EXPLORE */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="hover:text-pink-500 cursor-pointer transition">Home</li>
            <li className="hover:text-pink-500 cursor-pointer transition">Search</li>
            <li className="hover:text-pink-500 cursor-pointer transition">Bookings</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="hover:text-pink-500 cursor-pointer transition">Help Center</li>
            <li className="hover:text-pink-500 cursor-pointer transition">Contact Us</li>
            <li className="hover:text-pink-500 cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Connect</h3>

          <div className="flex gap-4">

            <a
              href="#"
              className="p-2 bg-gray-100 rounded-full hover:bg-pink-100 hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="p-2 bg-gray-100 rounded-full hover:bg-pink-100 hover:text-pink-500 transition"
            >
              <FaTwitter />
            </a>

            <a
              href="mailto:support@apnaspace.com"
              className="p-2 bg-gray-100 rounded-full hover:bg-pink-100 hover:text-pink-500 transition"
            >
              <FaEnvelope />
            </a>

          </div>

          <p className="text-sm text-gray-500 mt-3">
            support@apnaspace.com
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-sm text-gray-400 pb-6">
        © 2026 ApnaSpace. All rights reserved.
      </div>

    </div>
  );
}