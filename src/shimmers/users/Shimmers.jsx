
export const HomeBannerShimmer = () => {
  return (
    <div className='w-full animate-pulse bg-gray-500/30 border-2 aspect-[12/4] rounded-lg'>
    </div>
  )
};

export const HomeGridShimmer = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <div className="bg-gray-500/40 animate-pulse w-full aspect-video rounded-lg "></div>
    <div className="bg-gray-500/40 animate-pulse w-full aspect-video rounded-lg "></div>
    <div className="bg-gray-500/40 animate-pulse w-full aspect-video rounded-lg "></div>
  </div>
)


export const ProductPageShimmer = () => (
  <div className="flex flex-col lg:flex-row w-full p-2 md:p-8 lg:p-16">
    {/* Image */}
    <div className="w-full py-2 px-4 lg:w-1/2">
      <div className="aspect-[6/5] w-full animate-pulse bg-gray-500/20 rounded-xl mb-6"></div>
      {/* Sub images */}
      <div className="flex gap-4">
        <div className="bg-gray-500/20 animate-pulse rounded-lg w-[20%] aspect-square"></div>
        <div className="bg-gray-500/20 animate-pulse rounded-lg w-[20%] aspect-square"></div>
        <div className="bg-gray-500/20 animate-pulse rounded-lg w-[20%] aspect-square"></div>
        <div className="bg-gray-500/20 animate-pulse rounded-lg w-[20%] aspect-square"></div>
      </div>
    </div>
    {/* Details */}
    <div className="w-full lg:w-1/2 flex flex-col gap-6 py-8 lg:ps-10 md:p-6 p-4">
      <div className="w-[80%] aspect-[7/1] bg-gray-600/40 rounded-xl animate-pulse"></div>
      <div className="w-[40%] h-8 bg-gray-500/20 rounded-lg"></div>
      <div className="w-[50%] rounded-xl h-12 bg-gray-600/30"></div>
      <div className="flex w-full gap-4">
        <div className="w-[40%] h-12 animate-pulse rounded-lg bg-pink-500/40"></div>
        <div className="w-[40%] h-12 bg-black animate-pulse rounded-lg"></div>
      </div>
      <div className="w-[90%] bg-gray-700/20 rounded-lg animate-pulse h-6"></div>
      <div className="w-[90%] bg-gray-700/20 rounded-lg animate-pulse h-6"></div>
      <div className="w-[45%] bg-gray-700/20 rounded-lg animate-pulse h-6"></div>
    </div>
  </div>
)