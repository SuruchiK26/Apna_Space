import { FaShieldAlt, FaRupeeSign, FaCalendarCheck } from "react-icons/fa";

export default function TrustSection() {
  const items = [
    {
      icon: <FaShieldAlt />,
      title: "Verified Listings",
      desc: "All properties are verified for safety and authenticity"
    },
    {
      icon: <FaRupeeSign />,
      title: "Affordable Options",
      desc: "Budget-friendly PGs starting from ₹2000"
    },
    {
      icon: <FaCalendarCheck />,
      title: "Easy Booking",
      desc: "Schedule visits instantly in seconds"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* HEADING */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800">
          Why Choose ApnaSpace?
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          We make your renting journey simple & trustworthy
        </p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white border-2 border-pink-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:border-pink-400 hover:-translate-y-1 transition"
          >

            {/* ICON */}
            <div className="w-12 h-12 mx-auto flex items-center justify-center bg-pink-100 text-pink-500 rounded-full text-xl mb-4">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="font-semibold text-gray-800">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="text-sm text-gray-500 mt-2">
              {item.desc}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}