import { X } from "lucide-react"

const ImagePreview = ({ image, setImagePrev }) => {
  return (
    <div onClick={() => setImagePrev(false)} className="h-[100vh] w-[100vw] bg-black/30 fixed flex items-center justify-center border-4 border-red-900 top-0 left-0">
        <div className="w-[90%] h-[90%] flex items-center justify-center relative mt-16">
            <img onClick={(e) => e.stopPropagation()} className="h-full -full object-contain" src={image} alt="" />
            <button onClick={() => setImagePrev(false)} className="absolute top-4 right-4 text-white"><X size={28} strokeWidth={3} /></button>
        </div>
    </div>
  )
}

export default ImagePreview