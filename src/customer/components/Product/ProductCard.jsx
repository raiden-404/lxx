import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addItem, removeItem, updateCart, AddItemAtFirst } from "../../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductCard = (props) => {
  const { id, imageUrl, title, discount, averageRating, reviewCount, sellingPrice } = props.product;
  const [quantity, setQuantity] = useState(props.inCartQuantity);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(props.inCartQuantity);
  },[props]);

  const handleItemAtFirst = () => {
    const product = {
      productId: id,
      productImage: imageUrl,
      productMrp : (sellingPrice/1-(discount/100)),
      productName : title,
      productSellPrice: sellingPrice,
      quantity: 1,
    };
    dispatch(AddItemAtFirst(product));
  }

  const handleItemAdd = () => {
    dispatch(addItem({id, quantity: 1}));
    setQuantity(quantity+1);
    updateCart();
  }

  const handleItemRemove = () => {
    dispatch(removeItem({id, quantity: 1}));
    setQuantity(quantity-1);
  }

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
    <div className="rounded-lg border mb-2 border-gray-200 hover:bg-gray-100 bg-white p-3 shadow-sm w-full sm:max-w-xs md:max-w-sm lg:max-w-xs xl:max-w-xs mx-auto">
      <Link to={`/product/${id}`}>
      <div className="h-56 w-full">
        <a href="#">
          {/* Image is already responsive with w-full and h-full */}
          <img className="mx-auto w-full h-full rounded-t-lg object-cover" src={imageUrl} alt={title} />
        </a>
      </div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span
            className="me-2 rounded bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800">
            Up to {discount}% off
          </span>

          <div className="flex items-center justify-end gap-1">
            {/* Quick look and Add to favorites buttons are already responsive due to flexbox */}
            <button type="button" data-tooltip-target="tooltip-quick-look"
              className="rounded-lg hidden min-[330px]:block p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
              <span className="sr-only"> Quick look </span>
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
            <div id="tooltip-quick-look" role="tooltip"
              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
              data-popper-placement="top">
              Quick look
              <div className="tooltip-arrow" data-popper-arrow=""></div>
            </div>

            <button type="button" data-tooltip-target="tooltip-add-to-favorites"
              className="rounded-lg hidden min-[330px]:block p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
              <span className="sr-only"> Add to Favorites </span>
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
              </svg>
            </button>
            <div id="tooltip-add-to-favorites" role="tooltip"
              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
              data-popper-placement="top">
              Add to favorites
              <div className="tooltip-arrow" data-popper-arrow=""></div>
            </div>
          </div>
        </div>

        {/* Updated title with line-clamp for two lines on all screen sizes */}
        <a href="#"
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline overflow-hidden text-ellipsis line-clamp-2">
          {title}
        </a>

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
                <svg key={i} className={`h-4 w-4 ${starType === "full" ? "text-yellow-400" : starType === "half"
                  ? "text-yellow-400" : "text-gray-300"}`} aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill={starType === "full" ? "currentColor" : starType === "half"
                    ? `url(#${id})` : "none"} viewBox="0 0 24 24">
                  {starType === "half" && (
                    <defs>
                      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  )}
                  <path
                    d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                </svg>
              );
            })}
          </div>

          <p className="text-sm font-medium text-gray-900">{averageRating}</p>
          <p className="text-sm font-medium text-gray-500">({reviewCount})</p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold leading-tight text-gray-900">₹{sellingPrice}</p>

          {/* Quantity counter is already responsive due to flexbox */}
          {quantity === 0 ? (
            <button onClick={(e) => {e.preventDefault();handleItemAtFirst();}}
              type="button"
              className="hidden min-[340px]:inline-flex items-center rounded-lg bg-pink-700 px-5 py-2.5 text-sm font-medium text-white
                hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300">
              <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
              </svg>
              Add to cart
            </button>
          ) : (
            <div className="flex items-center rounded-lg overflow-hidden" onClick={(e) => e.preventDefault()}>
              <button onClick={() => handleItemRemove()}
                className="bg-black hover:bg-gray-800 px-3 py-2 text-white font-bold">
                -
              </button>
              <span className="px-3 py-2 bg-white text-black">{quantity}</span>
              <button onClick={() => handleItemAdd()}
                className="bg-black hover:bg-gray-800 px-3 py-2 text-white font-bold">
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