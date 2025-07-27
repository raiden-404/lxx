import { useState } from 'react';
import { categories } from '../../../dummydata/CategoryData';
import CategorySidebar from "../../components/Sidebar/CategorySidebar"

// --- Helper: Star Rating Component ---
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>);
    } else {
      stars.push(<svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>);
    }
  }
  return <div className="flex items-center">{stars}</div>;
};

// --- Dummy Data ---
const dummyData = {
  shirts: [
    { id: 1, name: 'Classic Oxford Shirt', price: '45.00', imageUrl: 'https://placehold.co/400x400/A5B4FC/312E81?text=Oxford+Shirt', rating: 4 },
    { id: 2, name: 'Linen-Blend Shirt', price: '55.00', imageUrl: 'https://placehold.co/400x400/C7D2FE/312E81?text=Linen+Shirt', rating: 5 },
    { id: 3, name: 'Denim Workshirt', price: '65.00', imageUrl: 'https://placehold.co/400x400/818CF8/FFFFFF?text=Denim+Shirt', rating: 4 },
    { id: 4, name: 'Flannel Plaid Shirt', price: '50.00', imageUrl: 'https://placehold.co/400x400/6366F1/FFFFFF?text=Flannel+Shirt', rating: 5 },
  ],
  mugs: [
    { id: 1, name: 'Classic Oxford Shirt', price: '45.00', imageUrl: 'https://placehold.co/400x400/A5B4FC/312E81?text=Oxford+Shirt', rating: 4 },
    { id: 2, name: 'Linen-Blend Shirt', price: '55.00', imageUrl: 'https://placehold.co/400x400/C7D2FE/312E81?text=Linen+Shirt', rating: 5 },
    { id: 3, name: 'Denim Workshirt', price: '65.00', imageUrl: 'https://placehold.co/400x400/818CF8/FFFFFF?text=Denim+Shirt', rating: 4 },
    { id: 4, name: 'Flannel Plaid Shirt', price: '50.00', imageUrl: 'https://placehold.co/400x400/6366F1/FFFFFF?text=Flannel+Shirt', rating: 5 },
  ],
  tshirts: [
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 5, name: 'Crewneck Pocket Tee', price: '25.00', imageUrl: 'https://placehold.co/400x400/a78bfa/3b0764?text=Crewneck+Tee', rating: 5 },
    { id: 6, name: 'V-Neck Supima Cotton Tee', price: '30.00', imageUrl: 'https://placehold.co/400x400/c4b5fd/4c1d95?text=V-Neck+Tee', rating: 4 },
    { id: 7, name: 'Graphic Print Tee', price: '35.00', imageUrl: 'https://placehold.co/400x400/8b5cf6/f5f3ff?text=Graphic+Tee', rating: 4 },
    { id: 8, name: 'Long-Sleeve Henley', price: '40.00', imageUrl: 'https://placehold.co/400x400/7c3aed/f5f3ff?text=Henley+Tee', rating: 5 },
  ],
  shoes: [
    { id: 9, name: 'Leather Derby Shoes', price: '120.00', imageUrl: 'https://placehold.co/400x400/FCA5A5/7F1D1D?text=Derby+Shoes', rating: 5 },
    { id: 10, name: 'Suede Chukka Boots', price: '140.00', imageUrl: 'https://placehold.co/400x400/FDBA74/854D0E?text=Chukka+Boots', rating: 4 },
    { id: 11, name: 'Canvas Low-Top Sneakers', price: '80.00', imageUrl: 'https://placehold.co/400x400/F9A8D4/831843?text=Sneakers', rating: 5 },
    { id: 12, name: 'Running Shoes', price: '110.00', imageUrl: 'https://placehold.co/400x400/6EE7B7/064E3B?text=Running+Shoes', rating: 4 },
  ],
  accessories: [
    { id: 13, name: 'Leather Belt', price: '40.00', imageUrl: 'https://placehold.co/400x400/9CA3AF/1F2937?text=Leather+Belt', rating: 4 },
    { id: 14, name: 'Knit Beanie', price: '25.00', imageUrl: 'https://placehold.co/400x400/6B7280/F9FAFB?text=Knit+Beanie', rating: 5 },
    { id: 15, name: 'Canvas Backpack', price: '90.00', imageUrl: 'https://placehold.co/400x400/4B5563/F9FAFB?text=Backpack', rating: 5 },
    { id: 16, name: 'Aviator Sunglasses', price: '75.00', imageUrl: 'https://placehold.co/400x400/374151/F9FAFB?text=Sunglasses', rating: 4 },
  ],
};



const popularDeals = [
    { name: 'Freedom Sale', imageUrl: 'https://placehold.co/150x150/ef4444/ffffff?text=SALE' },
    { name: 'Back to Campus', imageUrl: 'https://placehold.co/150x150/22c55e/ffffff?text=DEALS' },
    { name: 'Mega Deals', imageUrl: 'https://placehold.co/150x150/f97316/ffffff?text=MEGA' },
    { name: "Kid's Zone", imageUrl: 'https://placehold.co/150x150/3b82f6/ffffff?text=KIDS' },
    { name: 'Makeup Mania', imageUrl: 'https://placehold.co/150x150/ec4899/ffffff?text=Beauty' },
];


// --- Sidebar Component ---


// --- Product Card Component ---
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden group transform hover:-translate-y-1 transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-32 sm:h-40 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/ff0000/ffffff?text=Image+Error'; }}
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
            <p className="text-md font-bold text-gray-900">${product.price}</p>
            <StarRating rating={product.rating} />
        </div>
        <button className="w-full mt-3 bg-blue-600 text-white py-1.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-xs">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// --- Main Content Area ---
const MainContent = ({ products}) => {
  return (
    // Use flex-1 to make this container take up the remaining space
    <main className="flex-1 p-2 sm:p-4 min-w-0">
      {/* Product Grid Section */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 capitalize">{products.key}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {products.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};


// --- Main App Component ---
const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('tshirts');

  const productsToShow = {
      key: categories.find(c => c.key === selectedCategory)?.name || 'Products',
      items: dummyData[selectedCategory] || []
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
        {/* Changed to flex-row to keep sidebar and main content side-by-side on all screen sizes */}
        <div className="flex flex-row space-x-4 items-start">
          <div className='h-[calc(100vh-6.2rem)] rounded-tr-xl rounded-br-xl top-20 sticky flex items-start overflow-scroll'>
            <CategorySidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </div>
          <MainContent products={productsToShow} deals={popularDeals} />
        </div>
    </div>
  );
}
export default CategoryPage;
