import { useEffect, useState } from "react";
import RemoveBannerCard from "./RemoveBannerCard";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const RemoveBanners = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState(null);
  const [deleteBannerId, setDeleteBannerId] = useState(null);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  //Fetching all the list of banners
  useEffect(() => {
    const fetchBanners = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/login/getbanner`
      );
      if (!response.ok) {
        throw new Error("Failed fetching banners");
      }

      const result = await response.json();
      setBanners(result);
    };
    fetchBanners();
  }, [setBanners]);

  //Function to delete banner from server
  const handleDeleteBanner = async () => {
    const jwtToken = Cookies.get("jwtToken");
    if(!jwtToken) {
      navigate("/login");
    }
    const fullUri = `${import.meta.env.VITE_API_URL}/admin/remove-b-home?bId=${deleteBannerId}`;
    const response = await fetch(fullUri, {
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
      },2500);
      throw new Error("failed removing the banner");
    }

    setSuccess(true);
    setTimeout(() => {
      setBanners(banners.filter(banner => banner.id != deleteBannerId));
      setIsDialogueOpen(false);
      setSuccess(false);
    },2500);
  }

  return (
    <div className="flex flex-col gap-8">
      {banners &&
        banners.map((banner) => (
          <RemoveBannerCard key={banner.id} banner={banner} setDeleteBannerId={setDeleteBannerId} setIsDialogueOpen={setIsDialogueOpen} />
        ))}
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
                    onClick={() => handleDeleteBanner()}
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
  );
};

export default RemoveBanners;
