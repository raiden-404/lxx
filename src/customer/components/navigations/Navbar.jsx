"use client";
import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from "@headlessui/react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  LogIn,
  LogOut,
  Package,
} from "lucide-react";

// Options after navigation
const pages = [
  { name: "Company", href: "#" },
  { name: "Wishlist", href: "#" },
];

// ... (navigation data remains the same)

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const user = useSelector((state) => state.user.items);
  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);
  const [navigation, setNavigation] = useState(null);
  const [profileList, setProfileList] = useState(false);
  const navigate = useNavigate();

  //Accordian
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  useEffect(() => {
    fetchNavigation();
  }, []);

  useEffect(() => {}, [navigation]);

  const fetchNavigation = async () => {
    const uri = `${import.meta.env.VITE_API_URL}/public/get-navbar-lists`;
    const response = await fetch(uri);
    const result = await response.json();
    setNavigation(result);
  };

  return (
    <div className="bg-white sticky z-30 w-full top-0 left-0">
      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-40 lg:hidden"
      >
        {/* ... (mobile menu content remains exactly the same) */}
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            {navigation == null ? (
              <></>
            ) : (
              <TabGroup className="mt-2">
                <div className="border-b border-gray-200">
                  <TabList className="-mb-px flex space-x-8 px-4">
                    {navigation.map((nav) => (
                      <Tab
                        key={nav.id}
                        className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                      >
                        {nav.name}
                      </Tab>
                    ))}
                  </TabList>
                </div>
                <TabPanels as={Fragment}>
                  {navigation.map((nav) => (
                    <TabPanel
                      key={nav.id}
                      className="space-y-10 px-4 pt-10 pb-8"
                    >
                      {/* Featured images */}
                      <div className="grid grid-cols-2 gap-x-4">
                        {nav.featured.map((item) => (
                          <Link
                            to={`/collection/${item.value}/All`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div
                              key={item.id}
                              className="group relative text-sm"
                            >
                              <img
                                alt={item.altText}
                                src={item.image}
                                className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                              />
                              <p
                                href="#"
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0 z-10"
                                />
                                {item.name}
                              </p>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Slugs lists accordian */}
                      <div className="flex flex-col gap-4">
                        {nav.slugs.map((slug, idx) => (
                          <Accordion
                            key={slug.id}
                            className="shadow-md rounded-lg "
                            open={open === idx + 1}
                          >
                            <AccordionHeader
                              className=""
                              onClick={() => handleOpen(idx + 1)}
                            >
                              <div className=" flex items-center justify-between px-3 text-md text-slate-700 w-full">
                                {slug.name}
                                {open === idx + 1 ? (
                                  <ChevronUp size={18} />
                                ) : (
                                  <ChevronDown size={18} />
                                )}
                              </div>
                            </AccordionHeader>
                            <AccordionBody className="flex flex-col text-md px-4 gap-4 font-semibold text-gray-600">
                              {slug.items.map((item) => (
                                <div key={item.id}>
                                  <Link
                                    to={`/collection/${slug.value}/${item.name}`}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setOpen(0);
                                    }}
                                  >
                                    {item.name}
                                  </Link>
                                </div>
                              ))}
                            </AccordionBody>
                          </Accordion>
                        ))}
                      </div>
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>
            )}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {/* Profile */}
              {user === null ? (
                <div
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="flex items-center gap-2"
                >
                  <LogIn size={18} />
                  <a
                    href="#"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Login
                  </a>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <img
                    className="h-8 aspect-square rounded-full"
                    src={user.picture}
                    alt={user.fullName}
                  />
                  <h1 className="text-md font-semibold">{user.fullName}</h1>
                </div>
              )}
              {/* Wishlist */}
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/wishlist");
                }}
                className="flex items-center gap-2"
              >
                <Heart size={18} color="red" />
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Wishlist
                </a>
                <p className="font-semibold">({wishlist.length || 0})</p>
              </div>
              {/* My orders */}
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/my-orders");
                }}
                className="flex items-center gap-2"
              >
                <Package size={18} />
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  My Orders
                </a>
              </div>
              {/* Logout */}
              {user && (
                <div
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/logout");
                  }}
                  className="flex items-center gap-2"
                >
                  <LogOut size={18} />
                  <a
                    href="#"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Monitor Screen ---------------------------------------- */}
      <header className="bg-white relative">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6"
        >
          <div>
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => (setMobileMenuOpen(true), setShowSearch(false))}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <Bars3Icon className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0 lg:mr-4">
                <Link to="/" onClick={() => setShowSearch(false)}>
                  <img
                    alt=""
                    src="https://storage.googleapis.com/lx_images/frontend_statics/image/lx-logo.png"
                    className="h-8 w-auto scale-[180%]"
                  />
                </Link>
              </div>

              {/* Flyout menus with hover functionality */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                {/* Navigation */}
                {navigation == null ? (
                  <></>
                ) : (
                  <div className="flex h-full space-x-8">
                    {navigation.map((nav) => (
                      <div
                        key={nav.id}
                        className="flex"
                        onMouseEnter={() => setActiveCategory(nav.id)}
                        onMouseLeave={() => setActiveCategory(null)}
                      >
                        <div className="relative flex">
                          <button
                            className={`group relative flex items-center justify-center text-sm font-medium ${
                              activeCategory === nav.id
                                ? "text-indigo-600"
                                : "text-gray-700 hover:text-gray-800"
                            }`}
                          >
                            {nav.name}
                            <span
                              className={`absolute inset-x-0 -bottom-px z-30 h-0.5 transition-all duration-200 ${
                                activeCategory === nav.id
                                  ? "bg-indigo-600"
                                  : "bg-transparent group-hover:bg-gray-300"
                              }`}
                            />
                          </button>
                        </div>

                        <Transition
                          show={activeCategory === nav.id}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div
                            className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500 shadow-lg"
                            onMouseEnter={() => setActiveCategory(nav.id)}
                            onMouseLeave={() => setActiveCategory(null)}
                          >
                            <div
                              className="absolute inset-0 top-1/2 bg-white shadow-sm"
                              aria-hidden="true"
                            />
                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {/* Featured */}
                                    {nav.featured.map((item) => (
                                      <Link
                                        to={`/collection/${item.value}/All`}
                                        onClick={() => setActiveCategory(null)}
                                      >
                                        <div
                                          key={item.id}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <img
                                            alt={item.altText}
                                            src={item.image}
                                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                          />
                                          <p className="mt-6 block font-medium text-gray-900">
                                            {item.name}
                                          </p>
                                          <p className="mt-1">Shop now</p>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                    {/* Slugs */}
                                    {nav.slugs.map((slug) => (
                                      <div key={slug.id}>
                                        <p className="font-medium text-gray-900">
                                          {slug.name}
                                        </p>
                                        <ul className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                          {slug.items.map((item) => (
                                            <li key={item.id} className="flex">
                                              <Link
                                                to={`/collection/${slug.value}/${item.name}`}
                                                onClick={() =>
                                                  setActiveCategory(null)
                                                }
                                                className="hover:text-gray-800"
                                              >
                                                {item.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Transition>
                      </div>
                    ))}

                    {pages.map((page) => (
                      <Link
                        to="wishlist"
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="ml-auto flex items-center">
                {/* User-login Button */}
                <div className="hidden lg:flex relative lg:flex-1">
                  <div
                    onClick={() => setShowSearch(false)}
                    className="text-sm flex flex-col font-medium text-gray-700 hover:text-gray-800 me-3"
                  >
                    {user == null ? (
                      <Link to="/login">Login</Link>
                    ) : (
                      <div
                      className="cursor-pointer"
                        onClick={() => setProfileList(!profileList)}
                      >
                        <div className="flex relative max-w-64 items-center rounded-xl p-1 gap-2 ">
                          <div className="overflow-hidden h-7 w-7 rounded-full">
                            <img
                              src={user.picture}
                              alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            />
                          </div>
                          <div>{user.fullName}</div>
                          <div className="pe-1">
                            <ChevronDown size={20} />
                          </div>
                        </div>
                        {profileList && (
                          <div
                            id="profile-list"
                            className=" top-10 absolute overflow-hidden max-w-64 bg-white rounded-xl w-[95%]"
                          >
                            <ul className="flex flex-col justify-center">
                              <Link to="/my-orders">
                                <li className="flex items-end gap-1 hover:bg-gray-100 px-5 py-2 pt-4 ">
                                  <Package size={18} />
                                  My Orders
                                </li>
                              </Link>
                              <Link to="/wishlist">
                                <li className="flex items-end gap-1 hover:bg-gray-100 px-5 py-2 ">
                                  <Heart size={17} stroke="red" />
                                  Wishlist ({wishlist.length || 0})
                                </li>
                              </Link>
                              <Link to="/logout">
                                <li className="flex items-end gap-1 hover:bg-gray-100 px-5 py-2 pb-4">
                                  <LogOut size={17} />
                                  Logout
                                </li>
                              </Link>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="h-6 w-px bg-gray-200" />
                </div>
                
                {/* Search option */}
                <div className="flex cursor-pointer lg:ml-6">
                  <a
                    onClick={() => setShowSearch(!showSearch)}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <MagnifyingGlassIcon className="size-6" />
                  </a>
                </div>
                {/* Cart Option */}
                {cart == null ? (
                  // When item is Zero
                  <div className="ml-4 flow-root lg:ml-6">
                    <Link
                      to="/cart"
                      onClick={() => setShowSearch(false)}
                      className="group -m-2 flex items-center p-2"
                    >
                      <ShoppingBagIcon className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        0
                      </span>
                    </Link>
                  </div>
                ) : (
                  // When item is more then zero
                  <div className="ml-4 flow-root lg:ml-6">
                    <Link
                      to="/cart"
                      onClick={() => setShowSearch(false)}
                      className="group -m-2 flex items-center bg-pink-100 rounded-full px-3 border-2 hover:bg-pink-300 border-pink-500 hover:border-pink-700 py-1"
                    >
                      <ShoppingBagIcon className="size-6 shrink-0 text-pink-700 group-hover:text-black" />
                      <span className="ml-2 text-md font-medium text-black">
                        {cart.items.length}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        {showSearch ? <SearchBar setShowSearch={setShowSearch} /> : <></>}
      </header>
    </div>
  );
};
export default Navbar;
