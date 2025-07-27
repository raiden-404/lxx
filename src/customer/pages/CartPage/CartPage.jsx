import React, { useState } from 'react';

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


// --- Mock Data for Cart ---
const initialCartItems = [
  { id: 1, title: 'Zenith Wireless Headphones', price: 7999.00, image: 'https://placehold.co/300x300/f0f0f0/333?text=Headphones', quantity: 1, color: 'Black' },
  { id: 2, title: 'Aura Smartwatch', price: 14999.00, image: 'https://placehold.co/300x300/e8e8e8/333?text=Smartwatch', quantity: 1, color: 'Silver' },
  { id: 3, title: 'Nebula Portable Speaker', price: 5999.00, image: 'https://placehold.co/300x300/e0e0e0/333?text=Speaker', quantity: 2, color: 'Gray' },
  { id: 4, title: 'Nebula Portable Speaker', price: 5999.00, image: 'https://placehold.co/300x300/e0e0e0/333?text=Speaker', quantity: 2, color: 'Gray' },
  { id: 5, title: 'Nebula Portable Speaker', price: 5999.00, image: 'https://placehold.co/300x300/e0e0e0/333?text=Speaker', quantity: 2, color: 'Gray' },
  { id: 6, title: 'Nebula Portable Speaker', price: 5999.00, image: 'https://placehold.co/300x300/e0e0e0/333?text=Speaker', quantity: 2, color: 'Gray' },
  { id: 7, title: 'Nebula Portable Speaker', price: 5999.00, image: 'https://placehold.co/300x300/e0e0e0/333?text=Speaker', quantity: 2, color: 'Gray' },
  { id: 8, title: 'Nebula Portable Speaker', price: 5999.00, image: 'https://placehold.co/300x300/e0e0e0/333?text=Speaker', quantity: 2, color: 'Gray' },
  { id: 9, title: 'Nebula Portable Speaker', price: 5999.00, image: 'https://placehold.co/300x300/e0e0e0/333?text=Speaker', quantity: 2, color: 'Gray' },
];

// --- Reusable Components ---
const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex items-center justify-between py-6 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-100 rounded-md">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{item.title}</h3>
          <p className="text-sm text-gray-500">Color: {item.color}</p>
          <p className="sm:hidden text-lg font-bold text-gray-900 mt-1">₹{item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden sm:block text-lg font-bold text-gray-900">
          ₹{item.price.toFixed(2)}
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button onClick={() => onQuantityChange(item.id, item.quantity - 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg">-</button>
          <span className="px-4 py-1 font-semibold text-sm">{item.quantity}</span>
          <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg">+</button>
        </div>
        <button onClick={() => onRemove(item.id)} className="text-gray-500 hover:text-red-600 transition-colors">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const OrderSummary = ({ subtotal }) => {
  const shipping = subtotal > 10000 ? 0.00 : 99.00;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-8">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
      <div className="space-y-3 text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-semibold">{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (18% GST)</span>
          <span className="font-semibold">₹{tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between font-bold text-xl text-gray-900 border-t mt-4 pt-4">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      <button className="w-full mt-6 bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
        Proceed to Checkout
      </button>
    </div>
  );
};

// --- Main Cart Page Component ---
const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId); // Remove item if quantity becomes 0
      return;
    }
    setCartItems(
      cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
           <a href="#" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
             <ChevronLeft className="w-5 h-5" />
             Back to Shop
           </a>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">
                {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
              </h2>
              <div>
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>
            <OrderSummary subtotal={subtotal} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;