import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const RemoveNavbar = () => {
  const navigate = useNavigate();

  const [navbar, setNavbar] = useState(null);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const apiUri = `${import.meta.env.VITE_API_URL}/public/get-navbar-lists`;
    const fetchNavbar = async () => {
      const response = await fetch(apiUri);
      if(!response.ok) {
        throw new Error("Failed to fetch navbar");
      }
      const result = await response.json();
      setNavbar(result);
    }
    fetchNavbar();
  },[]);

  //Function to delete navbar
  const deleteNavbar = async () => {
    const jwtToken = Cookies.get("jwtToken");
    if(!jwtToken) {
      navigate("/login");
    }
    const fullUrl = `${import.meta.env.VITE_API_URL}/admin/remove-navbar?id=${deleteId}`;
    const response = await fetch(fullUrl,{
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if(!response.ok) {
      setFailed(true);
      setTimeout(() => {
        setIsDialogueOpen(false);
        setFailed(false);
        setDeleteId(null);
      },2500);
      throw new Error("failed to delete the navbar");
    }

    setSuccess(true);
    setTimeout(() => {
      setIsDialogueOpen(false);
      setSuccess(false);
      setNavbar(navbar.filter(nav => nav.id != deleteId));
      setDeleteId(null);
    },2500);

  }

  return (
    <div>
      {
        navbar &&
        navbar.map((item) =>  
        <div key={item.id} className="text-xl font-semibold items-center flex gap-8 bg-gray-600/20 p-6 w-fit rounded-2xl">
          {item.name}
          <div
          onClick={() => {setIsDialogueOpen(true); setDeleteId(item.id);}}
          className="bg-gray-500/40 p-2 hover:bg-gray-500/70 cursor-pointer rounded-full ">
          <Trash stroke="red" />  
          </div>
        </div>
        )
      }


      {/* Dailoge box for confirm, success and failed */}
      {isDialogueOpen &&
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
                      Successfully{" "}
                      <span className="text-red-700">DELETED
                      </span>{" "}
                      the product.{" "}
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
                        Failed{" "}
                        <span className="text-red-700">"DELETEING"
                        </span>{" "}
                        the product.
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-white">
                  Confirm{" "}
                  <span
                    className="text-red-700">
                    DELETE
                  </span>{" "}
                  This Banner
                </h3>
                <p className="text-gray-400 mt-2 text-sm">
                  Are you sure you want to &nbsp;
                  <span
                    className="text-red-700">
                    DELETE
                  </span>{" "}
                  &nbsp;This Banner?
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={() => setIsDialogueOpen(false)}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-28"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteNavbar()}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg w-28"
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        }
    </div>
  )
}

export default RemoveNavbar;