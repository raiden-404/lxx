import { Trash } from "lucide-react";

const RemoveCategoryGrid = () => {
  return (
    <div
      className={`relative h-64 aspect-video overflow-hidden rounded-xl shadow cursor-pointer hover:opacity-90 transition duration-300 group }`}
    >
      <img
        src={
          "https://static.crunchyroll.com/cr-acquisition/assets/img/start/hero/background-desktop.jpg"
        }
        alt={"category.name"}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition duration-300"></div>
      <div className="absolute bottom-4 left-4 text-white z-10">
        <h3 className="text-lg font-semibold">{"Anime"}</h3>
        <p className="text-sm">{"Anime description"}</p>
      </div>
      <div className="absolute bg-black top-3 right-3 p-3 rounded-full">
        <Trash stroke="red" />
      </div>
    </div>
  );
};

export default RemoveCategoryGrid;
