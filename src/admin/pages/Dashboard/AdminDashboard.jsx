import React from 'react';

// --- SVG Icon Components ---
// A collection of icons for different sections of the dashboard.
const UsersIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.003c0 1.113.285 2.16.786 3.07M15 19.128c-1.113 0-2.16-.285-3.07-.786m7.73-10.608c.091-.355.182-.71.27-1.065A18.06 18.06 0 0018 5.475c-2.138 0-4.053.778-5.594 2.082s-2.082 3.456-2.082 5.594c0 2.138.778 4.053 2.082 5.594s3.456 2.082 5.594 2.082c.861 0 1.68-.14 2.44-.401m-3.07-5.594c0 1.113.285 2.16.786 3.07" />
    </svg>
);
const PackageIcon = ({ className = "w-6 h-6" }) => (
     <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
);
const TruckIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v.958m12.026 11.177a48.554 48.554 0 00-10.026 0m10.026 0L18.75 4.5m-12 0L3.375 4.5" />
    </svg>
);
const DollarSignIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const ChevronDownIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);
const StarIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.215-.662 1.536 0l1.818 3.765 4.156.604c.73.106 1.021.996.494 1.508l-3.008 2.932.71 4.14c.125.726-.638 1.28-1.29.944L10 15.11l-3.72 1.956c-.652.336-1.415-.218-1.29-.944l.71-4.14-3.008-2.932c-.527-.512-.236-1.402.494-1.508l4.156-.604 1.818-3.765z" clipRule="evenodd" />
    </svg>
);


// --- Individual Dashboard Components ---

const StatCard = ({ icon, title, value, change, changeType, color }) => (
    <div className={`relative overflow-hidden bg-black p-6 rounded-2xl border border-gray-900`}>
        <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full bg-${color}-500/20 blur-2xl`}></div>
        <div className="relative z-10">
            <div className={`bg-gray-900 border border-gray-800 w-12 h-12 flex items-center justify-center rounded-full text-${color}-400`}>
                {icon}
            </div>
            <p className="text-3xl font-bold text-white mt-4">{value}</p>
            <div className="flex items-center space-x-2 mt-1">
                <p className="text-sm text-gray-400">{title}</p>
                <p className={`text-xs font-semibold px-2 py-0.5 rounded-full ${changeType === 'increase' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {change}
                </p>
            </div>
        </div>
    </div>
);

const RevenueChart = () => {
    // Mock data points [x, y] for the trade graph
    const dataPoints = [
        [0, 80], [40, 60], [80, 75], [120, 50], [160, 65], [200, 40], [240, 55], [280, 30], [320, 45]
    ];
    
    // Create the string for the polyline
    const polylinePoints = dataPoints.map(p => p.join(',')).join(' ');
    // Create the path for the filled area underneath the line
    const areaPath = `M ${dataPoints[0][0]},100 ` + polylinePoints + ` L ${dataPoints[dataPoints.length - 1][0]},100 Z`;

    return (
        <div className="bg-black p-6 rounded-2xl border border-gray-900 h-[400px] flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">Monthly Revenue</h3>
                    <p className="text-sm text-gray-500">Last 30 Days</p>
                </div>
                <button className="flex items-center space-x-2 text-sm text-gray-400 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-800">
                    <span>Monthly</span>
                    <ChevronDownIcon />
                </button>
            </div>
            <div className="flex-grow mt-4 relative">
                <svg width="100%" height="100%" viewBox="0 0 320 100" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 0.4 }} />
                            <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0 }} />
                        </linearGradient>
                    </defs>
                    <path d={areaPath} fill="url(#pinkGradient)" />
                    <polyline fill="none" stroke="#ec4899" strokeWidth="2" points={polylinePoints} />
                    {dataPoints.map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="3" fill="#ec4899" stroke="#000" strokeWidth="1.5" />
                    ))}
                </svg>
                <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-600">
                    {[...Array(5)].map((_, i) => <div key={i} className="w-full border-t border-gray-900"></div>)}
                </div>
            </div>
        </div>
    );
};

