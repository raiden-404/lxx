import { Link } from "react-router-dom";
import {
  addItem,
  removeItem,
  AddItemAtFirst,
} from "../../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import {
  removeItemFromWishlist,
  addItemInWishlist,
} from "../../../features/wishlist/wishlistSlice";
import { Check } from "lucide-react";

const ProductCard = ({product, inCartQuantity, wishlist, ref}) => {
  const {
    id,
    imageUrl,
    title,
    discount,
    averageRating,
    reviewCount,
    sellingPrice,
  } = product;
  const dispatch = useDispatch();

  const handleWishlist = () => {
    //When item is in the wishlist then remove it
    if (wishlist) {
      dispatch(removeItemFromWishlist(id));
    } else {
      //When item is not in the wishlist then add it
      const product = {
        image: imageUrl,
        mrp: sellingPrice / 1 - discount / 100,
        productId: id,
        productName: title,
        rating: averageRating,
        reviewCount: reviewCount,
        sellingPrice: sellingPrice,
      };
      dispatch(addItemInWishlist(product));
    }
  };

  const handleItemAtFirst = () => {
    const product = {
      productId: id,
      productImage: imageUrl,
      productMrp: sellingPrice / 1 - discount / 100,
      productName: title,
      productSellPrice: sellingPrice,
      quantity: 1,
    };
    dispatch(AddItemAtFirst(product));
  };

  const handleItemAdd = () => {
    dispatch(addItem({ id, quantity: 1 }));
  };

  const handleItemRemove = () => {
    dispatch(removeItem({ id, quantity: 1 }));
  };

  const preciseRating = Number(averageRating);
  const displayRating = Math.round(preciseRating * 2) / 2; // Rounds to nearest .5
  const displayFullStars = Math.floor(displayRating);
  const displayHasHalfStar = displayRating % 1 !== 0;

  // Generate a unique ID for the linear gradient to prevent conflicts if multiple cards are rendered

  return (
    // Updated responsive width classes:
    // - w-full for small screens (default)
    // - sm:max-w-xs for small breakpoints and up (e.g., tablets in portrait)
    // - md:max-w-sm for medium breakpoints and up
    // - lg:max-w-xs for large breakpoints and up (to fit 4 cards in a row on desktops)
    // - xl:max-w-xs for extra-large breakpoints and up
    // - mx-auto centers the card when its width is less than 100% of its container.
    <div ref={ref} className="rounded-lg border mb-2 border-gray-200 hover:bg-gray-100 bg-white p-3 shadow-sm w-full sm:max-w-xs md:max-w-sm lg:max-w-xs xl:max-w-xs mx-auto">
      <Link to={`/product/${id}`}>
        <div className="h-56 w-full">
            {/* Image is already responsive with w-full and h-full */}
            <img
              className="mx-auto w-full h-full rounded-t-lg object-contain"
              src={imageUrl}
              alt={title}
            />
        </div>
        <div className="pt-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="me-2 rounded bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800">
              Up to {discount.toFixed(0)}% off
            </span>

            <div className="flex items-center justify-end gap-1">
              {/* Quick look and Add to favorites buttons are already responsive due to flexbox */}

              <button
                onClick={(e) => {e.preventDefault(); handleWishlist()}}
                type="button"
                data-tooltip-target="tooltip-add-to-favorites"
                className="rounded-lg hidden min-[330px]:block p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="sr-only"> Add to Favorites </span>
                {wishlist ? (
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                    />
                  </svg>
                )}
              </button>
              <div
                id="tooltip-add-to-favorites"
                role="tooltip"
                className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
                data-popper-placement="top"
              >
                Add to favorites
                <div className="tooltip-arrow" data-popper-arrow=""></div>
              </div>
            </div>
          </div>

          {/* Updated title with line-clamp for two lines on all screen sizes */}
          <p
            className="text-lg font-semibold leading-tight text-gray-900 hover:underline overflow-hidden text-ellipsis line-clamp-2"
          >
            {title}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
              {/* Star rating is already responsive due to flexbox */}
              {[...Array(5)].map((_, i) => {
                let starType = "empty";
                if (i < displayFullStars) {
                  starType = "full";
                } else if (i === displayFullStars && displayHasHalfStar) {
                  starType = "half";
                }
                return (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      starType === "full"
                        ? "text-yellow-400"
                        : starType === "half"
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      starType === "full"
                        ? "currentColor"
                        : starType === "half"
                        ? `url(#${id})`
                        : "none"
                    }
                    viewBox="0 0 24 24"
                  >
                    {starType === "half" && (
                      <defs>
                        <linearGradient
                          id={`star-gradient-${id}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="50%" stopColor="currentColor" />
                          <stop offset="50%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    )}
                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                  </svg>
                );
              })}
            </div>

            <p className="text-sm font-medium text-gray-900">{averageRating}</p>
            <p className="text-sm font-medium text-gray-500">({reviewCount})</p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-2xl font-extrabold leading-tight text-gray-900">
              ₹{sellingPrice.toFixed(2)}
            </p>

            {/* Quantity counter is already responsive due to flexbox */}
            {inCartQuantity === 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleItemAtFirst();
                }}
                type="button"
                className="text-nowrap inline-flex items-center rounded-lg bg-pink-700 px-3 py-2.5 text-sm font-medium text-white
                hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300"
              >
                <svg
                  className="-ms-1 h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                <span className="hidden xs:block">
                Add to cart
                </span>
              </button>
            ) : (
              <div
                className="flex items-center rounded-xl overflow-hidden"
                onClick={(e) => e.preventDefault()}
              >
                <button
                  onClick={() => handleItemRemove()}
                  className="hidden xs:block bg-black hover:bg-gray-800 px-3 py-2 text-white font-bold"
                >
                  -
                </button>
                <span className="px-3 border-2 m-1 xs:border-none rounded-lg border-pink-700 py-2 bg-white text-black">
                  <span className="hidden xs:block">{inCartQuantity}</span>
                  <span onClick={() => handleItemRemove()} className=" xs:hidden bottom-0 left-2"><Check stroke="#FC198F" strokeWidth={4} /></span>
                </span>
                <button
                  onClick={() => handleItemAdd()}
                  className="hidden xs:block bg-black hover:bg-gray-800 px-3 py-2 text-white font-bold"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
