import React from "react";

const HomeCard = ({ cardData }) => {
  const { title, description, image } = cardData;

  return (
    <div className="relative w-[75vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg group">
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Overlay Layer */}
      <div className="absolute inset-0 flex items-end">
        {/* Gradient Container - 35% height */}
        <div className="w-full h-[35%] relative">
          {/* Dark Gradient - darker at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/95 group-hover:via-black/70" />
          
          {/* Variable Blur Layer */}
          <div 
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              maskImage: 'linear-gradient(to top, black 0%, transparent 30%)',
              WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 30%)',
            }}
          />
          
          {/* Text Content */}
          <div className="relative z-10 h-full px-4 py-3 flex flex-col justify-end">
            <h2 className="text-white text-lg sm:text-xl font-semibold">{title}</h2>
            <p className="text-gray-200 text-sm">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;