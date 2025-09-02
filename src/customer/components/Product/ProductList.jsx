import ProductCard from "./ProductCard";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductFilter from "./ProductFilter";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BaggageClaim, MonitorOff, ShoppingBag } from "lucide-react";

const ProductList = () => {
  const { search } = useParams();
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  //For cart and wishlist
  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);

  const cartMap = new Map(
    (cart?.items || []).map((item) => [item.productId, item.quantity])
  );
  const wishlistSet = new Set((wishlist || []).map((item) => item.productId));

  // 3. Intersection Observer Setup
  const observer = useRef();
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/public/search-products?s=${search}&page=${page}&size=16&sort=createdAt,desc`
    );
    if (!response.ok) {
      setLoading(false);
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    if(page == 0) {
      setProducts([]);
    }
    setProducts((prevProducts) => [...prevProducts, ...data.content]);
    setHasMore(!data.last);
    setLoading(false);
  }, [search, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section class="bg-gray-50 py-8 antialiased  md:py-12">
      {products.length > 0 ? (
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          {/* Heading & Filters */}
          <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <div>
              <nav class="flex" aria-label="Breadcrumb">
                {/* path Navigation */}
                {/* Title */}
              </nav>
              <h2 class="mt-2 text-xl font-semibold text-gray-900 -:text-white sm:text-2xl">
                {search}
              </h2>
            </div>
            <div class="flex items-center space-x-4">
              {/* Filter button */}
              <button
                data-modal-toggle="filterModal"
                onClick={() => {
                  setShowFilter(!showFilter);
                }}
                data-modal-target="filterModal"
                type="button"
                class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-pink-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 -:border-gray-600 -:bg-gray-800 -:text-gray-400 -:hover:bg-gray-700 -:hover:text-white -:focus:ring-gray-700 sm:w-auto"
              >
                <svg
                  class="-ms-0.5 me-2 h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
                  />
                </svg>
                Filters
                <svg
                  class="-me-0.5 ms-2 h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
                {/* Sort button */}
              </button>
              <button
                id="sortDropdownButton1"
                data-dropdown-toggle="dropdownSort1"
                type="button"
                class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-pink-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 -:border-gray-600 -:bg-gray-800 -:text-gray-400 -:hover:bg-gray-700 -:hover:text-white -:focus:ring-gray-700 sm:w-auto"
              >
                <svg
                  class="-ms-0.5 me-2 h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4"
                  />
                </svg>
                Sort
                <svg
                  class="-me-0.5 ms-2 h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Container for filter button , appear on click */}
              <div
                id="dropdownSort1"
                class="z-50 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow -:bg-gray-700"
                data-popper-placement="bottom"
              >
                <ul
                  class="p-2 text-left text-sm font-medium text-gray-500 -:text-gray-400"
                  aria-labelledby="sortDropdownButton"
                >
                  <li>
                    <a
                      href="#"
                      class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 -:text-gray-400 -:hover:bg-gray-600 -:hover:text-white"
                    >
                      {" "}
                      The most popular{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 -:text-gray-400 -:hover:bg-gray-600 -:hover:text-white"
                    >
                      {" "}
                      Newest{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 -:text-gray-400 -:hover:bg-gray-600 -:hover:text-white"
                    >
                      {" "}
                      Increasing price{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 -:text-gray-400 -:hover:bg-gray-600 -:hover:text-white"
                    >
                      {" "}
                      Decreasing price{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 -:text-gray-400 -:hover:bg-gray-600 -:hover:text-white"
                    >
                      {" "}
                      No. reviews{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 -:text-gray-400 -:hover:bg-gray-600 -:hover:text-white"
                    >
                      {" "}
                      Discount %{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Product Card map */}
          <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => {
              const isLastElement = products.length === index + 1;
              return (
                <ProductCard
                  key={product.productId}
                  product={product}
                  inCartQuantity={cartMap.get(product.id) || 0}
                  wishlist={wishlistSet.has(product.id)}
                  ref={isLastElement ? lastProductElementRef : null}
                />
              );
            })}
          </div>
          {showFilter ? <ProductFilter setShowFilter={setShowFilter} /> : <></>}
          <div class="w-full text-center">
            <button
              type="button"
              class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-pink-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 -:border-gray-600 -:bg-gray-800 -:text-gray-400 -:hover:bg-gray-700 -:hover:text-white -:focus:ring-gray-700"
            >
              Show more
            </button>
          </div>
        </div>
      ) : 
      <div className="py-8 px-4 flex gap-6 flex-col items-center justify-center">
        <span><MonitorOff size={108} stroke="gray" strokeWidth={1} /></span>
        <span className="text-lg font-semibold text-gray-700 text-wrap">Sorry, we couldn’t find anything for your search. Browse our categories or refine your filters to discover more products.</span>
      </div> }
    </section>
  );
};

export default ProductList;
