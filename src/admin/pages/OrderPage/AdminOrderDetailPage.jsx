import React, { useState } from 'react';

// --- SVG Icon Components ---
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


// --- Mock Data for a Single Order ---
const orderDetailData = {
    id: '#LX84522',
    date: 'August 19, 2025',
    status: 'Shipped',
    customer: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
    },
    shippingAddress: {
        street: '123 Tech Avenue',
        city: 'Silicon Valley',
        state: 'CA',
        zip: '94043',
    },
    items: [
        { id: 'PROD-KBD-001', name: "Keyboard", imgUrl: "https://placehold.co/100x100/f59e0b/000000?text=⌨️", price: 120.00, qty: 1 },
        { id: 'PROD-CAM-002', name: "Camera", imgUrl: "https://placehold.co/100x100/10b981/000000?text=📷", price: 250.00, qty: 1 },
        { id: 'PROD-MSE-003', name: "Mouse", imgUrl: "https://placehold.co/100x100/6366f1/000000?text=🖱️", price: 45.50, qty: 2 },
        { id: 'PROD-WBC-004', name: "Webcam", imgUrl: "https://placehold.co/100x100/ef4444/000000?text=📹", price: 80.00, qty: 1 },
    ],
    pricing: {
        subtotal: 541.00,
        shipping: 15.00,
        tax: 34.50,
        total: 590.50,
    },
    payment: {
        status: 'Partially Paid',
        paidAmount: 500.00,
        statements: [
            { id: 'txn_1a2b3c4d5e', method: 'Visa **** 4242', date: 'Aug 19, 2025', amount: 500.00, type: 'Payment' },
            { id: 'txn_ref_9z8y7x6w', method: 'Refund to Visa **** 4242', date: 'Aug 20, 2025', amount: -50.00, type: 'Refund' },
            { id: 'txn_5f6g7h8i9j', method: 'Visa **** 4242', date: 'Aug 21, 2025', amount: 50.00, type: 'Payment' },
        ]
    }
};

// --- Sub-Components for the Order Detail Page ---

const OrderItemsCard = ({ items }) => (
    <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-900">
        <h3 className="text-lg font-semibold text-white mb-4">Order Items ({items.length})</h3>
        <div className="space-y-4">
            {items.map(item => (
                <div key={item.id} className="flex items-center space-x-4 text-sm">
                    <img src={item.imgUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-900" />
                    <div className="flex-grow">
                        <p className="text-white font-semibold">{item.name}</p>
                        <p className="text-gray-500 text-xs">ID: {item.id}</p>
                        <p className="text-gray-400">Qty: {item.qty}</p>
                    </div>
                    <p className="text-white font-medium">${(item.price * item.qty).toFixed(2)}</p>
                </div>
            ))}
        </div>
    </div>
);

const PricingCard = ({ pricing, payment }) => {
    const paidPercentage = (payment.paidAmount / pricing.total) * 100;
    return (
        <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-900">
            <h3 className="text-lg font-semibold text-white mb-4">Pricing</h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400"><span>Subtotal</span><span className="text-white">${pricing.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-400"><span>Shipping</span><span className="text-white">${pricing.shipping.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-400"><span>Tax</span><span className="text-white">${pricing.tax.toFixed(2)}</span></div>
                <div className="border-t border-gray-800 my-2"></div>
                <div className="flex justify-between text-white font-bold text-lg"><span>Total</span><span>${pricing.total.toFixed(2)}</span></div>
            </div>
            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Payment Status</h3>
            <p className={`font-semibold text-sm ${payment.status === 'Fully Paid' ? 'text-green-400' : 'text-yellow-400'}`}>{payment.status}</p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mt-2">
                <div className="bg-pink-600 h-2.5 rounded-full" style={{width: `${paidPercentage}%`}}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1 text-right">${payment.paidAmount.toFixed(2)} of ${pricing.total.toFixed(2)} paid</p>
        </div>
    );
};

const ShippingAddressCard = ({ customer, address }) => (
    <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-900">
        <h3 className="text-lg font-semibold text-white mb-4">Customer & Shipping</h3>
        <div className="flex items-start space-x-4">
            <UserCircleIcon className="text-pink-400 w-8 h-8 flex-shrink-0 mt-1" />
            <div>
                <p className="font-semibold text-white">{customer.name}</p>
                <p className="text-sm text-gray-400">{customer.email}</p>
            </div>
        </div>
        <div className="border-t border-gray-800 my-4"></div>
        <div className="flex items-start space-x-4">
            <MapPinIcon className="text-pink-400 w-8 h-8 flex-shrink-0 mt-1" />
            <div>
                <p className="font-semibold text-white">Shipping Address</p>
                <p className="text-sm text-gray-400">{address.street}, {address.city}, {address.state} {address.zip}</p>
            </div>
        </div>
    </div>
);

const PaymentStatementsCard = ({ statements }) => (
    <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-900">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Statements</h3>
        <div className="space-y-4">
            {statements.map(s => (
                <div key={s.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                        <CreditCardIcon className={`w-5 h-5 ${s.type === 'Refund' ? 'text-red-400' : 'text-green-400'}`} />
                        <div>
                            <p className="text-white font-medium">{s.method}</p>
                            <p className="text-gray-500 text-xs">{s.id}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`font-semibold ${s.type === 'Refund' ? 'text-red-400' : 'text-green-400'}`}>
                            {s.type === 'Refund' ? '-' : ''}${Math.abs(s.amount).toFixed(2)}
                        </p>
                        <p className="text-gray-500 text-xs">{s.date}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

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
    const [order, setOrder] = useState(orderDetailData);
    const [isStatusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [pendingStatus, setPendingStatus] = useState('');

    const openConfirmationModal = (newStatus) => {
        setPendingStatus(newStatus);
        setModalOpen(true);
        setStatusDropdownOpen(false);
    };

    const handleConfirmStatusChange = () => {
        setOrder({ ...order, status: pendingStatus });
        setModalOpen(false);
        setPendingStatus('');
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Shipped': return 'bg-cyan-500/20 text-cyan-400';
            case 'Processing': return 'bg-yellow-500/20 text-yellow-400';
            case 'Delivered': return 'bg-green-500/20 text-green-400';
            case 'Cancelled': return 'bg-red-500/20 text-red-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

    return (
        <>
            <ConfirmationModal 
                isOpen={isModalOpen} 
                onCancel={() => setModalOpen(false)} 
                onConfirm={handleConfirmStatusChange}
                status={pendingStatus}
            />
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Order {order.id}</h1>
                        <p className="text-gray-400 mt-1">Order placed on {order.date}</p>
                    </div>
                    <div className="relative">
                        <button 
                            onClick={() => setStatusDropdownOpen(!isStatusDropdownOpen)}
                            className="flex items-center justify-between w-48 bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg text-white font-semibold"
                        >
                            <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusClass(order.status)}`}>{order.status}</span>
                            <ChevronDownIcon />
                        </button>
                        {isStatusDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-10">
                                {statuses.map(s => (
                                    <button 
                                        key={s}
                                        onClick={() => openConfirmationModal(s)}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-pink-600 hover:text-white"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <OrderItemsCard items={order.items} />
                        <PaymentStatementsCard statements={order.payment.statements} />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <PricingCard pricing={order.pricing} payment={order.payment} />
                        <ShippingAddressCard customer={order.customer} address={order.shippingAddress} />
                    </div>
                </div>
            </div>
        </>
    );
}
