import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeCategoryGrid = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    const apiUri = `${import.meta.env.VITE_API_URL}/public/get-home-category-grid`;
    const response = await fetch(apiUri);
    const result = await response.json();
    setCategories(result);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`relative overflow-hidden rounded-xl shadow cursor-pointer hover:opacity-90 transition duration-300 group ${category.value === 'new-arrivals' ? 'md:col-span-2' : ''}`}
          >
          <Link to={`/collection/${category.value.replace(/\s+/g,"+")}/All`}>
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm">{category.description}</p>
            </div>
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategoryGrid;
