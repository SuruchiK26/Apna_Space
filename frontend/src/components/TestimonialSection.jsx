import { useEffect, useState } from "react";

export default function TestimonialSection() {

  const data = [
    {
      name: "Rohit Sharma",
      role: "Student, Indore",
      text: "Found a perfect PG within my budget. Super smooth experience!",
      img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Priya Mehta",
      role: "Software Engineer, Pune",
      text: "Filters are amazing and listings are genuine!",
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Aman Verma",
      role: "Working Professional, Delhi",
      text: "Clean UI and transparent pricing. Loved it!",
      img: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      name: "Neha Gupta",
      role: "Student, Bhopal",
      text: "Affordable and easy to find PGs. Highly recommend!",
      img: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: "Karan Singh",
      role: "Engineer, Bangalore",
      text: "Saved me a lot of time searching for flats!",
      img: "https://randomuser.me/api/portraits/men/12.jpg"
    }
  ];

  const [index, setIndex] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev + 1 >= data.length - 2 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-pink-50 py-14">

      <div className="max-w-6xl mx-auto px-6">

        {/* HEADING */}
        <h2 className="text-3xl font-semibold text-center mb-10">
          What Our Users Say 💬
        </h2>

        {/* CAROUSEL */}
        <div className="overflow-hidden">

          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${index * 33.33}%)`
            }}
          >

            {data.map((item, i) => (
              <div
                key={i}
                className="w-1/3 px-3 flex-shrink-0"
              >

                <div className="bg-white border-2 border-pink-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition h-full flex flex-col justify-between">

                  {/* USER */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={item.img}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-xs text-gray-500">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* STARS */}
                  <div className="text-yellow-400 mb-2">
                    ⭐⭐⭐⭐⭐
                  </div>

                  {/* TEXT */}
                  <p className="text-sm text-gray-600">
                    “{item.text}”
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}