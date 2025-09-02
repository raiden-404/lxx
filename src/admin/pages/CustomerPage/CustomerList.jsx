import { Ban, Calendar, Loader2, Phone, User } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("createdAt,desc");
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const jwtToken = Cookies.get("jwtToken");

    if (!hasMore) {
      return;
    }

    if (!jwtToken) {
      navigate("/login");
    }

    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/get-users-list?page=${page}&size=20&sort=${order}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (!response.ok) {
        setLoading(false);
      throw new Error("Failed to load users");
    }

    const data = await response.json();
    setUsers((prevUsers) => [...prevUsers, ...data.content]);
    setHasMore(!data.last);
    setLoading(false);
  }, [page, order]);

  useEffect(() => {
    fetchUsers();
  },[fetchUsers]);

  return (
    <div className="w-full items-center flex flex-col gap-2 ps-8">
      <h1 className="w-full text-2xl font-semibold text-gray-300 pb-8">
        USERS
      </h1>
      {users.map((user) => (
        <div className="border-2 hover:bg-gray-600/20 border-gray-600/80 rounded-xl flex justify-center items-center px-2 w-full h-20">
          {/* Image */}
          <div className="h-[90%] rounded-full border-2 border-gray-600/80 overflow-hidden justify-center flex items-center aspect-square">
            <img
              src={user.picture}
              alt={user.fullName}
              className="h-full"
            />
          </div>
          {/* Details */}
          <div className="ps-4 w-[84%] ">
            <span className="flex gap-2 font-semibold text-gray-300 text-sm">
              <User size={18} className="text-gray-500" /> {user.fullName}
            </span>
            <span className="flex gap-2 font-semibold text-sm">
              <Phone size={18} className="text-gray-500" />
              {user.phoneNumber}
            </span>
            <span className="flex gap-2 text-gray-400 text-sm">
              <Calendar size={18} className="text-gray-500" />
              {user.createdAt}
            </span>
          </div>
          {/* Extra option per user */}
          <div className="p-3 cursor-pointer">
            <span>
              <Ban
                strokeWidth={2}
                className="hover:fill-red-600/40 text-red-700"
              />
            </span>
          </div>
        </div>
      ))}
      <button
        onClick={() => {setPage(prev => prev+1)}}
        disabled={!hasMore && loading}
        className="border disabled:cursor-not-allowed hover:bg-gray-600/30 p-2 rounded-lg"
      >
        {hasMore ? (
          <>
            {loading ? (
              <span className="flex items-center gap-1">
                <Loader2 className="animate-spin" />
                Loading...
              </span>
            ) : (
              <>Show More</>
            )}
          </>
        ) : (
          <>That's all !!!</>
        )}
      </button>
    </div>
  );
};

export default CustomerList;
