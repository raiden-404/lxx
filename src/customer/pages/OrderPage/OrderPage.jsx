import React, { useState, useEffect, useRef, useCallback } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams} from "react-router-dom";
// For icons, you would typically install lucide-react: npm install lucide-react
// In this self-contained example, we'll use inline SVGs for key icons.

// --- SVG Icon Components ---
const Star = ({ className, filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const CheckCircle = ({ className }) => (
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const Package = ({ className }) => (
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
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const Truck = ({ className }) => (
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
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const Home = ({ className }) => (
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const X = ({ className }) => (
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
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const HelpCircle = ({ className }) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);
const ArrowLeft = ({ className }) => (
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
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

// --- Mock Data ---
const orderData = {
  orderId: "A58104",
  orderedAt: "August 17, 2025",
  // MODIFICATION: Set status to 'Ordered' to test the first step
  orderStatus: "Ordered",
  items: [
    {
      id: 1,
      name: "Aura Wireless Earbuds",
      price: 129.99,
      quantity: 1,
      image: "https://placehold.co/100x100/1a1a1a/ffffff?text=Aura",
    },
    {
      id: 2,
      name: "Nebula Smart Watch",
      price: 279.0,
      quantity: 1,
      image: "https://placehold.co/100x100/333333/ffffff?text=Nebula",
    },
    {
      id: 3,
      name: "Flow USB-C Cable",
      price: 24.5,
      quantity: 2,
      image: "https://placehold.co/100x100/555555/ffffff?text=Flow",
    },
  ],
  summary: { shipping: 5.0, tax: 36.64, total: 499.64 },
  shippingAddress: {
    name: "Alex Johnson",
    address: "123 Tech Lane, Silicon Valley",
    city: "San Francisco, CA 94105",
  },
  tracking: [
    // MODIFICATION: Updated 'completed' status to match the main order status
    { status: "Ordered", date: "Aug 15, 2025", completed: true },
    { status: "Shipped", date: "Aug 16, 2025", completed: false },
    { status: "Out for Delivery", date: "Aug 17, 2025", completed: false },
    { status: "Delivered", date: "Aug 17, 2025", completed: false },
  ],
};

// --- Child Components ---

const OrderItem = ({ item, onWriteReview }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-start sm:items-center space-x-4">
          <img
            src={item.image}
            alt={item.productName}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/100x100/cccccc/ffffff?text=Error";
            }}
          />
          <div className="flex-grow">
            <h3 className="font-semibold text-gray-800">{item.productName}</h3>
            <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-800">
              ₹{item.totalPrice.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              ₹{item.eachPrice.toFixed(2)} each
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h4 className="font-semibold text-gray-700 mb-2 sm:mb-0">
          Rate this product
        </h4>
        <div
          className="flex items-center space-x-1"
          onMouseLeave={() => setHoverRating(0)}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onClick={() => onWriteReview(item, star)}
              className={`transition-colors text-gray-300 hover:text-yellow-400 ${
                hoverRating >= star ? "text-yellow-400" : ""
              }`}
            >
              <Star className="w-7 h-7" filled={hoverRating >= star} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const OrderTracker = ({ tracking, status }) => {
  // Map status strings to their corresponding icon components
  const statusIcons = {
    PROCESSING: CheckCircle,
    SHIPPED: Package,
    NONDELIVERED: Truck,
    DELIVERED: Home,
  };

  const activeIndex = tracking.findIndex((step) => step.status === status);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Order Tracking</h2>
      <div className="flex items-center">
        {tracking.map((step, index) => {
          // Select the component from the map, with a fallback
          const IconComponent = statusIcons[step.status] || HelpCircle;

          return (
            <React.Fragment key={step.status}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {/* Render the dynamically chosen icon component */}
                  <IconComponent className="w-6 h-6" />
                </div>
                <p
                  className={`mt-2 text-xs text-center font-medium ${
                    step.completed ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {step.status === "NONDELIVERED" ? "OUT FOR DELIVERY" : step.status}
                </p>
                <p className="mt-1 text-xs text-center text-gray-400">
                  {step.date}
                </p>
              </div>
              {index < tracking.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    index < activeIndex ? "bg-green-600" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const ReviewModal = ({ isOpen, onClose, item, initialRating }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRating(initialRating || 0);
      setReviewText("");
      setIsSubmitted(false);
    }
  }, [isOpen, initialRating]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ itemId: item.productId, rating, reviewText });
    setIsSubmitted(true);
    setTimeout(() => onClose(), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
          {isSubmitted ? (
            <div className="text-center py-10">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Thank You!
              </h2>
              <p className="text-gray-600">
                Your review for "{item.name}" has been submitted.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Reviewing "{item.productName}"
              </h2>
              <p className="text-sm text-gray-500 mb-4">{item.description}</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Rating
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                      >
                        <Star
                          className={`w-8 h-8 cursor-pointer transition-colors ${
                            rating >= star
                              ? "text-yellow-400"
                              : "text-gray-300 hover:text-yellow-300"
                          }`}
                          filled={rating >= star}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="review"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Review
                  </label>
                  <textarea
                    id="review"
                    rows="4"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Tell us about your experience..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  disabled={rating === 0 || reviewText.length < 10}
                >
                  Submit Review
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const OrderPage = () => {
  const [order, setOrder] = useState(null);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [itemToReview, setItemToReview] = useState(null);
  const [initialRating, setInitialRating] = useState(0);
  const [isHelpOpen, setHelpOpen] = useState(false);
  const helpRef = useRef(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const handleOpenReviewModal = (item, rating) => {
    setItemToReview(item);
    setInitialRating(rating);
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
    setTimeout(() => {
      setItemToReview(null);
      setInitialRating(0);
    }, 300);
  };

  const handleRequestRefund = () => {
    setHelpOpen(false);
    alert(
      `Refund request initiated for order <div id="1">order.orderId</div>. Our support team will contact you shortly.`
    );
  };

  //fetch order details
  const fetchOrderDetails = useCallback(async () => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      try {
        const fullUri = `http://localhost:8080/user/get-order?id=${orderId}`;
        const response = await fetch(fullUri, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Response isn't ok");
        }

        const result = await response.json();
        setOrder(result);
      } catch (error) {
        console.log("Failed to fetched order details : ", error);
      }
    }
  }, [orderId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setHelpOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const giveProperStatusColour = (status) => {
    switch (status) {
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-800";
      case "SHIPPED":
        return "bg-blue-100 text-blue-800";
      case "NONDELIVERED":
        return "bg-green-100 text-green-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  const helpOptions = [
    { label: "Request Refund", action: handleRequestRefund },
    {
      label: "Contact Support",
      action: () => alert("Redirecting to support..."),
    },
    { label: "Return Policy", action: () => alert("Showing return policy...") },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      {order === null ? <>Empty  cart</> : 
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            href="#"
            onClick={() => navigate("/my-orders")}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-white py-2 px-4 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to My Orders
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Order #{order.orderId}
            </h1>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <span className="text-sm text-gray-500">
                Placed on {order.orderedAt}
              </span>
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full ${giveProperStatusColour(order.orderStatus)}`}
              >
                {order.orderStatus === "NONDELIVERED" ? "OUT FOR DELIVERY" : order.orderStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {order.items.map((item) => (
              <OrderItem
                key={item.productId}
                item={item}
                onWriteReview={handleOpenReviewModal}
              />
            ))}
            <OrderTracker
              tracking={order.tracking}
              status={order.orderStatus}
            />
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-800">
                    ₹
                    {(
                      order.summary.total -
                      order.summary.tax -
                      order.summary.shipping
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium text-gray-800">
                    ₹{order.summary.shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span className="font-medium text-gray-800">
                    ₹{order.summary.tax.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="flex justify-between text-base">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">
                    ₹{order.summary.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Shipping Details
              </h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-semibold text-gray-800">
                  {order.shippingAddress.name}
                </p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={helpRef}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex flex-col items-center"
        >
          <div className="flex flex-col items-center space-y-2 mb-2">
            {helpOptions.map((option, index) => (
              <button
                key={option.label}
                onClick={option.action}
                className={`bg-white text-gray-700 font-medium px-4 py-2 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out transform ${
                  isHelpOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
                style={{
                  transitionDelay: isHelpOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setHelpOpen(!isHelpOpen)}
            className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            aria-label="Help"
          >
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div
                className={`transition-all duration-300 ease-in-out absolute ${
                  isHelpOpen
                    ? "opacity-0 rotate-45 scale-50"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              >
                <HelpCircle className="w-7 h-7" />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out absolute ${
                  isHelpOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-45 scale-50"
                }`}
              >
                <X className="w-7 h-7" />
              </div>
            </div>
          </button>
        </div>

        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={handleCloseReviewModal}
          item={itemToReview}
          initialRating={initialRating}
        />
      </div>
}
    </div>
  );
};
export default OrderPage;
