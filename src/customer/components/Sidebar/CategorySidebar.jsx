import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CategorySidebar = ({ selectedCategory, setSelectedCategory }) => {
  const {collection, category} = useParams();
  setSelectedCategory(category);
  const [categories, setCategories] = useState([{categoryName : "All", categorySlug : collection, imageUrl : "https://img.freepik.com/premium-vector/lx-letter-linked-logo-business-company-identity-initial-letter-lx-logo-vector-template_754537-800.jpg"}]);
  useEffect(() => {
    //Calling fetch funtion here
    fetchData();
  },[]);

  //function to fetch data
  const fetchData = async () => {
    //backend api endpoint to fetch all category for that slug
    const baseUri = "http://localhost:8080/public/get-slug-category";
    
    //Data to send for getting return data according to that
    const params = {
      slug: collection,
    };

    //Generate Query uri using params obj to created to send data in GET method
    const queryUri = new URLSearchParams(params).toString();

    //Combine baseUrl and queryUrl to generate full last URL
    //Use ? to generate variable in uri then & to add extras
    const fullUri = `${baseUri}?${queryUri}`;


    //Making get call using this Uri
    //response-promise
    const response = await fetch(fullUri);

    //Change into result
    const result = await response.json();
    setCategories(prevItem => [...prevItem, ...result]);
  }

  return (
    // Use responsive widths: narrow on mobile, wider on larger screens.
    <aside className="w-20 sm:w-24 md:w-28 lg:w-40 flex-shrink-0 bg-white shadow-md pt-3 h-fit">
      <h2 className="text-lg font-bold my-4 text-gray-800 text-center sr-only lg:not-sr-only">Categories</h2>
      <nav>
        <ul className="space-y-2 p-2">
          {categories.map((categ) => {
            const isSelected = selectedCategory === categ.categoryName;
            return (
            <Link to={`/collection/${collection}/${categ.categoryName}`}>
              <li key={categ.categoryName}>
                <button
                  onClick={() => setSelectedCategory(categ.categoryName)}
                  className={`w-full flex flex-col items-center p-2 rounded-lg transition-all duration-200 ease-in-out ${
                    isSelected
                      ? 'bg-pink-200'
                      : 'hover:bg-pink-100'
                  }`}
                >
                  <div className={`p-1 rounded-full transition-all duration-200 ${isSelected ? 'ring-2 ring-pink-500' : ''}`}>
                    <img src={categ.imageUrl} alt={categ.categoryName} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"/>
                  </div>
                  <span className={`font-semibold text-xs mt-1 text-center ${isSelected ? 'text-pink-600' : 'text-gray-700'}`}>{categ.categoryName}</span>
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