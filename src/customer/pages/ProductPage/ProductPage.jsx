import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import ProductCard from "../../components/Product/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  AddItemAtFirst,
  addItem,
  removeItem,
} from "../../../features/cart/cartSlice";
import { ProductPageShimmer } from "../../../shimmers/users/Shimmers";
import { Loader2 } from "lucide-react";
import ReviewBox from "./ReviewBox";
import ReviewCard from "./ReviewCard";
import { StarRating } from "./ReviewReusables";

const ShoppingCart = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const Upload = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const ProductImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(
    images.find((image) => image.featured === true).imageUrl
  );
  // const fileInputRef = useRef(null);

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.type.startsWith("image/")) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => setMainImage(e.target.result);
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="w-full lg:w-1/2">
      <div className="relative group">
        <img
          src={mainImage}
          alt="Main product"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x600/f8f8f8/ccc?text=Image+Error";
          }}
        />
      </div>
      <div className="grid grid-cols-4 gap-2 mt-4">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.imageUrl}
            alt={img.altText}
            className={`cursor-pointer rounded-md border-2 ${
              mainImage === img ? "border-indigo-500" : "border-transparent"
            } hover:border-indigo-400 transition-all`}
            onClick={() => setMainImage(img.imageUrl)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/100x100/f8f8f8/ccc?text=Error";
            }}
          />
        ))}
      </div>
      {/* Future reference for taking image from users */}
      {/* <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Upload className="w-5 h-5" />
          <span>Upload Your Image</span>
        </button>
      </div> */}
    </div>
  );
};


