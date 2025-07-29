import { useParams } from "react-router-dom";
import { categories } from "../../../dummydata/CategoryData";
import { Link } from "react-router-dom";

const CategorySidebar = ({ selectedCategory, setSelectedCategory }) => {
  const {collection, collectionId,categoryId} = useParams();
  setSelectedCategory(categoryId);
  return (
    // Use responsive widths: narrow on mobile, wider on larger screens.
    <aside className="w-20 sm:w-24 md:w-28 lg:w-40 flex-shrink-0 bg-white shadow-md pt-3 h-fit">
      <h2 className="text-lg font-bold my-4 text-gray-800 text-center sr-only lg:not-sr-only">Categories</h2>
      <nav>
        <ul className="space-y-2 p-2">
          {categories.map((categ) => {
            const isSelected = selectedCategory === categ.key;
            return (
            <Link to={`/collection/${collection}/${collectionId}/${categ.name}/${categ.key}`}>
              <li key={categ.key}>
                <button
                  onClick={() => setSelectedCategory(categ.key)}
                  className={`w-full flex flex-col items-center p-2 rounded-lg transition-all duration-200 ease-in-out ${
                    isSelected
                      ? 'bg-pink-200'
                      : 'hover:bg-pink-100'
                  }`}
                >
                  <div className={`p-1 rounded-full transition-all duration-200 ${isSelected ? 'ring-2 ring-pink-500' : ''}`}>
                    <img src={categ.imageUrl} alt={categ.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"/>
                  </div>
                  <span className={`font-semibold text-xs mt-1 text-center ${isSelected ? 'text-pink-600' : 'text-gray-700'}`}>{categ.name}</span>
                </button>
              </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
export default CategorySidebar;