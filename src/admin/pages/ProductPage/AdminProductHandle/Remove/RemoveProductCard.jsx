import { Pen, Trash } from "lucide-react";

const StarIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const RemoveProductCard = ({ product, ref, setIsDialogueOpen, setAction, setActionId }) => {
  return (
    <div ref={ref} className="hover:bg-slate-600/20 w-full h-44 bg-transparent rounded-lg shadow-md shadow-gray-500/40 overflow-hidden flex flex-col sm:flex-row items-center font-sans">
      {/* Product Image */}
      <div className=" h-full aspect-square flex-shrink-0 border border-black">
        <img
          className=" object-cover h-full border border-black"
          src={product.imageUrl}
          alt={product.title}
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/e2e8f0/4a5568?text=Image+Not+Found'; }}
        />
      </div>

      {/* Product Details */}
      <div className="p-4 md:p-6 flex-grow flex flex-col justify-between w-full">
        <div>
          <p className="text-sm text-pink-600 font-bold mb-1">ID: {product.id}</p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-400 truncate" title={product.title}>
            {product.title}
          </h2>
          
          {/* Rating and Reviews */}
          <div className="flex items-center mt-2 text-gray-400">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(product.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">{product.averageRating.toFixed(1)}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm">{product.reviewCount} reviews</span>
          </div>

          {/* Price */}
          <p className="mt-3 text-2xl md:text-3xl font-extrabold text-green-400">
            ${product.sellingPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 flex sm:flex-col justify-around sm:justify-center items-center space-x-4 sm:space-x-0 sm:space-y-4 w-full sm:w-auto">
        <button 
          onClick={() => {setAction("EDIT");setActionId(product.id);setIsDialogueOpen(true)}}
          aria-label="Edit product"
          className="p-3 rounded-full text-yellow-400 bg-gray-400/20 hover:bg-gray-300/30"
        >
          <Pen />
        </button>
        <button 
          onClick={() => {setAction("DELETE");setActionId(product.id);setIsDialogueOpen(true)}} 
          aria-label="Remove product"
          className="p-3 rounded-full text-red-600 bg-gray-400/20 hover:bg-gray-300/30"
        >
          <Trash />
        </button>
      </div>
      {/* Confirm delete option dailog */}
      <div className="fixed z-20 bg-white">

      </div>
    </div>
  );
};

export default RemoveProductCard;
