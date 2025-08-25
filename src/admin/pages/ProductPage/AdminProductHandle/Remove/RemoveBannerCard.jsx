import { Trash } from 'lucide-react'

const RemoveBannerCard = ({banner, setDeleteBannerId, setIsDialogueOpen}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden">
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
                    <div
                    onClick={() => {setDeleteBannerId(banner.id);setIsDialogueOpen(true);}}
                     className=' absolute top-5 hover:bg-black/80 z-20 right-5 cursor-pointer bg-black/50 p-4 rounded-full'>
                        <Trash stroke='red' />
                    </div>
                </div>
  )
}

export default RemoveBannerCard