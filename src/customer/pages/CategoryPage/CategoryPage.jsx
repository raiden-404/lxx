import { useEffect, useState } from "react";
import CategorySidebar from "../../components/Sidebar/CategorySidebar";
import ProductCard from "../../components/Product/ProductCard";
import { useParams } from "react-router-dom";

// --- Main App Component ---
const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const {collection, category} = useParams();
  const [productData ,setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    //basic end point uri
    const baseUri = "http://localhost:8080/public/get-products-by-slug-category";

    //Data need to send
    const params = {
      category: category,
      slug: collection,
    };

    //Use querry uri to send variables to fetch data based on that
    const queryUri = new URLSearchParams(params).toString();

    //Generate full URL by combining baseUri and Query Uri
    const fullUri = `${baseUri}?${queryUri}`;

    //fetch data
    const response = await fetch(fullUri);

    const result = await response.json();
    
    setProductData(result);

  }
    fetchData();
  },[collection,category]);

  useEffect(() => {
    console.log(productData);
  });

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Changed to flex-row to keep sidebar and main content side-by-side on all screen sizes */}
      <div className="flex flex-row items-start max-[400px]:flex-col">
        <div className="h-[calc(100vh-9.2rem)] rounded-tr-xl rounded-br-xl top-20 max-[400px]:top-16 sticky flex items-start overflow-scroll max-[400px]:w-full max-[400px]:h-auto">
          <CategorySidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        {/* // Use flex-1 to make this container take up the remaining space */}
        <main className="flex-1 p-2 sm:p-4 min-w-0">
          {/* Product Grid Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 capitalize">
              {selectedCategory}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {productData.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
export default CategoryPage;