const TopProducts = () => {
    const products = [
        { name: "Wireless Noise-Cancelling Headphones", sold: 321, img: "https://placehold.co/100x100/ec4899/000000?text=🎧" },
        { name: "Smartwatch Series 8", sold: 245, img: "https://placehold.co/100x100/ec4899/000000?text=⌚️" },
        { name: "4K Action Camera", sold: 189, img: "https://placehold.co/100x100/ec4899/000000?text=📷" },
        { name: "Mechanical Gaming Keyboard", sold: 156, img: "https://placehold.co/100x100/ec4899/000000?text=⌨️" },
    ];
    return (
        <div className="bg-black p-6 rounded-2xl border border-gray-900 h-full">
            <h3 className="text-lg font-semibold text-white mb-4">Top Products This Month</h3>
            <div className="space-y-4">
                {products.map(p => (
                    <div key={p.name} className="flex items-center space-x-4">
                        <img src={p.img} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-gray-900" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/1f2937/ffffff?text=Error'; }}/>
                        <div className="flex-grow">
                            <p className="text-white font-medium text-sm">{p.name}</p>
                        </div>
                        <p className="text-lg font-bold text-white">{p.sold}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RecentReviews = () => {
    const reviews = [
        { name: "Alex Johnson", rating: 5, comment: "Absolutely fantastic product, exceeded all my expectations!" },
        { name: "Maria Garcia", rating: 4, comment: "Good quality and fast shipping. Would buy again." },
        { name: "Chen Wei", rating: 5, comment: "Incredible value for the price. Highly recommended." },
    ];
    return (
        <div className="bg-black p-6 rounded-2xl border border-gray-900 h-full">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Customer Reviews</h3>
            <div className="space-y-5">
                {reviews.map(r => (
                    <div key={r.name}>
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold text-sm">{r.name}</p>
                            <div className="flex items-center">
                                {[...Array(r.rating)].map((_, i) => <StarIcon key={i} className="text-yellow-400" />)}
                                {[...Array(5 - r.rating)].map((_, i) => <StarIcon key={i} className="text-gray-700" />)}
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mt-1 italic">"{r.comment}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const GeoSales = () => (
    <div className="bg-black p-6 rounded-2xl border border-gray-900 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-white mb-4">Sales by Region</h3>
        <div className="flex-grow bg-gray-900 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">[World Map Visualization]</p>
        </div>
    </div>
);

const TopStates = () => {
    const states = [
        { name: "California", sales: 1250 },
        { name: "New York", sales: 980 },
        { name: "Texas", sales: 850 },
        { name: "Florida", sales: 720 },
        { name: "Illinois", sales: 650 },
    ];
    return (
        <div className="bg-black p-6 rounded-2xl border border-gray-900 h-full flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4">Top States by Sales</h3>
            <div className="space-y-3 flex-grow">
                {states.map(s => (
                    <div key={s.name} className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">{s.name}</span>
                        <span className="font-semibold text-white">${s.sales.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Dashboard Page Component ---
export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Top row with stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<DollarSignIcon />} title="Monthly Revenue" value="$58,372" change="+12.8%" changeType="increase" color="green" />
        <StatCard icon={<UsersIcon />} title="Monthly Customers" value="387" change="+8.2%" changeType="increase" color="blue" />
        <StatCard icon={<TruckIcon />} title="Pending Orders" value="72" change="+5" changeType="increase" color="yellow" />
        <StatCard icon={<PackageIcon />} title="Items Sold This Month" value="1,245" change="+11.4%" changeType="increase" color="pink" />
      </div>

      {/* Full-width revenue chart */}
      <div>
        <RevenueChart />
      </div>

      {/* Top Products and Reviews side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopProducts />
          <RecentReviews />
      </div>
      
      {/* Geo Sales and Top States with 70/30 split and increased height */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 h-[400px]">
          <div className="lg:col-span-7">
            <GeoSales />
          </div>
          <div className="lg:col-span-3">
            <TopStates />
          </div>
      </div>
    </div>
  );
}
