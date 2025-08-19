import { useCallback, useEffect, useState } from "react";
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

// --- Mock Data for Orders ---
const ordersData = [
  {
    id: "LX84523",
    customerName: "John Doe",
    dateTime: "August 19, 2025 at 3:15 PM",
    items: [
      {
        name: "Headphones",
        imgUrl: "https://placehold.co/100x100/ec4899/000000?text=🎧",
      },
      {
        name: "Smartwatch",
        imgUrl: "https://placehold.co/100x100/06b6d4/000000?text=⌚️",
      },
    ],
    totalPrice: 150.0,
    status: "Processing",
  },
  {
    id: "LX84522",
    customerName: "Jane Smith",
    dateTime: "August 19, 2025 at 11:45 AM",
    items: [
      {
        name: "Keyboard",
        imgUrl: "https://placehold.co/100x100/f59e0b/000000?text=⌨️",
      },
      {
        name: "Camera",
        imgUrl: "https://placehold.co/100x100/10b981/000000?text=📷",
      },
      {
        name: "Mouse",
        imgUrl: "https://placehold.co/100x100/6366f1/000000?text=🖱️",
      },
      {
        name: "Webcam",
        imgUrl: "https://placehold.co/100x100/ef4444/000000?text=📹",
      },
      {
        name: "Microphone",
        imgUrl: "https://placehold.co/100x100/d946ef/000000?text=🎤",
      },
    ],
    totalPrice: 475.5,
    status: "Shipped",
  },
  {
    id: "LX84521",
    customerName: "Peter Jones",
    dateTime: "August 18, 2025 at 9:30 PM",
    items: [
      {
        name: "Laptop",
        imgUrl: "https://placehold.co/100x100/84cc16/000000?text=💻",
      },
    ],
    totalPrice: 1250.25,
    status: "Delivered",
  },
  {
    id: "LX84520",
    customerName: "Mary Lamb",
    dateTime: "August 18, 2025 at 1:00 PM",
    items: [
      {
        name: "Smartwatch",
        imgUrl: "https://placehold.co/100x100/06b6d4/000000?text=⌚️",
      },
      {
        name: "Keyboard",
        imgUrl: "https://placehold.co/100x100/f59e0b/000000?text=⌨️",
      },
      {
        name: "Mouse",
        imgUrl: "https://placehold.co/100x100/6366f1/000000?text=🖱️",
      },
    ],
    totalPrice: 242.0,
    status: "Cancelled",
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case "SHIPPED":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    case "PROCESSING":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "NONDELIVERED":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "DELIVERED":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "CANCELLED":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "RETURNED":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";  
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
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

// --- Main Orders Page Component ---
const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [forOrderStatus, setForOrderStatus] = useState("PROCESSING");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [isStatusListShow, setIsStatusListShow] = useState(false);
  //All order statuses
  const orderStatuses = [
    { label: "Ordered", value: "PROCESSING" },
    { label: "Shipped", value: "SHIPPED" },
    { label: "Out For  Devlivery", value: "NONDELIVERED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Returned", value: "RETURNED" },
  ];

  //This function fetch the order list data
  const fetchOrders = useCallback(async () => {
    const controller = new AbortController();
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      setLoading(true);
      const baseUri = "http://localhost:8080/admin/get-orders";

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
        console.log("Failed to fetch : ", error);
      } finally {
        setLoading(false);
      }
    }
  }, [page, forOrderStatus, setOrders, setHasMore, setLoading]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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
          <button onClick={() => setIsStatusListShow(true)} className={`px-4 py-1 rounded-full w-60 text-xl font-semibold border ${getStatusClass(forOrderStatus)}`}>
            {orderStatuses.find((s) => s.value === forOrderStatus).label}
          </button>
          <div
            className={`${
              isStatusListShow ? "flex" : "hidden"
            } border border-gray-800 flex-col bg-black text-nowrap rounded-2xl p-3 items-start gap-2 left-0 mt-[12px] absolute w-full z-30`}
          >
            {orderStatuses.map((s) => (
              <button onClick={() => {setForOrderStatus(s.value);setOrders([])}} className={`${getStatusClass(s.value)} px-4 py-2 w-full rounded-full ${s.value === forOrderStatus ? "hidden" : ""} border`}>{s.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default AdminOrdersPage;
