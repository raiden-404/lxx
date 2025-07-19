import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { homeMainBanner } from "../../../dummydata/BannerData";

const CarouselHome = () => {
    return (
        <div className="w-full h-[500px] overflow-hidden relative">
            <Carousel 
                dynamicHeight={false}
                emulateTouch={true}
                interval={2000}
                autoPlay={true}
                infiniteLoop={true}
                stopOnHover={false}
                showThumbs={false}
                showStatus={false}
                labels={{leftArrow: 'previous slide / item', rightArrow: 'next slide / item', item: 'slide item'}}
            >
                {
                    homeMainBanner.map((banner) => (<div className="relative">
                    <img 
                        src={banner.image} 
                        alt="Fashion Sale" 
                        className="h-[500px] w-full object-cover"
                    />
                    {/* Sharp diagonal gradient overlay only behind text */}
                    <div 
                        className="absolute left-0 bottom-0 w-full h-full z-10"
                        style={{
                            background: 'radial-gradient(ellipse at bottom left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 70%)'
                        }}
                    ></div>
                    <div className="absolute left-6 bottom-8 z-20 text-white max-w-[60%]">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{banner.title}</h2>
                        <p className="text-lg md:text-xl">{banner.discription}</p>
                    </div>
                </div>))
                }
                
            </Carousel>
        </div>
    );
};

export default CarouselHome;