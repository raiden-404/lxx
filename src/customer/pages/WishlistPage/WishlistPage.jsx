import { useDispatch, useSelector } from "react-redux";
import { AddItemAtFirst, addItem, removeItem } from "../../../features/cart/cartSlice";
import { removeItemFromWishlist } from "../../../features/wishlist/wishlistSlice";
import { Link } from "react-router-dom";

// --- SVG Icons (Self-contained) ---
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-pink-500"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "#FFC107" : "none"}
    stroke="#FFC107"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

// --- Rating Component ---
const Rating = ({ rating, reviewCount }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(totalStars)].map((_, index) => (
          <StarIcon key={index} filled={index < filledStars} />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        ({reviewCount.toLocaleString()})
      </span>
    </div>
  );
};

const WishlistItem = ({ item, quantity }) => {
  const dispatch = useDispatch();

  //Methods to handle cart change
  const handleItemAtFirst = ({ id, name, mrp, sellingPrice, image }) => {
    const product = {
      productId: id,
      productImage: image,
      productMrp: mrp,
      productName: name,
      productSellPrice: sellingPrice,
      quantity: 1,
    };
    dispatch(AddItemAtFirst(product));
  };

  const handleAddItemInCart = () => {
    const product = {
      id: item.productId,
      quantity: 1,
    };
    dispatch(addItem(product));
  };

  const handleRemoveItemFromCart = () => {
    const product = {
      id: item.productId,
      quantity: 1,
    };
    dispatch(removeItem(product));
  };

  //Method for wishlist change
  const handleRemoveItemFromWishlist = () => {
    dispatch(removeItemFromWishlist(item.productId));
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col sm:flex-row">
      {/* Image */}
      <div className="w-full sm:w-48 flex-shrink-0">
        <img
          src={item.image}
          alt={item.productName}
          className="w-full h-48 sm:h-full object-cover"
          // Error image
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x400/f8fafc/334155?text=Image+Not+Found";
          }}
        />
      </div>
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h2
          className="text-lg font-bold text-gray-900"
          title={item.productName}
        >
          {item.productName}
        </h2>

        <div className="flex items-center justify-start gap-5 mt-2">
          <p className="text-xl font-semibold">
            ${item.sellingPrice.toFixed(2)}
          </p>
          <Rating rating={item.rating} reviewCount={item.reviewCount} />
        </div>

        <div className="mt-auto pt-4 flex items-center justify-start gap-8">
          {quantity === 0 ? (
            <button
              onClick={() =>
                handleItemAtFirst({
                  id: item.productId,
                  name: item.productName,
                  mrp: item.mrp,
                  sellingPrice: item.sellingPrice,
                  image: item.image,
                })
              }
              className="bg-pink-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-pink-700 transition-colors duration-300"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleRemoveItemFromCart}
                className="w-8 h-8 flex items-center justify-center text-lg font-bold bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-bold text-lg">{quantity}</span>
              <button
                onClick={handleAddItemInCart}
                className="w-8 h-8 flex items-center justify-center text-lg font-bold bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                +
              </button>
            </div>
          )}

          <button
            onClick={() => handleRemoveItemFromWishlist(item.id)}
            className="p-2.5 border border-gray-300 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors duration-300"
            aria-label="Remove from wishlist"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.items);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="flex items-center mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-800 mr-3">
                My Wishlist
              </h1>
              <HeartIcon />
            </div>
            <div className="text-left sm:text-right">
              <p className="text-gray-600 font-bold">
                {wishlist !== null ? wishlist.length : 0} items
              </p>
            </div>
          </header>

          {/* Wishlist List */}
          {wishlist != null && wishlist.length > 0 ? (
            <div className="flex flex-col gap-6">
              {wishlist.map((item) => {
                let quantity = 0;
                if (cart !== null) {
                  const isItem = cart.items.find(
                    (cartItem) => item.productId == cartItem.productId
                  );
                  quantity = isItem ? isItem.quantity : 0;
                } return (
                <WishlistItem
                  key={item.productId}
                  item={item}
                  quantity={quantity}
                />)
              })}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-20 px-6 bg-white rounded-xl shadow-md">
              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                Your Wishlist is Empty
              </h2>
              <p className="mt-2 text-gray-600">
                Looks like you haven't added anything yet. Start exploring and
                add items you love!
              </p>
              <Link to="/">
              <button className="mt-6 bg-pink-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-pink-700 transition-colors duration-300">
                Start Shopping
              </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Wishlist;
