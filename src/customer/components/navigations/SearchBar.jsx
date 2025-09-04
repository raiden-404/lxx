import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ setShowSearch }) => {
  const [search, setSearch] = useState("");
  const [words, setWords] = useState([]);
  const navigate = useNavigate();

  const fetchWords = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/public/s-category-name?s=${search}`
    );
    if (!response.ok) {
      return;
    }
    setWords(await response.json());
  }, [search]);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  return (
    <div
      onClick={() => setShowSearch(false)}
      className="bg-gray-100/80 absolute mt-16 p-4 w-full h-[100vh] flex justify-center bg-opacity-85 top-0"
    >
      <div className="w-[90%] md:w-[66%] lg:w-[60%] h-fit rounded-lg border-black ">
        {/* search bar */}
        <div className="flex w-full min-h-fit border-2 rounded-lg overflow-hidden border-black items-center justify-between">
          <input
            type="search"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              e.key === "Enter" &&
                search.length > 0 &&
                navigate(`/search/${search}`),
                e.key === "Enter" && setShowSearch(false);
            }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Try Cards, Anime, Frames and many more"
            className=" h-11 w-[78%] sm:w-[88%] sm:px-4 px-3 outline-none"
          />
          <div
            onClick={() => {
              search.length > 0 && navigate(`/search/${search}`);
            }}
            className="bg-pink-500 w-[22%] sm:w-[12%] cursor-pointer border-l-2 border-black h-11 flex items-center justify-center"
          >
            <Search stroke="white" />
          </div>
        </div>
        {/* Item displayed here */}
        <div className="p-2 h-auto max-h-[78vh] flex flex-wrap overflow-scroll gap-1 rounded-lg ">
          {words.map((val) => (
            <div
              onClick={(e) => {
                e.stopPropagation();
                val.length > 0 && navigate(`/search/${val}`);
                setShowSearch(false);
              }}
              className="border-2 cursor-pointer h-fit border-gray-500 bg-white text-nowrap font-semibold py-2 px-4 rounded-2xl"
            >
              {val}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
