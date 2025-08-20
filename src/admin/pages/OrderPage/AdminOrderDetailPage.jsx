import { useState, useCallback, useEffect } from 'react';
import Cookies from "js-cookie";
import { useNavigate, useParams } from 'react-router-dom';

// --- SVG Icon Components (Unchanged) ---
const UserCircleIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const MapPinIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);
const CreditCardIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
);
const ChevronDownIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);
const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
// --- NEW: Icon for details button ---
const InformationCircleIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);



// --- Sub-Components for the Order Detail Page ---

const OrderItemsCard = ({ items }) => (
    <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-900">
        <h3 className="text-lg font-semibold text-white mb-4">Order Items ({items.length})</h3>
        <div className="space-y-4">
            {items.map(item => (
                <div key={item.productId} className="flex items-center space-x-4 text-sm">
                    <img src={item.image} alt={item.productName} className="w-16 h-16 rounded-lg object-cover bg-gray-900" />
                    <div className="flex-grow">
                        <p className="text-white font-semibold">{item.productName}</p>
                        <p className="text-gray-500 text-xs">ID: {item.productId}</p>
                        <p className="text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white font-medium">₹{item.totalPrice.toFixed(2)}</p>
                </div>
            ))}
        </div>
    </div>
);

const PricingCard = ({ summary, payment }) => {
    const paidPercentage = (payment.paidAmount / summary.total) * 100;
    const subtotal = summary.total - summary.shipping - summary.tax;

    return (
        <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-900">
            <h3 className="text-lg font-semibold text-white mb-4">Pricing</h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400"><span>Subtotal</span><span className="text-white">₹{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-400"><span>Shipping</span><span className="text-white">₹{summary.shipping.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-400"><span>Tax</span><span className="text-white">₹{summary.tax.toFixed(2)}</span></div>
                <div className="border-t border-gray-800 my-2"></div>
                <div className="flex justify-between text-white font-bold text-lg"><span>Total</span><span>₹{summary.total.toFixed(2)}</span></div>
            </div>
            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Payment Status</h3>
            <p className={`font-semibold text-sm ${payment.status === 'PAID' ? 'text-green-400' : 'text-yellow-400'}`}>{payment.status.replace('_', ' ')}</p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mt-2">
                <div className="bg-pink-600 h-2.5 rounded-full" style={{width: `${paidPercentage}%`}}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1 text-right">₹{payment.paidAmount.toFixed(2)} of ₹{summary.total.toFixed(2)} paid</p>
        </div>
    );
};

const ShippingAddressCard = ({ address }) => {
    const nameMatch = address.name.match(/(.*?)\((\d+)\)/);
    const name = nameMatch ? nameMatch[1] : address.name;
    const phone = nameMatch ? nameMatch[2] : 'N/A';
    
    return (
        <div className="relative bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-900">
            {/* --- NEW: Details button --- */}
            <button 
                onClick={() => alert('Show detailed status modal!')} 
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
                <InformationCircleIcon className="w-6 h-6" />
            </button>
            
            <h3 className="text-lg font-semibold text-white mb-4">Customer & Shipping</h3>
            <div className="flex items-start space-x-4">
                <UserCircleIcon className="text-pink-400 w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                    <p className="font-semibold text-white">{name}</p>
                    <p className="text-sm text-gray-400">Phone: {phone}</p>
                </div>
            </div>
            <div className="border-t border-gray-800 my-4"></div>
            <div className="flex items-start space-x-4">
                <MapPinIcon className="text-pink-400 w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                    <p className="font-semibold text-white">Shipping Address</p>
                    <p className="text-sm text-gray-400">{address.address}, {address.city}</p>
                </div>
            </div>
        </div>
    );
};

// --- MODIFIED: Component to include signature toggle ---
const PaymentStatementsCard = ({ statements }) => {
    const [visibleSignatures, setVisibleSignatures] = useState({});

    const toggleSignature = (paymentId) => {
        setVisibleSignatures(prev => ({ ...prev, [paymentId]: !prev[paymentId] }));
    };

    return (
        <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-900">
            <h3 className="text-lg font-semibold text-white mb-4">Payment Statements</h3>
            <div className="space-y-4">
                {statements.map(s => (
                    <div key={s.paymentId} className="border-b border-gray-800 last:border-b-0 pb-4 last:pb-0">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-3">
                                <CreditCardIcon className="w-5 h-5 text-green-400" />
                                <div>
                                    <p className="text-white font-medium">{s.method.replace('_', ' ')}</p>
                                    <p className="text-gray-500 text-xs">{s.paymentId}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-green-400">₹{s.amount.toFixed(2)}</p>
                                <p className="text-gray-500 text-xs">{s.date}</p>
                            </div>
                        </div>
                        {s.signature && (
                            <>
                                <div className="mt-2 text-right">
                                    <button
                                        onClick={() => toggleSignature(s.paymentId)}
                                        className="text-xs text-pink-400 hover:text-pink-300 font-semibold"
                                    >
                                        {visibleSignatures[s.paymentId] ? 'Hide Signature' : 'Show Signature'}
                                    </button>
                                </div>
                                {visibleSignatures[s.paymentId] && (
                                    <div className="mt-2 p-3 bg-gray-900/50 rounded-lg">
                                        <p className="text-xs text-gray-400 break-all">{s.signature}</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


const ConfirmationModal = ({ isOpen, onCancel, onConfirm, status }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-center">
                <h3 className="text-lg font-bold text-white">Confirm Status Change</h3>
                <p className="text-gray-400 mt-2 text-sm">Are you sure you want to change the order status to <span className="font-bold text-pink-400">{status}</span>?</p>
                <div className="mt-6 flex justify-center gap-4">
                    <button onClick={onCancel} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-28">Cancel</button>
                    <button onClick={onConfirm} className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg w-28">Confirm</button>
                </div>
            </div>
        </div>
    );
};

// --- Main Order Detail Page Component ---
export default function OrderDetailPage() {
    const [order, setOrder] = useState(null);
    const [isStatusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [pendingStatus, setPendingStatus] = useState('');
    const navigate = useNavigate();
    const {orderId} = useParams();

    const openConfirmationModal = (newStatus) => {
        setPendingStatus(newStatus);
        setModalOpen(true);
        setStatusDropdownOpen(false);
    };

    const handleConfirmStatusChange = () => {
        setOrder(prevOrder => {
            const newTracking = prevOrder.tracking.map(track => ({
                ...track,
                completed: track.status === pendingStatus ? true : track.completed
            }));
            const pendingIndex = newTracking.findIndex(t => t.status === pendingStatus);
            for (let i = 0; i < pendingIndex; i++) {
                newTracking[i].completed = true;
            }
            return { ...prevOrder, orderStatus: pendingStatus, tracking: newTracking };
        });

        //Pending status has now status to update
        //method to update status of order
        const updateStatus = async () => {
            const jwtToken = Cookies.get("jwtToken");
            if(!jwtToken) {navigate("/login")};
            const apiUri = "http://localhost:8080/admin/update-order-status";
            try{
                const response = await fetch(apiUri,{
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    body: JSON.stringify({
                        orderId: order.orderId,
                        status:pendingStatus
                    }),
                })
                
                if(!response.ok) {
                    throw new Error("Error Updating order status : ", response.statusText);
                }

            } catch (error) {
                console.log("updation of order status failed : ",error);
            }
        }
        updateStatus();
        setModalOpen(false);
        setPendingStatus('');
    };

    const fetchOrderDetail = useCallback( async () => {
        const jwtToken = Cookies.get("jwtToken");
        //Navigate to login if no jwttoken
        if(!jwtToken) {
            navigate("/login");
        }
        try{
            const fullUri = `http://localhost:8080/admin/get-order-detail?id=${orderId}`;
            const response = await fetch(fullUri,{
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if(!response.ok) {
                throw new Error("Response Not Ok");
            }

            const result = await response.json();
            setOrder(result);

        } catch(error) {
            console.log("Error fetching order detail : ",error);
        }
    },[orderId,navigate]);

    useEffect(() => {
        fetchOrderDetail();
    },[fetchOrderDetail]);

    const getStatusClass = (status) => {
        switch (status) {
            case 'SHIPPED': return 'bg-cyan-500/20 text-cyan-400';
            case 'PROCESSING': return 'bg-yellow-500/20 text-yellow-400';
            case 'DELIVERED': return 'bg-green-500/20 text-green-400';
            case 'NONDELIVERED': return 'bg-orange-500/20 text-orange-400';
            case 'CANCELLED': return 'bg-red-500/20 text-red-400';
            case 'RETURNED': return 'bg-red-500/20 text-red-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    
    if(order === null) {
        return (
            <div>Loading...</div>
        )
    } else {
        
        const statusList = [...order.tracking, { status: 'CANCELLED', completed: order.orderStatus === 'CANCELLED' }];
    return (
        <>
            <ConfirmationModal 
                isOpen={isModalOpen} 
                onCancel={() => setModalOpen(false)} 
                onConfirm={handleConfirmStatusChange}
                status={pendingStatus}
            />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Order #{order.orderId}</h1>
                        <p className="text-gray-400 mt-1">Order placed on {order.orderedAt}</p>
                    </div>
                    <div className="relative">
                        <button 
                            onClick={() => setStatusDropdownOpen(!isStatusDropdownOpen)}
                            className="flex items-center justify-between w-48 bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg text-white font-semibold"
                        >
                            <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusClass(order.orderStatus)}`}>{order.orderStatus}</span>
                            <ChevronDownIcon />
                        </button>
                        {isStatusDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-10 p-1">
                                {statusList.map(statusItem => (
                                    <button 
                                        key={statusItem.status}
                                        onClick={() => !statusItem.completed && openConfirmationModal(statusItem.status)}
                                        disabled={statusItem.completed}
                                        className={`w-full flex items-center justify-between text-left px-3 py-2 text-sm rounded-md ${
                                            statusItem.completed 
                                            ? 'bg-green-500/10 text-green-400 cursor-not-allowed'
                                            : 'text-gray-300 hover:bg-pink-600 hover:text-white'
                                        }`}
                                    >
                                        <span>{statusItem.status}</span>
                                        {statusItem.completed && <CheckCircleIcon className="w-4 h-4 text-green-500" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <OrderItemsCard items={order.items} />
                        <PaymentStatementsCard statements={order.payment.statements} />
                    </div>
                    <div className="space-y-6">
                        <PricingCard summary={order.summary} payment={order.payment} />
                        <ShippingAddressCard address={order.shippingAddress} />
                    </div>
                </div>
            </div>
        </>
    )};
}
