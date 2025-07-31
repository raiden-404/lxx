import CarouselHome from "../../components/carousel/CarouselHome";
import HorizontalProductCarousel from "../../components/carousel/productCarousel/HorizontalProductCarousel";
import HomeCategoryGrid from "../../components/categories/HomeCategoryGrid";

const HomePage = () => {
  return (
    <div>
      <CarouselHome />
      <div>
        <HomeCategoryGrid />
        <HorizontalProductCarousel />
        <HorizontalProductCarousel />
        <HomeCategoryGrid />
        <HorizontalProductCarousel />
      </div>
    </div>
  );
};
export default HomePage;
