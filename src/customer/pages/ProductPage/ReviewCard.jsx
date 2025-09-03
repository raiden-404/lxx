import { useState } from "react";
import ImagePreview from "./ImagePreview";
import { Star, StarRating } from "./ReviewReusables";

const ReviewCard = ({ review }) => {
  const [imagePrev, setImagePrev] = useState(false);
  const [currImage, setCurrImage] = useState("");
  const { comment, createdAt, images, rating, user } = review;
  return (
    <div className="bg-white xs:p-6 p-3 rounded-lg shadow-sm shadow-gray-300 border border-gray-100">
      <div className="flex items-start mb-3">
        <div className="w-12 h-12 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center mr-4 flex-shrink-0">
          <img src={user.picture} alt="" />
        </div>
        <div className="flex-grow">
          <h4 className="font-semibold text-gray-800">{user.fullName}</h4>
          <StarRating rating={rating} />
        </div>
        <span className="text-sm text-gray-500 ml-4 flex-shrink-0">
          {createdAt}
        </span>
      </div>
      <p className="text-gray-600 leading-relaxed">{comment}</p>
      <div className="flex justify-start gap-2 mt-2 flex-wrap">
        {images.map((image) => (
          <div
            onClick={() => {
              setCurrImage(image.imageUrl);
              setImagePrev(true);
            }}
            className=" w-[30%] rounded-md flex items-center overflow-hidden"
          >
            <img className="w-full" src={image.imageUrl} alt="Review Image" />
          </div>
        ))}
      </div>
      {imagePrev && (
        <ImagePreview image={currImage} setImagePrev={setImagePrev} />
      )}
    </div>
  );
};
export default ReviewCard;