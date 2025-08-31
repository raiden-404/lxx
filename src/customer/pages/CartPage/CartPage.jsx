import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  deleteItem,
  removeItem,
} from "../../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import { Loader2 } from "lucide-react";

// --- Icon Components (Self-contained SVGs) ---
const Trash2 = ({ className }) => (
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
    className={className}
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const ChevronLeft = ({ className }) => (
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
    className={className}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ShoppingCart = ({ className }) => (
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
    className={className}
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

// --- Reusable Components ---
const CartItem = ({ item, onItemAdd, onItemRemove, onItemDelete }) => {
  return (
    <div className="flex items-center justify-between py-6 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-100 rounded-md">
          <img
            src={item.productImage}
            alt={item.productName}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
            {item.productName}
          </h3>
          <p className="text-sm text-gray-500">Brand: Lx Brand</p>
          <p className="sm:hidden text-lg font-bold text-gray-900 mt-1">
            ₹{item.productSellPrice.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden sm:block text-lg font-bold text-gray-900">
          ₹{item.productMrp.toFixed(2)}
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => onItemRemove(item.productId, 1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
          >
            -
          </button>
          <span className="px-4 py-1 font-semibold text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => onItemAdd(item.productId, 1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
          >
            +
          </button>
        </div>
        <button
          onClick={() => onItemDelete(item.productId)}
          className="text-gray-500 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const OrderSummary = ({cartItems}) => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  console.log(cartItems)

  const handleCheckOut = async () => {
    setLoad(true);
    const jwtToken = Cookies.get("jwtToken");
    if(!jwtToken){navigate("/login");}
    
    const item = cartItems.items.map(item => ({productId: item.productId, quantity: item.quantity}));
    

    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/update-checkout`,{
      method:"POST",
      headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(item),
    });

    if(!response.ok) {
      throw new Error(response.statusText);
    }
    setLoad(false);
    navigate('/checkout')
  }

  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-8">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">
        Order Summary
      </h2>
      <div className="space-y-3 text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">₹{cartItems.subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-semibold">
            {cartItems.shipping === 0 ? "FREE" : `₹${cartItems.shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Tax (18% GST)</span>
          <span className="font-semibold">₹{cartItems.tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between font-bold text-xl text-gray-900 border-t mt-4 pt-4">
        <span>Total</span>
        <span>₹{cartItems.total.toFixed(2)}</span>
      </div>
      <button onClick={handleCheckOut} className="w-full mt-6 bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105">
        {
          load ? <Loader2 className="inline-flex animate-spin" />: "Proceed to Checkout"
        }
      </button>
    </div>
  );
};

// --- Main Cart Page Component ---
const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  
  const dispatch = useDispatch();
  const onItemAdd = (id, quantity) => {
    dispatch(addItem({ id, quantity }));
  };

  const onItemRemove = (id, quantity) => {
    dispatch(removeItem({ id, quantity }));
  };

  const onItemDelete = (id) => {
    dispatch(deleteItem({ id }));
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
          Your Cart
        </h1>

        {cartItems === null ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500">
              Looks like you haven't added anything to your cart yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">
                {cartItems.items.length}{" "}
                {cartItems.items.length === 1 ? "Item" : "Items"}
              </h2>
              <div>
                {cartItems.items.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    onItemAdd={onItemAdd}
                    onItemRemove={onItemRemove}
                    onItemDelete={onItemDelete}
                  />
                ))}
              </div>
            </div>
            {cartItems === null? <></> : <OrderSummary cartItems={cartItems} /> }
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
