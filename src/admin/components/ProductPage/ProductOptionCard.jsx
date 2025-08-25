import { Link } from "react-router-dom";

const ProductOptionCard = ({ option }) => {
  const { name, icon, path, color } = option;
  return (
    <Link to={path}>
    <div className={`h-40 border-2 border-gray-700 bg-gray-900/30 hover:bg-gray-400/20 aspect-video rounded-3xl flex flex-col items-center justify-center gap-4`}>
        <div className="bg-gray-600 border-2 border-gray-500 p-2 rounded-full">
          {icon}
        </div>
        {name}
      </div>
    </Link>
  );
};

export default ProductOptionCard;
