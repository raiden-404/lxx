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
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";

// Options after navigation
const pages = [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ]

// ... (navigation data remains the same)

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const user = useSelector((state) => state.user.items);
  const [navigation, setNavigation] = useState(null);

  useEffect(() => {
    fetchNavigation();
  },[]);

  useEffect(() => {
    console.log(navigation);
  },[navigation]);

  const fetchNavigation = async () => {
    const uri = "http://localhost:8080/public/get-navbar-lists";
    const response = await fetch(uri);
    const result = await response.json();
    setNavigation(result);
  }



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
            {navigation == null ? <></> : 
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
                    <div className="grid grid-cols-2 gap-x-4">
                      {nav.featured.map((item) => (
                        <Link to={`/collection/${item.value}/All`} onClick={() => setMobileMenuOpen(false)}>
                        <div key={item.id} className="group relative text-sm">
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
                    {nav.slugs.map((slug) => (
                      <div key={slug.id}>
                        <p
                          id={`${nav.id}-${slug.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {slug.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${nav.id}-${slug.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {slug.items.map((item) => (
                            <li key={item.id} className="flow-root">
                              <Link
                                to={`/collection/${slug.value}/${item.name}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
}
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
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Create account
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <a href="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg"
                  className="block h-auto w-5 shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">
                  Become a Seller
                </span>
                <span className="sr-only">, change currency</span>
              </a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Monitor Screen */}
      <header className="relative bg-white">
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
                {navigation == null ? <></> : 
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
                                  {nav.featured.map((item) => (
                                  <Link to={`/collection/${item.value}/All`} onClick={() => setActiveCategory(null)}>
                                    <div
                                      key={item.id}
                                      className="group relative text-base sm:text-sm"
                                    >
                                      <img
                                        alt={item.altText}
                                        src={item.image}
                                        className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                      />
                                      <p
                                        className="mt-6 block font-medium text-gray-900"
                                      >
                                        {item.name}
                                      </p>
                                      <p className="mt-1">Shop now</p>
                                    </div>
                                    </Link>
                                  
                                  ))}
                                </div>
                                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
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
                                              onClick={() => setActiveCategory(null)}
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
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
}
              </div>

              <div className="ml-auto flex items-center">
                {/* User-login Button */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end ">
                  <Link
                    to={"/login"}
                    onClick={() => setShowSearch(false)}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800 me-3"
                  >
                    {user == null ? "Login" :
                     <div className="flex max-w-64 items-center rounded-3xl p-1 gap-2 hover:border-2 border-2 border-white hover:border-gray-300 hover:bg-gray-100">
                        <div className="overflow-hidden h-7 w-7 rounded-full"><img src={user.picture} alt={user.picture} /></div>
                        <div>{user.fullName}</div>
                        <div className="pe-1"><ChevronDown size={20} /></div>
                      </div>}
                  </Link>
                  <span className="h-6 w-px bg-gray-200" />
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <Link
                    to="/seller"
                    onClick={() => setShowSearch(false)}
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <img
                      alt=""
                      src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg"
                      className="block h-auto w-5 shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">
                      Become a Seller
                    </span>
                  </Link>
                </div>

                <div className="flex lg:ml-6">
                  <a
                    onClick={() => setShowSearch(!showSearch)}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <MagnifyingGlassIcon className="size-6" />
                  </a>
                </div>

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
              </div>
            </div>
          </div>
        </nav>
        {showSearch ? <SearchBar setShowSearch={setShowSearch} /> : <></>}
      </header>
    </div>
  );
}
export default Navbar;