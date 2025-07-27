import { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useSwipeable } from "react-swipeable";
import { categoryCardData } from "../../../../dummydata/CardData";
import HomeCard from "../../categories/HomeCard";
import { Link } from "react-router-dom";

const HorizontalProductCarousel = () => {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const cardWidthRef = useRef(300); // Default card width

  // Update scroll button visibility
  const updateArrowVisibility = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Initialize card width and scroll position
  useEffect(() => {
    if (containerRef.current && containerRef.current.firstChild) {
      const firstCard = containerRef.current.firstChild;
      cardWidthRef.current = firstCard.offsetWidth + 16; // Card width + space-x-4 (1rem = 16px)
      updateArrowVisibility();
    }
  }, []);

  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", updateArrowVisibility);
      return () => container.removeEventListener("scroll", updateArrowVisibility);
    }
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -cardWidthRef.current,
        behavior: "smooth"
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: cardWidthRef.current,
        behavior: "smooth"
      });
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => scrollRight(),
    onSwipedRight: () => scrollLeft(),
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 py-8">
      <h2 className="text-2xl font-bold mb-4 pb-4 pl-2">Featured Products</h2>
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 top-1/2 -translate-y-1/2 p-2 bg-white shadow-md rounded-full hover:bg-indigo-100 transition hidden sm:inline-flex"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
        )}
        
        <div
          ref={containerRef}
          {...handlers}
          className="flex space-x-4 overflow-x-scroll no-scrollbar scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categoryCardData.map((obj) => (
            <div key={obj.id} className="snap-start">
              <Link to={`/category/${obj.title.replace(/\s/g,"+")}/id=${obj.id}`}>
                <HomeCard cardData={obj} />
              </Link>
            </div>
          ))}
        </div>
        
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 top-1/2 -translate-y-1/2 p-2 bg-white shadow-md rounded-full hover:bg-indigo-100 transition hidden sm:inline-flex"
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HorizontalProductCarousel;