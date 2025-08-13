import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const CategorySidebar = ({ selectedCategory, setSelectedCategory }) => {
  const {collection, category} = useParams();
  const [categories, setCategories] = useState([]);
  
  
  useEffect(() => {
    if(category) {
      setSelectedCategory(category);
    }
  },[category, setSelectedCategory]);
  //function to fetch data
  const fetchData = useCallback(async () => {
    const allData = {categoryName : "All", categorySlug : collection, imageUrl : "https://img.freepik.com/premium-vector/lx-letter-linked-logo-business-company-identity-initial-letter-lx-logo-vector-template_754537-800.jpg"};
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

    const finalResult = [allData, ...result];

    setCategories(finalResult);
  }, [collection, setCategories]);

  useEffect(() => {
    //Calling fetch funtion here
    fetchData();
  },[fetchData]);

  return (
    // Use responsive widths: narrow on mobile, wider on larger screens.
    <div className="w-auto flex-shrink-0 bg-white shadow-md pt-3 max-[400px]:pt-1 h-fit max-[400px]:w-auto max-[400px]:h-auto max-[400px]:gap-4">
      <h2 className="text-lg font-bold my-4 text-gray-800 text-center sr-only lg:not-sr-only">Categories</h2>
      <nav>
        <ul className="space-y-2 max-[400px]:space-y-0 max-[400px]:flex max-[400px]:flex-row max-[400px]:gap-2 p-2 px-4">
          {categories.map((categ) => {
            const isSelected = selectedCategory === categ.categoryName;
            return (
            <Link key={categ.categoryName} to={`/collection/${collection}/${categ.categoryName}`}>
              <li>
                <button
                  onClick={() => setSelectedCategory(categ.categoryName)}
                  className={`w-full max-[400px]:w-auto h-full flex flex-col items-center p-2 rounded-lg transition-all duration-200 ease-in-out ${
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
    </div>
  );
};
export default CategorySidebar;