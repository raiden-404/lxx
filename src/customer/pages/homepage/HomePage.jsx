import CarouselHome from "../../components/carousel/CarouselHome";
import HomeCategoryGrid from "../../components/categories/HomeCategoryGrid";
import InfinitePaging from "../../components/Paging/InfinitePaging";

const HomePage = () => {
  return (
    <div>
      <CarouselHome />
      <div>
        <HomeCategoryGrid />
        {/* <HorizontalProductCarousel /> */}
        <InfinitePaging title={"Latest Products"} sort={"createdAt,desc"} size={15} />
      </div>
    </div>
  );
};
export default HomePage;
