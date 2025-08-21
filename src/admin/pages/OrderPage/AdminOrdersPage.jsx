import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// --- SVG Icon Components ---
// A collection of icons for the orders page.
const ClockIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const UserIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

const TagIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
    />
  </svg>
);
const getStatusClass = (status) => {
  switch (status) {
    case "SHIPPED":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/40";
    case "PROCESSING":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/40";
    case "NONDELIVERED":
      return "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/40";
    case "DELIVERED":
      return "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/40";
    case "CANCELLED":
      return "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/40";
    case "RETURNED":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/40";
    default:
      return "bg-pink-500/20 text-pink-400 border-pink-500/30 hover:bg-pink-500/40";
  }
};

// --- Reusable OrderCard Component ---
const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const itemsToShow = order.products.slice(0, 3);
  const remainingItemsCount = order.products.length - 1;

  return (
    <div className="bg-black/70 backdrop-blur-sm rounded-2xl border border-gray-900 overflow-hidden transition-all hover:border-pink-500/50">
      <Link
        onClick={(e) => {
          e.preventDefault();
          navigate(`/admin/order/${order.orderId}`);
        }}
      >
        <div className="p-5">
          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-4">
              <p className="font-bold text-white text-lg">#{order.orderId}</p>
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusClass(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1.5">
                <ClockIcon />
                <p>{order.date}</p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center relative h-12 w-24">
                {itemsToShow.map((item, index) => (
                  <img
                    key={index}
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-600 bg-gray-900 absolute"
                    style={{
                      left: `${index * 20}px`,
                      zIndex: itemsToShow.length - index,
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/100x100/1f2937/ffffff?text=Err";
                    }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-baseline space-x-2">
                  <p className="text-white font-semibold">
                    {order.products[0].productName}
                  </p>
                  {remainingItemsCount > 0 && (
                    <p className="text-pink-400 text-xs font-medium">
                      +{remainingItemsCount} more
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-1.5 text-gray-400 text-sm mt-1">
                  <UserIcon />
                  <p>{order.userName}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div>
                <p className="text-gray-400 text-sm">Total</p>
                <p className="font-bold text-white text-xl">
                  ₹{order.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

// Loading Spinner at bottom
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-6">
    <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-pink-500"></div>
  </div>
);

// --- Main Orders Page Component ---
const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [forOrderStatus, setForOrderStatus] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isStatusListShow, setIsStatusListShow] = useState(false);
  //All order statuses
  const orderStatuses = [
    {label: "All", value: ""},
    { label: "Ordered", value: "PROCESSING" },
    { label: "Shipped", value: "SHIPPED" },
    { label: "Out For  Devlivery", value: "NONDELIVERED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Returned", value: "RETURNED" },
  ];

  useEffect(() => {
    //check last page before fetching
    if (!hasMore) return;

    const controller = new AbortController();
    //This function fetch the order list data
    const fetchOrders = async () => {
      const jwtToken = Cookies.get("jwtToken");
      if (jwtToken) {
        setLoading(true);
        const baseUri = `${import.meta.env.VITE_API_URL}/admin/get-orders`;
        //Query uri with params
        const param = {
          page: page,
          size: 20,
          sort: "orderedAt,desc",
          orderStatus: forOrderStatus,
        };
        const queryUri = new URLSearchParams(param);

        //Full uri
        const fullUri = `${baseUri}?${queryUri}`;

        try {
          //fething response
          const response = await fetch(fullUri, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error("Failed to fetch more orders");
          }

          const result = await response.json();

          setOrders((prev) => [...prev, ...result.content]);
          setHasMore(!result.last);
        } catch (error) {
          // Don't log an error if it was our own abort action
          if (error.name !== "AbortError") {
            console.log("Failed to fetch: ", error);
          }
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    };

    fetchOrders();

    return () => {
      controller.abort();
    };
  }, [page, forOrderStatus, hasMore, navigate]);

  //Effect for infinite scrolling--
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        //Only fetch more if there are more pages and we are not already loading
        if (hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    //cleanup function to remove the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Orders</h1>
          <p className="text-gray-400 mt-1">
            Manage and track all customer orders.
          </p>
        </div>
        {/* Order Status filter */}
        <div
          onMouseEnter={() => setIsStatusListShow(true)}
          onMouseLeave={() => setIsStatusListShow(false)}
          className="relative bg-black border-2 border-gray-800 me-24 p-2 w-auto rounded-full "
        >
          <button
            onClick={() => setIsStatusListShow(true)}
            className={`px-4 py-1 rounded-full w-60 text-xl font-semibold border ${getStatusClass(
              forOrderStatus
            )}`}
          >
            {orderStatuses.find((s) => s.value === forOrderStatus).label}
          </button>
          <div
            className={`${
              isStatusListShow ? "flex" : "hidden"
            } border border-gray-800 flex-col bg-black text-nowrap rounded-2xl p-3 items-start gap-2 left-0 mt-[12px] absolute w-full z-30`}
          >
            {orderStatuses.map((s) => (
              <button
                onClick={() => {
                  if (forOrderStatus != s.value) {
                    setForOrderStatus(s.value);
                    setOrders([]);
                    setPage(0);
                    setHasMore(true);
                  }
                  setIsStatusListShow(false);
                }}
                className={`${getStatusClass(
                  s.value
                )} px-4 py-2 w-full rounded-full ${
                  s.value === forOrderStatus ? "hidden" : ""
                } border`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
      {/* Loading spiner */}
      {loading && <LoadingSpinner />}
      {!hasMore && orders.length > 0 && (
        <p className="text-center text-gray-500 py-4">
          You've reached the end!
        </p>
      )}
      {!loading && orders.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400">No orders found for this status.</p>
        </div>
      )}
    </div>
  );
};
export default AdminOrdersPage;
