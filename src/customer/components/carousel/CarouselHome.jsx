import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";
import { HomeBannerShimmer } from "../../../shimmers/users/HomeShimmers";

const CarouselHome = () => {

    //store all the data of banners
    const [banners, setBanners] = useState(null);

    //to fetch data in last
    useEffect(() => {
        fetchData();//call the method to fetch data in useEffect
    },[]);//ensure it runs only once

    //This function used to fetch Home Banner data from backend
    const fetchData = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/public/get-home-banners`);
            const result = await response.json();
            setBanners(result);
            console.log(banners);
        }

    return (
        <div className="w-full aspect-[12/4] overflow-hidden relative">
            {
                banners == null ? <HomeBannerShimmer /> : 
            
            <Carousel 
                dynamicHeight={true}
                emulateTouch={true}
                interval={3000}
                autoPlay={true}
                infiniteLoop={true}
                stopOnHover={false}
                showThumbs={false}
                showStatus={false}
                labels={{leftArrow: 'previous slide / item', rightArrow: 'next slide / item', item: 'slide item'}}
            >
                { 
                    banners.map((banner) => (
                <div className="relative w-full aspect-[12/4] ">
                    <img 
                        src={banner.image} 
                        alt="Fashion Sale" 
                        className=" h-full object-cover"
                    />
                    {/* Sharp diagonal gradient overlay only behind text */}
                    <div 
                        className="absolute left-0 bottom-0 w-full h-full z-10"
                        style={{
                            background: 'radial-gradient(ellipse at bottom left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 70%)'
                        }}
                    ></div>
                    <div className="absolute left-2 xs:left-2 lg:left-6 bottom-2 z-20 text-white w-[40%] gap-0 text-start">
                        <h2 className="text-sm xs:text-xl md:text-3xl lg:text-5xl font-bold mb-2">{banner.title}</h2>
                        <p className="text-xs line-clamp-1 xs:text-sm sm:text-lg md:text-lg">{banner.description}</p>
                    </div>
                </div>))
                }
                
            </Carousel>
}
        </div>
    );
};

export default CarouselHome;