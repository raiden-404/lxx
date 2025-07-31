import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";

const CarouselHome = () => {

    //store all the data of banners
    const [banners, setBanners] = useState(null);

    //to fetch data in last
    useEffect(() => {
        fetchData();//call the method to fetch data in useEffect
    },[]);//ensure it runs only once

    //This function used to fetch Home Banner data from backend
    const fetchData = async () => {
            const response = await fetch("http://localhost:8080/public/get-home-banners");
            const result = await response.json();
            setBanners(result);
            console.log(banners);
        }

    return (
        <div className="w-full h-[500px] overflow-hidden relative">
            {
                banners == null ? <></> : 
            
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
                    banners.map((banner) => (<div className="relative">
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
                        <p className="text-lg md:text-xl">{banner.description}</p>
                    </div>
                </div>))
                }
                
            </Carousel>
}
        </div>
    );
};

export default CarouselHome;