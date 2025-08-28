import React, { useCallback, useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


// This function returns the appropriate Tailwind CSS classes for each order status.
const getStatusClasses = (status) => {
  switch (status.toLowerCase()) {
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'returned':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};


// --- Component 2: OrderItem ---
// This component displays a single order card.
const OrderItem = ({ order }) => {
  const { id, orderStatus, products, deliveryDate, totalPrice } = order;
  const firstProduct = products[0];
  const remainingProductsCount = products.length - 1;

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden mb-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      <Link to={`order/${id}`} >
      <div className="p-6">
        {/* --- Card Header: Status and Order ID --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="mb-2 sm:mb-0">
            <h3 className="text-lg font-bold text-gray-800">Order #{id}</h3>
            <p className="text-sm text-gray-500">{deliveryDate}</p>
          </div>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClasses(orderStatus)}`}>
            {orderStatus}
          </span>
        </div>

        {/* --- Card Body: Product Info --- */}
        <div className="flex items-center gap-4">
          {/* Stacked Product Images */}
          <div className="flex -space-x-8">
            {products.slice(0, 3).map((product, index) => (
              <img
                key={index}
                className="w-20 h-20 object-cover rounded-lg border-4 border-white shadow-sm"
                src={product.imageUrl}
                alt={product.name}
                style={{ zIndex: products.length - index }} // Ensures correct stacking order
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/ef4444/ffffff?text=Error'; }}
              />
            ))}
          </div>

          {/* Product Title */}
          <div className="flex-grow">
            <p className="font-semibold text-gray-900">{firstProduct.name}</p>
            {remainingProductsCount > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                + {remainingProductsCount} more item{remainingProductsCount > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* --- Card Footer: Price Information --- */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        
        <div className="flex justify-between items-center mt-2">
            <span className="text-base font-bold text-gray-900">Total Price</span>
            <span className="text-lg font-bold text-gray-900">₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>
      </Link>
    </article>
  );
};


// --- Component 1: OrdersPage ---
// This component is the main page that lists all the orders.
const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  //Fetch My Orders 
  const fetchMyOrders = useCallback(async () => {
    const jwtToken = Cookies.get("jwtToken");
    if(jwtToken) {
      try{
        const apiUri = `${import.meta.env.VITE_API_URL}/user/my-orders`;
        const response = await fetch(apiUri,{
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if(!response.ok) {
          console.log("No Orders Present");
        }
        const result = await response.json();
        setOrders(result);

      } catch(error) {
        console.log("Error Fetching Orders :",error);
      }
    } else {
      navigate('/login');
    }
  },[setOrders,navigate]);

  useEffect(() => {
    fetchMyOrders();
  },[fetchMyOrders]);

  return (
    <div className='bg-gray-100 min-h-screen font-sans'>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">My Orders</h1>
      <section>
        {orders.length > 0 ? (
          orders.map(order => <OrderItem key={order.id} order={order} />)
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">You have no orders yet.</p>
          </div>
        )}
      </section>
    </div>
    </div>
  );
};
export default MyOrdersPage;