import { useState } from "react";
import CategorySidebar from "../../components/Sidebar/CategorySidebar";
import ProductCard from "../../components/Product/ProductCard";
import { productData } from "../../../dummydata/BannerData";

// --- Main App Component ---
const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("tshirts");
  
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Changed to flex-row to keep sidebar and main content side-by-side on all screen sizes */}
      <div className="flex flex-row space-x-4 items-start">
        <div className="h-[calc(100vh-9.2rem)] rounded-tr-xl rounded-br-xl top-20 sticky flex items-start overflow-scroll">
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
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
export default CategoryPage;
