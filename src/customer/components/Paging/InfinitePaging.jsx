import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Product/ProductCard";

const InfinitePaging = ({ title, sort, size }) => {
  // 1. State Management
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const cart = useSelector(state => state.cart.items);
  const wishlist = useSelector(state => state.wishlist.items);

  const cartMap = new Map((cart?.items || []).map(item => [item.productId, item.quantity]));
  const wishlistSet = new Set((wishlist || []).map(item => item.productId));

  // 3. Intersection Observer Setup
  const observer = useRef();
  const lastProductElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // 4. Data Fetching Logic with Cleanup
  useEffect(() => {
    if (!hasMore) return;

    // ✅ Create an AbortController to handle cleanup for StrictMode
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      const baseUri = "http://localhost:8080/public/paging";
      const query = { page, size, sort };
      const queryUri = new URLSearchParams(query).toString();
      const fullUri = `${baseUri}?${queryUri}`;

      try {
        // Pass the controller's signal to the fetch request
        const response = await fetch(fullUri, { signal: controller.signal });
        const data = await response.json();

        setProducts(prevProducts => [...prevProducts, ...data.content]);
        setHasMore(!data.last);
      } catch (error) {
        // When the fetch is aborted, it's caught as an error. We can ignore it.
        if (error.name === 'AbortError') {
          console.log('Fetch aborted by cleanup');
        } else {
          console.error("Failed to fetch products:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // ✅ Return a cleanup function to abort the fetch if the component unmounts
    return () => {
      controller.abort();
    };
  }, [page, sort, size]); // Removed 'hasMore' from dependency array

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 py-8">
      <h2 className="text-2xl font-bold mb-4 pb-4 pl-2">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {products.map((product, index) => {
          const isLastElement = products.length === index + 1;
          return (
            <ProductCard
              ref={isLastElement ? lastProductElementRef : null}
              key={product.id}
              product={product}
              inCartQuantity={cartMap.get(product.id) || 0}
              wishlist={wishlistSet.has(product.id)}
            />
          );
        })}
      </div>
      <div className="text-center p-8">
        {loading && <p>Loading more products...</p>}
        {!hasMore && <p>You've seen it all!</p>}
      </div>
    </div>
  );
};

export default InfinitePaging;