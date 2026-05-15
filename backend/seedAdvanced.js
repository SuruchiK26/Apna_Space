const mongoose = require("mongoose");
require("dotenv").config();

const Property = require("./models/Property");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    console.log("Connected for advanced seeding...");

    await Property.deleteMany();

    const cities = [
      { city: "Bhilai", areas: ["Vijay Nagar", "Palasia", "Rajendra Nagar"] },
      { city: "Bhopal", areas: ["MP Nagar", "Kolar", "Arera Colony"] },
      { city: "Pune", areas: ["Hinjewadi", "Wakad", "Baner"] },
      { city: "Delhi", areas: ["Laxmi Nagar", "Saket", "Dwarka"] },
      { city: "Bangalore", areas: ["Whitefield", "BTM", "Electronic City"] }
    ];

    const facilitiesList = ["WiFi", "Food", "AC", "Parking", "Laundry"];
    const types = ["PG", "Hostel", "Flat"];
    const genders = ["boys", "girls", "any"];
    const categories = ["student", "working", "family"];

    const images = [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    ];

    const data = [];

    for (let i = 1; i <= 100; i++) {

      const cityObj = cities[Math.floor(Math.random() * cities.length)];
      const area = cityObj.areas[Math.floor(Math.random() * cityObj.areas.length)];

      const price = 2000 + Math.floor(Math.random() * 8000);

      const property = {
        title: `${types[i % 3]} in ${area}`,
        location: `${area}, ${cityObj.city}`,

        price: price,
        deposit: price * 2,
        electricity: 300 + Math.floor(Math.random() * 700),
        foodCost: Math.random() > 0.5 ? 1200 + Math.floor(Math.random() * 1500) : 0,

        facilities: facilitiesList.slice(0, Math.floor(Math.random() * 5) + 1),

        category: categories[i % 3],
        genderPreference: genders[i % 3],

        images: [images[i % 3]],
        video: "",

        verified: Math.random() > 0.3,

        availability:
          i % 5 === 0 ? "occupied" :
          i % 4 === 0 ? "next_month" :
          "available",

        avgRating: (3 + Math.random() * 2).toFixed(1),
        totalReviews: Math.floor(Math.random() * 50),

        coordinates: {
          lat: 22.7 + Math.random() * 0.1,
          lng: 75.8 + Math.random() * 0.1
        }
      };

      data.push(property);
    }

    await Property.insertMany(data);

    console.log("🔥 100+ realistic properties inserted!");
    process.exit();

  })
  .catch(err => console.log(err));