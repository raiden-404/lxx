import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

// --- SVG Icon Components ---
// Using inline SVGs for icons to avoid external dependencies and ensure they load quickly.
// They are simple functional components that return SVG markup.

const HomeIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const PackageIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v2" />
    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5" />
    <path d="M12 16.5 3.5 12 12 7.5l8.5 4.5L12 16.5z" />
    <path d="m3.5 12 8.5 4.5 8.5-4.5" />
    <path d="M12 22V16.5" />
  </svg>
);

const ShoppingCartIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const UsersIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BarChartIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const TagIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2H2v10l10 10 10-10L12 2z" />
    <path d="M7 7h.01" />
  </svg>
);

const MegaphoneIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
);

const GridIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="3" />
  </svg>
);

const SettingsIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const MenuIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const BellIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const MailIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// --- Sidebar Component ---
const Sidebar = ({
  activeItem,
  setActiveItem,
  isSidebarOpen,
  setSidebarOpen,
}) => {
  const navItems = [
    { id: "", label: "Dashboard", icon: <HomeIcon /> },
    { id: "products", label: "Products", icon: <PackageIcon /> },
    { id: "orders", label: "Orders", icon: <ShoppingCartIcon /> },
    { id: "customers", label: "Customers", icon: <UsersIcon /> },
    { id: "analytics", label: "Analytics", icon: <BarChartIcon /> },
    { id: "marketing", label: "Marketing", icon: <MegaphoneIcon /> },
    { id: "discounts", label: "Discounts", icon: <TagIcon /> },
    { id: "integrations", label: "Integrations", icon: <GridIcon /> },
  ];

  const LinkComponent = ({ item }) => (
    <Link
      to={item.id} // Replace with router links
      key={item.id}
      onClick={() => {
        setActiveItem(item.id);

        if (window.innerWidth < 1024) {
          setSidebarOpen(false);
        }
      }}
      className={`flex items-center justify-center lg:justify-start px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${
        activeItem === item.id
          ? "bg-pink-600 text-white shadow-lg"
          : "hover:bg-gray-900 hover:text-white"
      }`}
    >
      {React.cloneElement(item.icon, { className: "w-6 h-6 flex-shrink-0" })}
      <span className="ml-4 font-medium whitespace-nowrap opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
        {item.label}
      </span>
    </Link>
  );

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-30 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`group fixed top-0 left-0 h-full bg-black text-gray-400 flex flex-col z-40 transition-all duration-300 ease-in-out border-r rounded-2xl border-gray-600
        ${
          isSidebarOpen ? "w-64" : "w-0 lg:w-[74px]"
        } lg:hover:w-64 overflow-hidden`}
      >
        <div className="flex items-center justify-center h-20 flex-shrink-0 ">
          <PackageIcon className="h-8 w-8 text-pink-500 transition-transform duration-300 group-hover:rotate-12" />
          <span className="ml-3 text-2xl font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Laxmi Customize
          </span>
        </div>

        <nav className="flex-1 px-2 py-6 space-y-2">
          {navItems.map((item) => (
            <LinkComponent item={item} key={item.id} />
          ))}
        </nav>

        <div className="px-2 py-6 border-t border-gray-900 flex-shrink-0">
          <LinkComponent
            item={{ id: "settings", label: "Settings", icon: <SettingsIcon /> }}
          />
        </div>
      </aside>
    </>
  );
};

// --- Header Component ---
const Header = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  return (
    <div className="h-20 flex-shrink-0">
      <header className="h-full px-4 md:px-10 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <MenuIcon />
        </button>
        <div onClick={() => navigate("/")} className="flex-grow cursor-pointer">Laxmi Customize</div>

        <div className="flex items-center space-x-8">
          <button className="relative text-gray-400 hover:text-white transition-colors duration-200">
            <MailIcon />
          </button>
          <button className="relative text-gray-400 hover:text-white transition-colors duration-200">
            <BellIcon />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 text-white text-xs items-center justify-center">
                3
              </span>
            </span>
          </button>
          <div className="relative">
            <button className="flex items-center space-x-3">
              <img
                src="https://placehold.co/40x40/ec4899/ffffff?text=A"
                alt="Admin"
                className="h-10 w-10 rounded-full border-2 border-pink-500 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/40x40/cccccc/ffffff?text=A";
                }}
              />
              <div className="hidden md:block text-left">
                <span className="font-semibold text-gray-200">Admin</span>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </button>
          </div>
        </div>
      </header>
      <div className="w-[98%] mx-auto h-[1px] bg-gray-900"></div>
    </div>
  );
};

// --- Main App Layout Component ---
const AdminLayout = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
      <div className="bg-black min-h-screen font-sans text-gray-300">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="lg:ml-20 transition-all duration-300">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
export default AdminLayout;
