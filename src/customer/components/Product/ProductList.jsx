import { productData } from "../../../dummydata/BannerData";
import ProductCard from "./ProductCard";
import { useState } from "react";
import ProductFilter from "./ProductFilter";

const ProductList = () => {
    const title = "SHIRTS";
    const [showFilter, setShowFilter] = useState(false);

    return(
        <section class="bg-gray-50 py-8 antialiased  md:py-12">
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    {/* Heading & Filters */}
    <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
      <div>
        <nav class="flex" aria-label="Breadcrumb">
            {/* path Navigation */}
          {/* Title */}
        </nav>
        <h2 class="mt-2 text-xl font-semibold text-gray-900 -:text-white sm:text-2xl">{title}</h2>
      </div>
      <div class="flex items-center space-x-4">
        {/* Filter button */}
        <button data-modal-toggle="filterModal" onClick={()=>{setShowFilter(!showFilter)}} data-modal-target="filterModal" type="button" class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-pink-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 -:border-gray-600 -:bg-gray-800 -:text-gray-400 -:hover:bg-gray-700 -:hover:text-white -:focus:ring-gray-700 sm:w-auto">
          <svg class="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
          </svg>
          Filters
          <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
          </svg>
          {/* Sort button */}
        </button>
        <button id="sortDropdownButton1" data-dropdown-toggle="dropdownSort1" type="button" class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-pink-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 -:border-gray-600 -:bg-gray-800 -:text-gray-400 -:hover:bg-gray-700 -:hover:text-white -:focus:ring-gray-700 sm:w-auto">
          <svg class="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4" />
          </svg>
          Sort
          <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
          </svg>
        </button>
        {/* Container for filter button , appear on click */}
        <div id="dropdownSort1" class="z-50 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow -:bg-gray-700" data-popper-placement="bottom">
          <ul class="p-2 text-left text-sm font-medium text-gray-500 -:text-gray-400" aria-labelledby="sortDropdownButton">
            <li>
              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 -:text-gray-400 -:hover:bg-gray-600 -:hover:text-white"> The most popular </a>
            </li>
            <li>
              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 -:text-gray-400 -:hover:bg-gray-600 -:hover:text-white"> Newest </a>
            </li>
            <li>
              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 -:text-gray-400 -:hover:bg-gray-600 -:hover:text-white"> Increasing price </a>
            </li>
            <li>
              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 -:text-gray-400 -:hover:bg-gray-600 -:hover:text-white"> Decreasing price </a>
            </li>
            <li>
              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 -:text-gray-400 -:hover:bg-gray-600 -:hover:text-white"> No. reviews </a>
            </li>
            <li>
              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 -:text-gray-400 -:hover:bg-gray-600 -:hover:text-white"> Discount % </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    {/* Product Card map */}
    <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
      {
        productData.map((product) => (
            <ProductCard key={product.productId} product={product} />
        ))
      }
    </div>
      {
        showFilter ? <ProductFilter setShowFilter={setShowFilter} /> : <></>
      }
    <div class="w-full text-center">
      <button type="button" class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-pink-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 -:border-gray-600 -:bg-gray-800 -:text-gray-400 -:hover:bg-gray-700 -:hover:text-white -:focus:ring-gray-700">Show more</button>
    </div>
  </div>
  
</section>
    )
}

export default ProductList;