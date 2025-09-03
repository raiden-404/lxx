import { useCallback, useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { Loader2, X } from "lucide-react";

const ReviewBox = ({ productId, setReviewBoxOpen }) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("rating,desc");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  //Fetch review based on productId
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/public/get-reviews?productId=${productId}&page=${page}&size=15&sort=${sort}`
    );
    if (!response.ok) {
      setLoading(false);
      throw new Error("Failed to fetch reviews");
    }
    const data = await response.json();
    setHasMore(!data.last);
    setReviews(data.content);
    setLoading(false);
  }, [productId, page, sort]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    console.log("reiews : ", reviews);
  }, [reviews]);

  return (
    // Transparent box to show
    <div
      onClick={() => setReviewBoxOpen(false)}
      className="fixed w-[100vw] flex justify-center items-center h-[100vh] bg-black/20 top-0 left-0"
    >
      {/* Box contains all the reviews */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-[88vh] flex flex-col gap-2 items-center relative py-4 rounded-lg w-[88%] xs:w-[78%] md:w-[60%] mt-16 border overflow-scroll border-black bg-white"
      >
        <button
          onClick={() => setReviewBoxOpen(false)}
          className="absolute top-2 right-2"
        >
          <X />
        </button>
        {reviews.length > 0 &&
          // Map over reviews
          reviews.map((review) => (
            <div>
              <ReviewCard key={review.reviewId} review={review} />
            </div>
          ))}
        <button
            onClick={() => setPage(prev => prev+1)}
          disabled={!hasMore || loading}
          className="border-2 disabled:cursor-not-allowed border-pink-600 py-1 px-2 rounded-lg bg-pink-300/20"
        >
          {hasMore ? (
            loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={20} className="animate-spin" />
                Loading...
              </span>
            ) : (
              "Show More"
            )
          ) : (
            "That's all !!!"
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewBox;
