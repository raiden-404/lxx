import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "New Arrivals",
    subText: "Branded and Stylish New Arrivals",
    image:
      "https://img.freepik.com/free-psd/valentines-love-podium-with-hearts-gifts-isolated-3d-render_47987-12203.jpg?semt=ais_items_boosted&w=740",
    colSpan: "md:col-span-2",
    category : {
        name : "T-Shirts",
        key : "t-shirt"
      }
  },
  {
    id: 2,
    name: "Accessories",
    subText: "Different Products",
    image:
      "https://images.meesho.com/images/products/468555631/jsumm_512.webp",
    category : {
        name : "Shirts",
        key : "shirts"
      }
  },
  {
    id: 3,
    name: "Children Items",
    subText: "Your Kids Love this",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-notebook-label-collection_23-2149834116.jpg",
    category : {
        name : "Shoes",
        key : "shoes"
      }
  },
  {
    id: 4,
    name: "Love Space",
    subText: "Best Love Gifts",
    image:
      "https://www.onlinedelivery.in/images/detailed/36/Bringing_the_garden_to_you__1__7ubi-q5.png",
    category : {
        name : "Love",
        key : "love"
      }
  },
  {
    id: 5,
    name: "Kitchen Items",
    subText: "All love for your Kitchen",
    image:
      "https://images.woodenstreet.de/image/cache/data/Purezento/white-and-blue-handpainted-ceramic-tea-cup-set-of-4/P-2-810x702.jpg",
    category : {
        name : "Mugs",
        key : "mugs"
      }
  },
];

const HomeCategoryGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
        <a href="#" className="text-sm font-semibold text-pink-600 hover:underline">
          Browse all categories &rarr;
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`relative overflow-hidden rounded-xl shadow cursor-pointer hover:opacity-90 transition duration-300 group ${category.colSpan || ""}`}
          >
          <Link to={`/collection/${category.name.replace(/\s+/g,"+")}/id=${category.id}/${category.category.name.replace(/\s+/g,"+")}/${category.category.key}`}>
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm">{category.subText}</p>
            </div>
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategoryGrid;
