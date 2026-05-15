import PropertyCard from "./PropertyCard";

export default function PropertySection({ properties }) {

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Available Properties</h2>
        <button className="text-pink-500 text-sm">View All</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          properties.map((p) => (
            <PropertyCard key={p._id} p={p} />
          ))
        )}

      </div>

    </div>
  );
}