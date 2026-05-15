import { useState } from "react";
import api from "../services/api";

export default function Review({ propertyId }) {

  const [rating, setRating] = useState(0);

  const submit = async () => {
    await api.post("/review/add", {
      propertyId,
      ratings: {
        room: rating,
        food: rating,
        wifi: rating,
        cleanliness: rating,
        safety: rating,
        value: rating
      },
      comment: "Nice place"
    });
  };

  return (
    <div className="p-6">

      <h1>Add Review</h1>

      <input type="number" onChange={e => setRating(e.target.value)} />

      <button onClick={submit} className="bg-pink-500 text-white px-4 py-2 ml-2">
        Submit
      </button>

    </div>
  );
}