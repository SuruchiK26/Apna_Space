import { useState } from "react";
import api from "../services/api";

export default function Booking({ propertyId }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const book = async () => {
    await api.post("/booking/book", {
      propertyId,
      date,
      timeSlot: time
    });

    alert("Booking Done");
  };

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">Book Visit</h1>

      <input type="date" onChange={e => setDate(e.target.value)} className="border p-2"/>

      <select onChange={e => setTime(e.target.value)} className="border p-2 ml-2">
        <option>10AM</option>
        <option>2PM</option>
      </select>

      <button onClick={book} className="bg-pink-500 text-white px-4 py-2 ml-2 rounded">
        Confirm
      </button>

    </div>
  );
}