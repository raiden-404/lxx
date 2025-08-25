import { useEffect, useState, useRef, useCallback } from "react";
import RemoveProductCard from "./RemoveProductCard";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";

const RemoveProducts = () => {
  const navigate = useNavigate();
  const title = "All products";
  const sort = "createdAt,desc";
  const size = 10;

  // 1. State Management
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  //Dialogue box
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [action, setAction] = useState("EDIT");
  const [actionId, setActionId] = useState("fgt43-rsgr-3");
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

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

  // 4. Data Fetching Logic with Cleanup
  useEffect(() => {
    if (!hasMore) return;

    // ✅ Create an AbortController to handle cleanup for StrictMode
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      const baseUri = `${import.meta.env.VITE_API_URL}/public/paging`;
      const query = { page, size, sort };
      const queryUri = new URLSearchParams(query).toString();
      const fullUri = `${baseUri}?${queryUri}`;

      try {
        // Pass the controller's signal to the fetch request
        const response = await fetch(fullUri, { signal: controller.signal });
        const data = await response.json();

        setProducts((prevProducts) => [...prevProducts, ...data.content]);
        setHasMore(!data.last);
      } catch (error) {
        // When the fetch is aborted, it's caught as an error. We can ignore it.
        if (error.name === "AbortError") {
          console.log("Fetch aborted by cleanup");
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
  }, [page, sort, size]);

  //Dailogue confirm actions
  const handleConfirmAction = () => {
    if (!actionId) {
      throw new Error("Product ID not present");
    }
    if (action === "DELETE") {
      removeProduct();
    } else if (action === "EDIT") {
      editProduct();
    } else {
      throw new Error("Invalid Action Type");
    }
  };

  //Remove item from server
  const removeProduct = async () => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      navigate("/login");
    }
    //Full uri with url and id
    const fullUri = `${
      import.meta.env.VITE_API_URL
    }/admin/remove-product?productId=${actionId}`;

    const response = await fetch(fullUri, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
        setIsDialogueOpen(false);
        setAction(null);
        setActionId(null);
      }, 2500);
    } else {
      setSuccess(true);
      setTimeout(() => {
        // Remove item from frontend also
        setProducts(products.filter(product => product.id != actionId));

        setSuccess(false);
        setIsDialogueOpen(false);
        setAction(null);
        setActionId(null);
      }, 2500);
    }
  };

  const editProduct = () => {};

  return (
    <div className="w-full relative px-4 md:px-10 lg:px-20 py-8">
      <h2 className="text-2xl font-bold mb-4 pb-4 pl-2">{title}</h2>
      <div className="flex flex-col gap-8">
        {products.map((product, index) => {
          const isLastElement = products.length === index + 1;
          return (
            <RemoveProductCard
              ref={isLastElement ? lastProductElementRef : null}
              key={product.id}
              product={product}
              setIsDialogueOpen={setIsDialogueOpen}
              setAction={setAction}
              setActionId={setActionId}
            />
          );
        })}
      </div>

      {/* Confirming option - success - failed */}
      {isDialogueOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-center">
            {success || failed ? (
              <>
                {success ? (
                  <div
                    className={`bg-green-400/40 flex p-6 gap-4 rounded-2xl justify-center flex-col items-center`}
                  >
                    <div className="p-4 bg-green-700 border rounded-full mb-6">
                      <Check size={42} strokeWidth={3} />
                    </div>
                    <div className="text-xl">
                      Successfully{" "}
                      <span
                        className={`${
                          action === "DELETE"
                            ? "text-red-700"
                            : "text-yellow-400"
                        } font-bold`}
                      >
                        {action}
                      </span>{" "}
                      the product.{" "}
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className={`bg-red-400/40 flex p-6 gap-4 rounded-2xl justify-center flex-col items-center`}
                    >
                      <div className="p-4 bg-red-700 border rounded-full mb-6">
                        <X size={42} strokeWidth={3} />
                      </div>
                      <div className="text-xl">
                        Failed{" "}
                        <span
                          className={`${
                            action === "DELETE"
                              ? "text-red-700"
                              : "text-yellow-400"
                          } font-bold`}
                        >
                          {action}ING
                        </span>{" "}
                        the product.
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-white">
                  Confirm{" "}
                  <span
                    className={`${
                      action === "DELETE" ? "text-red-700" : "text-yellow-400"
                    }`}
                  >
                    {action}
                  </span>{" "}
                  This Item
                </h3>
                <p className="text-gray-400 mt-2 text-sm">
                  Are you sure you want to &nbsp;
                  <span
                    className={`${
                      action === "DELETE" ? "text-red-700" : "text-yellow-400"
                    } font-semibold`}
                  >
                    {action}
                  </span>{" "}
                  &nbsp; product with ID:{" "}
                  <span className="text-green-400 font-semibold">
                    {actionId}
                  </span>
                  &nbsp;?
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={() => setIsDialogueOpen(false)}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-28"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConfirmAction()}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg w-28"
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="text-center p-8">
        {loading && <p>Loading more products...</p>}
        {!hasMore && <p>You've seen it all!</p>}
      </div>
    </div>
  );
};

export default RemoveProducts;
