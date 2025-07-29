import { useState } from "react";

const SearchBar = ({setShowSearch}) => {
    const [search, setSearch] = useState("");
    console.log(search);
    return (
        <div onClick={() => setShowSearch(false)} className="bg-gray-800 absolute mt-16 p-4 w-full h-[100vh] flex justify-center bg-opacity-85 top-0">
            <input type="search" onClick={(e) => e.stopPropagation()} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="pl-6 pr-6 h-11 w-[86%] md:w-[66%] lg:w-[50%] rounded-3xl border-2 border-pink-700 outline-none" />
        </div>
    )
}
export default SearchBar;