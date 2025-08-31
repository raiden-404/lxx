import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import TimeAgo from "./TimeAgo";
import { Loader2 } from "lucide-react";

const Notification = ({setUnreadCount, notifications, setNotifications, setNotificationOpen}) => {
  const navigate = useNavigate();

  //Notifications
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  //This refrence use to attached our scrollable notification container
  const containerRef = useRef(null);
  

  //Get all notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoadingMore(true);
      const jwtToken = Cookies.get("jwtToken");
      if(!jwtToken) {
        navigate("/login");
      }

      if(page == 0) setNotifications([]);

      const fullUri = `${import.meta.env.VITE_API_URL}/admin/get-notifications?page=${page}&size=${size}&sort=createTime,desc`;
      const response  = await fetch(fullUri, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if(!response.ok) {
        throw new Error("Error getting notifications");
      }

      const data = await response.json();
      setHasMore(!data.last);
      console.log( await data);
      setNotifications((prev) => [...prev,...data.content]);
      console.log("fetch for page : ", page);
    }
    
    fetchNotifications();
    setLoadingMore(false);

  },[page,size,navigate,setNotifications]);


  //Used to mark specific notification as read and open order page of the notification
  const handleNotificationClick = async (notificationId, orderId, read) => {
    //Make call to make notification as read true if it is false
    if(!read) {
      const jwtToken = Cookies.get("jwtToken");
      if(!jwtToken) {
        navigate("/login");
      }
      const fullUri = `${import.meta.env.VITE_API_URL}/admin/mark-read?id=${notificationId}`;
      const response = await fetch(fullUri, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if(!response.ok){
        throw new Error("Error making notification as read");
      }
      notifications.map((notification) => notification.notificationId == notificationId ? notification.read = true : "");
    }
    setUnreadCount(prevCount => prevCount - 1);
    setNotificationOpen(false);
    navigate(`/admin/order/${orderId}`);
  };


  //Used to mark all notifications as read
  const handleMarkAllAsRead = async () => {
    const jwtToken = Cookies.get("jwtToken");
    if(!jwtToken) {
      navigate("/login");
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/mark-all-notifications-read`, {
      headers: {
        Authorization : `Bearer ${jwtToken}`,
      },
    });
    if(!response.ok) {
      throw new Error("Error Mark all notifications as read");
    }
    notifications.map((notification) => notification.read = true);
    setUnreadCount(0);
  }


  //Use to handle notification scroll and fetch more on scrolling
  const handleScroll = () => {
    const container = containerRef.current;
    if(!container) return;

    if(container.clientHeight + container.scrollTop + 100 >= container.scrollHeight &&
      !loadingMore && hasMore
    ) {
      setPage(prev => prev+1);
    }
  };


  useEffect(() => {
    console.log(notifications);
  },[notifications]);

  return (
    <div  ref={containerRef} onScroll={handleScroll} className="w-full relative h-full overflow-scroll flex flex-col">
      <div className="flex sticky p-3 mb-3 border-b border-gray-500/40 top-0 bg-black justify-between">
        <h2 className="text-gray-100">Notifications</h2>
        <button onClick={handleMarkAllAsRead} className="text-sm font-semibold text-gray-300/80 hover:underline">Mark as Read</button>
      </div>
      <div>
        {notifications.length > 0 ? (
          <div className="flex flex-col gap-3">
            {notifications.map((notification) => (
              // Each notification container
              <div onClick={(e) => {e.preventDefault(); handleNotificationClick(notification.notificationId, notification.orderId, notification.read)}} className={`flex px-3 py-2 border rounded-2xl cursor-pointer hover:bg-gray-900/60 border-gray-600/50 ${notification.read ? "" : "bg-pink-900/40"} `}>
                <div className="w-[18%] aspect-square flex items-center">
                  <img src={notification.userImage} alt="USER" className="rounded-full object-cover w-2/3" />
                </div>
                <div className="w-[82%]">
                  <p className="truncate-2 text-slate-300 text-sm font-semibold">{notification.message}</p>
                  <TimeAgo isoDateString={notification.createdAt} />
                </div>
                {
                  notification.read ? <></> : <div className="h-2 w-2 bg-pink-500 rounded-full mt-2"></div>
                }
              </div>
            ))}
            {loadingMore && <div className="bg-gray-700/50 rounded-full p-2 flex justify-center gap-2 font-semibold"><Loader2 className="animate-spin"/>Loading...</div>}
            {!hasMore && <div className="bg-gray-800/60 p-2 rounded-full text-center font-semibold">That's All !!!</div>}
          </div>
        ) : (
          <div>Loading Notifications...</div>
        )}
      </div>
    </div>
  );
};

export default Notification;
