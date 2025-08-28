import { Trash, Check, X } from "lucide-react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RemoveCategoryGrid = () => {
  const navigate = useNavigate();
  const [grids, setGrids] = useState(null);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [gridDeleteId, setGridDeleteId] = useState(null);


  //Fetch all the grid from the server
  useEffect(() => {
    const fetchGrid = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/public/get-home-category-grid`);
      if(!response.ok) {
        throw new Error("error fetching grids");
      }
      const result = await response.json();
      setGrids(result);
    }
    fetchGrid();
  },[]);

  //Use to remove the grid from the server
  const handleGridRemove = async () => {
    const jwtToken = Cookies.get("jwtToken");

    if (!jwtToken) {
      navigate("/login");
    }
    if(!gridDeleteId) {
      throw new Error("inavlid grid id");
    }

    const fullUri = `${
      import.meta.env.VITE_API_URL
    }/admin/remove-grid?id=${gridDeleteId}`;

    const response = await fetch(fullUri, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      setFailed(true);
      setTimeout(() => {
        setIsDialogueOpen(false);
        setFailed(false);
      },2500);

      throw new Error("Error removing grid");
    }

    setSuccess(true);
    setTimeout(() => {
      setGrids(grids.filter(grid => grid.id != gridDeleteId));
      setIsDialogueOpen(false);
      setGridDeleteId(null);
      setSuccess(false);
    },2500);
  };

  return (
    <div
      className={` flex gap-6 justify-evenly flex-wrap`}
    >
      {/* Dailoge box for confirm, success and failed */}
      {isDialogueOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-center">
            {success || failed ? (
              <>
                {success ? (
                  <div
                    className={`bg-green-400/40 flex p-6 gap-4 rounded-2xl justify-center flex-col items-center`}
                  >
                    <div className="p-4 bg-green-700 border rounded-full mb-6">
                      <Check size={42} strokeWidth={3} />
                    </div>
                    <div className="text-xl">
                      Successfully <span className="text-red-700">DELETED</span>{" "}
                      the Grid.{" "}
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className={`bg-red-400/40 flex p-6 gap-4 rounded-2xl justify-center flex-col items-center`}
                    >
                      <div className="p-4 bg-red-700 border rounded-full mb-6">
                        <X size={42} strokeWidth={3} />
                      </div>
                      <div className="text-xl">
                        Failed <span className="text-red-700">"DELETEING"</span>{" "}
                        the product.
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-white">
                  Confirm <span className="text-red-700">DELETE</span> This Grid
                </h3>
                <p className="text-gray-400 mt-2 text-sm">
                  Are you sure you want to &nbsp;
                  <span className="text-red-700">DELETE</span> &nbsp;This
                  Category Grid?
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={() => setIsDialogueOpen(false)}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-28"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleGridRemove()}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg w-28"
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Card */
        grids && grids.map((grid) => 
      <div key={grid.id} className="relative h-64 aspect-video overflow-hidden rounded-xl shadow cursor-pointer hover:opacity-90 transition duration-300 group">
        <img
          src={grid.image}
          alt={grid.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition duration-300"></div>
        <div className="absolute bottom-4 left-4 text-white z-10">
          <h3 className="text-lg font-semibold">{grid.name}</h3>
          <p className="text-sm">{grid.description}</p>
        </div>
        <div onClick={() => {setGridDeleteId(grid.id); setIsDialogueOpen(true);}} className="absolute bg-black top-3 right-3 p-3 rounded-full">
          <Trash stroke="red" />
        </div>
      </div>)}
    </div>
  );
};

export default RemoveCategoryGrid;
 