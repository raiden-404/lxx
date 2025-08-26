
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
