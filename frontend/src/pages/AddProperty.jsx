import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProperty } from "../services/propertyService";
import Navbar from "../components/Navbar";

const seaterOptions = ["1", "2", "3", "4", "5+"];
const facilityOptions = ["Wifi", "Cooler", "AC", "Parking", "Kitchen", "Laundry", "Cleaning"];
const propertyTypeOptions = ["PG", "Hostel", "Flat"];
const imageCategories = ["Room", "Kitchen", "Bathroom", "Living Area"];
const MAX_IMAGES_PER_CATEGORY = 10;
const allowedTypes = ["image/jpeg", "image/png"];

function SectionCard({ title, subtitle, icon, children }) {
  return (
    <section className="rounded-[2rem] border border-pink-100 bg-white/90 p-6 shadow-sm shadow-pink-100 transition hover:shadow-pink-200/40">
      <div className="mb-5 flex items-start gap-4">
        <div className="mt-1 h-12 w-12 shrink-0 rounded-3xl bg-pink-50 text-center text-2xl leading-12 text-pink-600 shadow-sm">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function InputArea({ label, name, value, placeholder, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-3xl border border-pink-200 bg-pink-50/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
      />
    </label>
  );
}

function TextArea({ label, name, value, placeholder, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
        className="w-full rounded-3xl border border-pink-200 bg-pink-50/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
      />
    </label>
  );
}

function OptionButton({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-3xl border px-4 py-3 text-sm font-medium transition ${
        active
          ? "border-pink-500 bg-pink-500 text-white shadow-sm shadow-pink-300/40"
          : "border-pink-200 bg-white text-slate-700 hover:border-pink-300 hover:bg-pink-50"
      }`}
    >
      {label}
    </button>
  );
}

export default function AddProperty() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    location: "",
    landmarks: "",
    coordinates: { lat: null, lng: null },
    type: "",
    price: "",
    electricity: "",
    foodCost: "",
    seater: "",
    facilities: [],
    description: ""
  });

  const [imageSections, setImageSections] = useState(
    imageCategories.reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {})
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setForm((prev) => ({
            ...prev,
            coordinates: { lat: latitude, lng: longitude }
          }));

          // Reverse geocoding using Nominatim
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
            );
            const data = await response.json();
            if (data && data.display_name) {
              setForm((prev) => ({
                ...prev,
                location: data.display_name
              }));
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            alert("Could not fetch address, but coordinates are set.");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please check your browser settings.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSelectSeater = (value) => {
    setForm((prev) => ({ ...prev, seater: value }));
  };

  const handleSelectType = (value) => {
    setForm((prev) => ({ ...prev, type: value }));
  };

  const handleToggleFacility = (facility) => {
    setForm((prev) => {
      const hasFacility = prev.facilities.includes(facility);
      return {
        ...prev,
        facilities: hasFacility
          ? prev.facilities.filter((item) => item !== facility)
          : [...prev.facilities, facility]
      };
    });
  };

  const handleImageUpload = (category, event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter((file) => allowedTypes.includes(file.type));
    if (validFiles.length !== files.length) {
      alert("Only JPG and PNG images are allowed.");
    }

    setImageSections((prev) => {
      const currentImages = prev[category] || [];
      const availableSlots = MAX_IMAGES_PER_CATEGORY - currentImages.length;
      const nextFiles = validFiles.slice(0, availableSlots).map((file) => ({
        id: `${category}-${file.name}-${file.size}-${Date.now()}`,
        file,
        preview: URL.createObjectURL(file)
      }));

      if (availableSlots < validFiles.length) {
        alert(`You can upload up to ${MAX_IMAGES_PER_CATEGORY} images for ${category}.`);
      }

      return {
        ...prev,
        [category]: [...currentImages, ...nextFiles]
      };
    });

    event.target.value = null;
  };

  const handleRemoveImage = (category, id) => {
    setImageSections((prev) => {
      const nextImages = prev[category].filter((image) => image.id !== id);
      return { ...prev, [category]: nextImages };
    });
  };

  useEffect(() => {
    return () => {
      Object.values(imageSections).flat().forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [imageSections]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.title || !form.location || !form.type || !form.price || !form.seater) {
      alert("Please fill in all required fields: Title, Location, Property Type, Price, and Seater");
      return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("location", form.location);
    data.append("landmarks", form.landmarks);
    if (form.coordinates.lat && form.coordinates.lng) {
      data.append("coordinates[lat]", form.coordinates.lat);
      data.append("coordinates[lng]", form.coordinates.lng);
    }
    data.append("type", form.type);
    data.append("price", form.price);
    data.append("electricity", form.electricity);
    data.append("foodCost", form.foodCost);
    data.append("seater", form.seater);
    data.append("facilities", form.facilities.join(","));
    data.append("description", form.description);

    Object.values(imageSections).flat().forEach((image) => {
      data.append("images", image.file);
    });

    try {
      setLoading(true);
      const response = await addProperty(data);
      alert("Property added successfully!");
      navigate("/");
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || "Unknown error";
      console.error("Full error:", err);
      alert(`Unable to add property: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-[2rem] border border-pink-100 bg-white/80 px-6 py-8 shadow-[0_18px_60px_-40px_rgba(236,72,153,0.45)]">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-pink-500">Create a new listing</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-pink-500">Add Property</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Build a beautiful property listing with clear sections, image previews, and polished controls.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <SectionCard
              title="Basic Details"
              subtitle="Add the location, title, and rates for your property."
              icon="🏠"
            >
              <div className="grid gap-4 lg:grid-cols-2">
                <InputArea
                  label="Title"
                  name="title"
                  value={form.title}
                  placeholder="Elegant studio near city center"
                  onChange={handleChange}
                />
                <div>
                  <InputArea
                    label="Location"
                    name="location"
                    value={form.location}
                    placeholder="Mumbai, India"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="mt-2 rounded-3xl bg-pink-500 px-4 py-2 text-sm text-white hover:bg-pink-600"
                  >
                    Use Current Location
                  </button>
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <InputArea
                  label="Near Landmarks"
                  name="landmarks"
                  value={form.landmarks}
                  placeholder="e.g. Near Central Mall, 5 min from Metro Station"
                  onChange={handleChange}
                />
                <InputArea
                  label="Price per month"
                  name="price"
                  type="number"
                  value={form.price}
                  placeholder="e.g. 25000"
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <InputArea
                  label="Electricity Cost"
                  name="electricity"
                  value={form.electricity}
                  placeholder="e.g. 3500"
                  onChange={handleChange}
                />
                <InputArea
                  label="Food Cost (optional)"
                  name="foodCost"
                  value={form.foodCost}
                  placeholder="e.g. 5000"
                  onChange={handleChange}
                />
              </div>
            </SectionCard>

            <SectionCard
              title="Accommodation"
              subtitle="Choose the property type, number of seats and available facilities."
              icon="🛏️"
            >
              <div>
                <p className="mb-3 text-sm font-medium text-slate-700">Property Type</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {propertyTypeOptions.map((option) => (
                    <OptionButton
                      key={option}
                      label={option}
                      active={form.type === option}
                      onClick={() => handleSelectType(option)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-slate-700">Seater</p>
                <div className="grid gap-3 sm:grid-cols-5">
                  {seaterOptions.map((option) => (
                    <OptionButton
                      key={option}
                      label={option}
                      active={form.seater === option}
                      onClick={() => handleSelectSeater(option)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-slate-700">Facilities</p>
                <div className="flex flex-wrap gap-3">
                  {facilityOptions.map((facility) => (
                    <OptionButton
                      key={facility}
                      label={facility}
                      active={form.facilities.includes(facility)}
                      onClick={() => handleToggleFacility(facility)}
                    />
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Images Upload"
              subtitle="Upload up to 10 JPG or PNG images for each category."
              icon="🖼️"
            >
              <div className="space-y-5">
                {imageCategories.map((category) => (
                  <div key={category} className="rounded-2xl border border-pink-100 bg-pink-50/50 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{category}</p>
                        <p className="text-xs text-slate-500">
                          {imageSections[category].length}/{MAX_IMAGES_PER_CATEGORY} images
                        </p>
                      </div>
                      <label className="cursor-pointer">
                        <span className="rounded-xl bg-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600 transition inline-block">
                          + Add Image
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/jpeg,image/png"
                          onChange={(e) => handleImageUpload(category, e)}
                          hidden
                        />
                      </label>
                    </div>

                    {imageSections[category].length > 0 && (
                      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {imageSections[category].map((image) => (
                          <div key={image.id} className="group relative">
                            <img
                              src={image.preview}
                              alt={`${category}-${image.id}`}
                              className="h-24 w-24 rounded-xl object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(category, image.id)}
                              className="absolute -right-2 -top-2 hidden h-6 w-6 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 group-hover:flex items-center justify-center transition"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title="Description"
              subtitle="Tell us more about your property"
              icon="📝"
            >
              <TextArea
                label="Description"
                name="description"
                value={form.description}
                placeholder="Describe your property in detail..."
                onChange={handleChange}
              />
            </SectionCard>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 rounded-3xl border border-pink-200 bg-white px-6 py-3 text-center font-medium text-slate-700 hover:bg-pink-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-3xl bg-pink-500 px-6 py-3 text-center font-medium text-white hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? "Adding Property..." : "Add Property"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}