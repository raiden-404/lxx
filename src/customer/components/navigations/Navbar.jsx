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
import Cookies from "js-cookie";

const navigation = {
  categories: [
    {
      id: "greeting",
      name: "Greeting",
      featured: [
        {
          name: "Fancy Greeting Cards",
          href: "#",
          imageSrc:
            "https://artastherapyy.com/cdn/shop/files/Pinterest_Aesthetic_Greeting_Card.jpg?v=1752142467",
          imageAlt: "Fancy greeting cards in a colorful display.",
        },
        {
          name: "Mouse Pads",
          href: "#",
          imageSrc:
            "https://i.ebayimg.com/images/g/K64AAOSw1XBmeb12/s-l400.jpg",
          imageAlt: "Colorful and funky stickers and labels.",
        },
      ],
      sections: [
        {
          id: "cards",
          name: "Greeting Cards",
          items: [
            { name: "Fancy Greeting Cards", href: "#" },
            { name: "Attractive Greeting Cards", href: "#" },
            { name: "Graceful Greeting Cards", href: "#" },
            { name: "Classic Greeting Cards", href: "#" },
            { name: "Modern Greeting Cards", href: "#" },
          ],
        },
        {
          id: "labels",
          name: "Labels & Stickers",
          items: [
            { name: "Smarty Labels & Stickers", href: "#" },
            { name: "Funky Labels & Stickers", href: "#" },
            { name: "Classic Labels & Stickers", href: "#" },
            { name: "Fuzzy Labels & Stickers", href: "#" },
            { name: "Trendy Labels & Stickers", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [{ name: "Mouse Pad", href: "#" }],
        },
      ],
    },
    {
      id: "gifts-decor",
      name: "Gifting",
      featured: [
        {
          name: "Photo Frames Collection",
          href: "#",
          imageSrc:
            "https://cdn.shopify.com/s/files/1/0632/2526/6422/files/photo-frames-chance-and-change-photo-frame-collage-set-of-ten-1_b1b38438-4758-40e2-ab21-e2ea9a744fd8.jpg?v=1744116165",
          imageAlt: "Assorted stylish photo frames.",
        },
        {
          name: "Personalized Gift Boxes",
          href: "#",
          imageSrc:
            "https://i.pinimg.com/1200x/75/fd/d2/75fdd2be4240e3164e9ca6d923a7eb25.jpg",
          imageAlt: "Wrapped personalized gifts.",
        },
      ],
      sections: [
        {
          id: "photo-frames",
          name: "Photo Frames",
          items: [
            { name: "Classic Photo Frames", href: "#" },
            { name: "Fancy Photo Frames", href: "#" },
            { name: "Amazing Photo Frames", href: "#" },
            { name: "Graceful Photo Frames", href: "#" },
            { name: "Attractive Photo Frames", href: "#" },
            { name: "Wonderful Photo Frames", href: "#" },
          ],
        },
        {
          id: "personalized-gifts",
          name: "Personalized Gifts",
          items: [
            { name: "Personalized Gifts", href: "#" },
            { name: "Fancy Personalized Gifts", href: "#" },
            { name: "Useful Personalized Gifts", href: "#" },
            { name: "Attractive Personalized Gifts", href: "#" },
            { name: "Classy Personalized Gifts", href: "#" },
            { name: "Amazing Personalized Gifts", href: "#" },
          ],
        },
        {
          id: "wall-decor",
          name: "Paintings & Posters",
          items: [
            { name: "Trendy Paintings & Posters", href: "#" },
            { name: "Fashionable Paintings & Posters", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

// ... (navigation data remains the same)

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState("Log in");

  useEffect(() => {
    //Check is user token is present(is logged in) if yes then retrieve its data
    const jwtToken = Cookies.get("jwtToken");
    if(jwtToken) {
      const apiUri = "http://localhost:8080/profile/get-data";
      try{
      const fetchUser = async () => {
        //Use fetch function - pass method type, header
        //Get promise and store
        const response = await fetch(apiUri,{
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        //Change response into json
        const result = await response.json();
        setUser(result);
      }
      //Call the fetchUser function
      fetchUser();
    } catch (error) {
      console.error("Failed to fetch user data",error);
    }
  }
  },[]);

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
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pt-10 pb-8"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
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
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex"
                      onMouseEnter={() => setActiveCategory(category.id)}
                      onMouseLeave={() => setActiveCategory(null)}
                    >
                      <div className="relative flex">
                        <button
                          className={`group relative flex items-center justify-center text-sm font-medium ${
                            activeCategory === category.id
                              ? "text-indigo-600"
                              : "text-gray-700 hover:text-gray-800"
                          }`}
                        >
                          {category.name}
                          <span
                            className={`absolute inset-x-0 -bottom-px z-30 h-0.5 transition-all duration-200 ${
                              activeCategory === category.id
                                ? "bg-indigo-600"
                                : "bg-transparent group-hover:bg-gray-300"
                            }`}
                          />
                        </button>
                      </div>

                      <Transition
                        show={activeCategory === category.id}
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
                          onMouseEnter={() => setActiveCategory(category.id)}
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
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="group relative text-base sm:text-sm"
                                    >
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                      />
                                      <a
                                        href={item.href}
                                        className="mt-6 block font-medium text-gray-900"
                                      >
                                        {item.name}
                                      </a>
                                      <p className="mt-1">Shop now</p>
                                    </div>
                                  ))}
                                </div>
                                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                  {category.sections.map((section) => (
                                    <div key={section.name}>
                                      <p className="font-medium text-gray-900">
                                        {section.name}
                                      </p>
                                      <ul className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                        {section.items.map((item) => (
                                          <li key={item.name} className="flex">
                                            <a
                                              href={item.href}
                                              className="hover:text-gray-800"
                                            >
                                              {item.name}
                                            </a>
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

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    to={"/login"}
                    onClick={() => setShowSearch(false)}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {user}
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