// --- Main Page Component ---
export default function ProductPage() {
  //Product id from url
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);
  const [loadBuyNow, setLoadBuyNow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);

  // 2. For performance, convert arrays to faster lookup structures
  const cartMap = new Map(
    (cart?.items || []).map((item) => [item.productId, item.quantity])
  );
  // A Set is perfect for checking if an ID exists
  const wishlistSet = new Set(wishlist.map((item) => item.productId));

  //Function to check that this product exists in cart or not

  //Check product in cart and set the quantity
  const checkProductInCart = useCallback(() => {
    if (cart !== null) {
      const isProductInCart = cart.items.find((item) => item.productId === id);
      if (isProductInCart) {
        setQuantity(isProductInCart.quantity);
      } else {
        setQuantity(0);
      }
    } else {
      setQuantity(0);
    }
  }, [cart, id]);

  //Handle cart operation
  const handleAddItemAtStart = () => {
    const item = {
      productId: id,
      productImage: product.images[0].imageUrl,
      productMrp: product.mrp,
      productName: product.title,
      productSellPrice: product.sellingPrice,
      quantity: 1,
    };
    dispatch(AddItemAtFirst(item));
    setQuantity(1);
  };

  const handleAddItem = () => {
    const item = {
      id: id,
      quantity: 1,
    };
    dispatch(addItem(item));
  };

  const handleRemoveItem = () => {
    const item = {
      id: id,
      quantity: 1,
    };
    dispatch(removeItem(item));
  };

  const handleBuyNow = async () => {
    setLoadBuyNow(true);
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) navigate("/login");

    const item = [
      {
        productId: product.id,
        quantity: 1,
      },
    ];
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/update-checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(item),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update checkout");
    }
    setLoadBuyNow(false);
    navigate("/checkout");
  };

  useEffect(() => {
    fetchRelatedProduct();
  }, [product]);

  //Function to Fetch Data using id
  const fetchProduct = useCallback(async () => {
    //Base URL of product details data fetch
    const baseUri = `${
      import.meta.env.VITE_API_URL
    }/public/get-product-detail-by-id`;
    //parameters to add in url
    const params = {
      id: id,
    };
    //Query url
    const queryUri = new URLSearchParams(params).toString();

    //Full URL by combining baseUri?QueryUri
    const fullUri = `${baseUri}?${queryUri}`;

    //Fetch product data
    const response = await fetch(fullUri);

    const result = await response.json();

    setProduct(result);
  }, [id]);

  useEffect(() => {
    fetchProduct();
    checkProductInCart();
  }, [fetchProduct, checkProductInCart]);

  //Function to fetch Related Products
  const fetchRelatedProduct = async () => {
    const baseUri = `${import.meta.env.VITE_API_URL}/public/related-products`;
    const slug = product.categories[0].slug;
    const params = {
      slug: slug,
      exclude_id: id,
    };

    const queryUri = new URLSearchParams(params).toString();

    //Full uri combination of BaseURi and QueryUri
    const fullUri = `${baseUri}?${queryUri}`;

    const response = await fetch(fullUri);
    const result = await response.json();
    if (result.length == 0) {
      return;
    }
    setRelatedProducts(result);
  };

  const fetchReviews = useCallback(async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/public/get-reviews?productId=${id}&page=0&size=3&sort=rating,desc`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const data = await response.json();
    setReviews(data.content);
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="bg-gray-50 font-sans">
      {product == null ? (
        <ProductPageShimmer />
      ) : (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <main className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12 sm:mb-16">
            <ProductImageGallery images={product.images} />

            <div className="w-full flex flex-col gap-2 lg:w-1/2">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              {/* Rating - review count */}
              <div className="flex items-center mb-4">
                <StarRating rating={product.averageRating} />
                <span className="ml-3 text-sm text-gray-600">
                  ({product.reviewCount} reviews)
                </span>
              </div>
              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl lg:text-4xl font-extrabold text-gray-900">
                  ₹{product.sellingPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-base text-gray-500 line-through">
                  ₹{product.mrp.toFixed(2)}
                </span>
              </div>

              {/* Add to Cart - Buy Now */}
              <div className="flex flex-col sm:flex-row gap-4">
                {quantity > 0 ? (
                  <div className="w-full flex items-center overflow-hidden justify-between text-white font-semibold rounded-lg shadow-md">
                    <button
                      onClick={handleRemoveItem}
                      className="w-[30%] py-3 bg-gray-800 h-full transition-transform transform hover:scale-125"
                    >
                      -
                    </button>
                    <span className="text-black">{quantity}</span>
                    <button
                      onClick={handleAddItem}
                      className="w-[30%] py-3 bg-gray-800 h-full transition-transform transform hover:scale-125"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAddItemAtStart}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-transform transform hover:scale-105"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>Add to Cart</span>
                  </button>
                )}
                <button
                  onClick={handleBuyNow}
                  className="w-full px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition-transform transform hover:scale-105"
                >
                  {loadBuyNow ? (
                    <Loader2 className="animate-spin inline-flex" />
                  ) : (
                    "Buy Now"
                  )}
                </button>
              </div>
              {/* Description */}
              <div>
                <p className="font-bold text-gray-600 mt-8 text-2xl leading-relaxed">
                  Description
                </p>
                <div className="text-gray-600 mb-6 mt-3 text-base sm:text-lg leading-relaxed">
                  <Markdown>{product.description}</Markdown>
                </div>
              </div>
            </div>
          </main>

          {/* Review Section */}
          <section className="mb-12 sm:mb-16">
            {product.reviews <= 0 ? (
              <></>
            ) : (
              <div>
                <span className="flex justify-between items-end pe-4 sm:mb-8 mb-6 border-b pb-4">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 ">
                    Customer Reviews
                  </h1>
                  <button onClick={() => setReviewBoxOpen(true)} className="text-pink-600 font-semibold px-2 py-1 hover:bg-pink-400/20 rounded-lg">
                    View All
                  </button>
                </span>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
                  {reviews.map((review) => (
                    <ReviewCard key={review.reviewId} review={review} />
                  ))}
                </div>
              </div>
            )}
          </section>
          {relatedProducts == null ? (
            <></>
          ) : (
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    inCartQuantity={cartMap.get(product.id) || 0}
                    wishlist={wishlistSet.has(product.id)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
      {
        reviewBoxOpen &&
        <ReviewBox productId={id} setReviewBoxOpen={setReviewBoxOpen} />
      }
    </div>
  );
}
