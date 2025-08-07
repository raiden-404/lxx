import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";

// --- Icon Components (Self-contained SVGs) ---
const Star = ({ className, fill = "none", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

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


const reviews = [
  {
    id: 1,
    author: "Jane Doe",
    rating: 5,
    text: "Absolutely love these headphones! The sound quality is crisp and clear.",
    date: "2024-07-15",
  },
  {
    id: 2,
    author: "John Smith",
    rating: 4,
    text: "Great value for the price. Comfortable to wear for long periods.",
    date: "2024-07-10",
  },
  {
    id: 3,
    author: "Emily Johnson",
    rating: 5,
    text: "Best headphones I've ever owned. Highly recommended!",
    date: "2024-07-05",
  },
];

const relatedProducts = [
  {
    id: 1,
    title: "Aura Smartwatch",
    price: 14999,
    image: "https://placehold.co/300x300/e8e8e8/333?text=Smartwatch",
    rating: "4.8",
    reviewCount: "210",
    discount: "15",
    tags: { freeDelivery: true, bestSeller: true, bestPrice: false },
  },
  {
    id: 2,
    title: "Nebula Portable Speaker",
    price: 5999,
    image: "https://placehold.co/300x300/e0e0e0/333?text=Speaker",
    rating: "4.6",
    reviewCount: "155",
    discount: "20",
    tags: { freeDelivery: true, bestSeller: false, bestPrice: true },
  },
  {
    id: 3,
    title: "Vortex Gaming Mouse",
    price: 4499,
    image: "https://placehold.co/300x300/d8d8d8/333?text=Mouse",
    rating: "4.9",
    reviewCount: "302",
    discount: "10",
    tags: { freeDelivery: false, bestSeller: true, bestPrice: false },
  },
  {
    id: 4,
    title: "Nova Laptop Stand",
    price: 3999,
    image: "https://placehold.co/300x300/d0d0d0/333?text=Laptop+Stand",
    rating: "4.7",
    reviewCount: "180",
    discount: "25",
    tags: { freeDelivery: true, bestSeller: false, bestPrice: true },
  },
  {
    id: 5,
    title: "Nova Laptop Stand",
    price: 3999,
    image: "https://placehold.co/300x300/d0d0d0/333?text=Laptop+Stand",
    rating: "4.7",
    reviewCount: "180",
    discount: "25",
    tags: { freeDelivery: true, bestSeller: false, bestPrice: true },
  },
  {
    id: 6,
    title: "Nova Laptop Stand",
    price: 3999,
    image: "https://placehold.co/300x300/d0d0d0/333?text=Laptop+Stand",
    rating: "4.7",
    reviewCount: "180",
    discount: "25",
    tags: { freeDelivery: true, bestSeller: false, bestPrice: true },
  },
];

// --- Reusable Components ---
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
        />
      ))}
      {halfStar && (
        <Star
          key="half"
          className="w-5 h-5 text-yellow-400"
          style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
          fill="currentColor"
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="w-5 h-5 text-gray-300"
          fill="currentColor"
        />
      ))}
    </div>
  );
};

const ProductImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0].imageUrl);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setMainImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

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
      <div className="mt-4">
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
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="flex items-start mb-3">
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4 flex-shrink-0">
        <span className="text-lg font-bold text-gray-600">
          {review.author.charAt(0)}
        </span>
      </div>
      <div className="flex-grow">
        <h4 className="font-semibold text-gray-800">{review.author}</h4>
        <StarRating rating={review.rating} />
      </div>
      <span className="text-sm text-gray-500 ml-4 flex-shrink-0">
        {review.date}
      </span>
    </div>
    <p className="text-gray-600 leading-relaxed">{review.text}</p>
  </div>
);

const ProductCard = ({ product }) => {
  const { image, title, discount, rating, reviewCount, tags, price } = product;
  const [quantity, setQuantity] = useState(0);
  const fullStars = Math.floor(Number(rating));

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="h-48 sm:h-56 w-full mb-4">
        <a href="#">
          <img
            className="mx-auto h-full object-contain"
            src={image}
            alt={title}
          />
        </a>
      </div>
      <div className="pt-2 flex flex-col flex-grow">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="me-2 rounded bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800">
            Up to {discount}% off
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-200"
            >
              <span className="sr-only">Quick look</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-200"
            >
              <span className="sr-only">Add to Favorites</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <a
          href="#"
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline flex-grow"
        >
          {title}
        </a>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < fullStars ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
              />
            ))}
          </div>
          <p className="text-sm font-medium text-gray-900">{rating}</p>
          <p className="text-sm font-medium text-gray-500">({reviewCount})</p>
        </div>
        <ul className="mt-2 flex items-center gap-4 flex-wrap">
          {tags.freeDelivery && (
            <li className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                />
              </svg>
              <p className="text-sm font-medium text-gray-500">Fast Delivery</p>
            </li>
          )}
          {tags.bestSeller && (
            <li className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.3 6.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm9.4 11.5h-2.3a1 1 0 0 1-1-1.2 1 1 0 0 0-1-1.2h-2.3a1 1 0 0 0-1 1.2 1 1 0 0 1-1 1.2h-2.3a1 1 0 0 1-1-1.2 1 1 0 0 0-1-1.2H5.3a1 1 0 0 0-1 1.2 1 1 0 0 1-1 1.2H1a1 1 0 0 1 0-2h1.3a1 1 0 0 0 1-1.2 1 1 0 0 1 1-1.2h2.3a1 1 0 0 1 1 1.2 1 1 0 0 0 1 1.2h2.3a1 1 0 0 0 1-1.2 1 1 0 0 1 1-1.2h2.3a1 1 0 0 1 1 1.2 1 1 0 0 0 1 1.2H23a1 1 0 0 1 0 2Z"
                />
              </svg>
              <p className="text-sm font-medium text-gray-500">Best Seller</p>
            </li>
          )}
        </ul>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xl sm:text-2xl font-extrabold text-gray-900">
            ₹{price.toLocaleString()}
          </p>
          {quantity === 0 ? (
            <button
              onClick={() => setQuantity(1)}
              type="button"
              className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 sm:px-5 sm:py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              <ShoppingCart className="-ms-2 me-2 h-5 w-5 hidden sm:inline" />
              Add to cart
            </button>
          ) : (
            <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
              >
                -
              </button>
              <span className="px-4 py-2 bg-white text-black">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function ProductPage() {
  //Product id from url
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  //Function to Fetch Data using id
  const fetchProduct = async () => {
    //Base URL of product details data fetch
    const baseUri = "http://localhost:8080/public/get-product-detail-by-id";
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
  };
  useEffect(() => {
    console.log(product);
  });

  return (
    <div className="bg-gray-50 font-sans">
      {product == null ? (
        <div></div>
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
                <button className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-transform transform hover:scale-105">
                  <ShoppingCart className="w-6 h-6" />
                  <span>Add to Cart</span>
                </button>
                <button className="w-full px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition-transform transform hover:scale-105">
                  Buy Now
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
          {product.reviews <= 0 ? <></> : 
            <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 border-b pb-4">
              Customer Reviews
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            </div>
}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Write a review
              </h3>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Rating
                  </label>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-7 h-7 cursor-pointer transition-colors ${
                          i < rating
                            ? "text-yellow-400"
                            : "text-gray-300 hover:text-yellow-300"
                        }`}
                        onClick={() => setRating(i + 1)}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="review"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Review
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Share your thoughts..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </section>
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
