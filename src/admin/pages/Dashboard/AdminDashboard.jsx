import { PieChart, LineChart, BarChart } from "@mui/x-charts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// 1. Define your custom dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // These text colors will be used by the charts for axes, labels, and tooltips
    text: {
      primary: "#fff", // For axis labels and larger text
      secondary: "#b3b3b3", // For axis tick numbers (the coordinates)
    },
  },
});

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [topStates, setTopStates] = useState([]);
  const [topSlugs, setTopSlugs] = useState([]);
  const [pendingAndShipped, setPendingAndShipped] = useState([0,0]);
  const [revenue, setRevenue] = useState(null);
  const [orders, setOrders] = useState([]);

  //Used to fetch top states
  const fetchStates = useCallback(async () => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      navigate("/login");
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/get-top-states`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch top states");
    }

    const data = await response.json();

    setTopStates(data);
  }, [navigate]);

  //Used to fetch top sold slugs
  const fetchSlugs = useCallback(async () => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      navigate("/login");
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/get-top-slugs`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch top slugs");
    }

    const data = await response.json();
    setTopSlugs(data);
  }, [navigate]);

  //Used to fetch count of orders processing and orders shipped
  const fetchProcessingAndShipped = useCallback( async () => {
    const jwtToken = Cookies.get("jwtToken");
    if(!jwtToken) {
      navigate("/login");
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/get-processing-shipped`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if(!response.ok) {
      throw new Error("Failed to load processing/shipped orders status");
    }
    const data = await response.json();
    setPendingAndShipped(data);
  
  },[navigate]);

  //Used to fetch Revenue day and week wise
  const fetchRevenueChart = useCallback( async () => {
    const jwtToken = Cookies.get("jwtToken");
    if(!jwtToken) {
      navigate("/login");
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/get-revenue-chart`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if(!response.ok) {
      throw new Error("Failed to fetch revenue chart");
    }

    const data = await response.json();
    setRevenue(data);
  },[navigate]);


  //Used to fetch in month order staus (delivered, canceled, returned)
  const fetchOrderStatus = useCallback( async () => {
    const jwtToken = Cookies.get("jwtToken");
    if(!jwtToken) {
      navigate("/login");
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/get-delivered-returned-canceled`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if(!response.ok) {
      throw new Error("Failed to fetch order status");
    }

    const data = await response.json();
    setOrders(data);

  },[navigate]);


  useEffect(() => {
    fetchStates();
    fetchSlugs();
    fetchProcessingAndShipped();
    fetchRevenueChart();
    fetchOrderStatus();
  }, [fetchStates, fetchSlugs,fetchProcessingAndShipped, fetchRevenueChart, fetchOrderStatus]);

  return (
    //This is parent
    <div className="flex flex-col gap-12">
      <ThemeProvider theme={darkTheme}>
        {/* Contain [revenue by item] [[processing/shipped] [items sold]] */}
        <div className="flex h-96 w-full gap-6">
          {/* Contain revenue by item */}
          <div className="w-2/3 border border-gray-700 pe-48 rounded-3xl">
            <PieChart
              series={[
                {
                  data: [
                    { value: 56, label: "shipped" },
                    { value: 56, label: "shipped" },
                    { value: 56, label: "shipped" },
                  ],
                  innerRadius: 50,
                  outerRadius: 100,
                  paddingAngle: 2,
                  cornerRadius: 3,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 150,
                  cy: 185,
                },
              ]}
            />
          </div>
          {/* contain processing/shipping - item sold */}
          <div className="w-1/3 h-full gap-5 grid grid-rows-2">
            {/* processing/shipping */}
            <div className="border border-gray-700 relative row-span-1 pe-16 rounded-3xl">
              <h1 className="absolute right-6 -top-4 text-lg font-semibold bg-black px-2">Order Status</h1>
              <PieChart
                series={[
                  {
                    data: [
                      { value: pendingAndShipped[0], label: "Pending", color: "#FF891A" },
                      { value: pendingAndShipped[1], label: "shipped", color: "#3BB5C4" },
                    ],
                    innerRadius: 30,
                    outerRadius: 60,
                    paddingAngle: 0,
                    cornerRadius: 3,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 80,
                    cy: 90,
                  },
                ]}
              />
            </div>
            {/* this month total delivered order, cancled order and returned order */}
            <div className="border border-gray-700 relative row-span-1 pe-16 rounded-3xl ">
              <h1 className="absolute right-6 -top-4 text-lg font-semibold bg-black px-2">Orders This Month</h1>
              <PieChart
                sx={{ color: "#FAFAFA" }}
                series={[
                  {
                    data: [
                      { value: orders[0], label: "Delivered" ,color: "#28a745"},
                      { value: orders[1], label: "Canceled", color: "#dc3545" },
                      { value: orders[2], label: "Returened", color: "#fd7e14" },
                    ],
                    innerRadius: 30,
                    outerRadius: 60,
                    paddingAngle: 0,
                    cornerRadius: 3,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 80,
                    cy: 90,
                  },
                ]}
              />
            </div>
          </div>
        </div>
        {/* revenue month / all - top slug */}
        <div className="flex gap-5">
          {/* top slug */}
          <div className="w-1/3 border relative border-gray-700 rounded-3xl">
            <h1 className="absolute right-6 text-lg font-semibold -top-4 bg-black px-2">Top Selling SLUGS</h1>
            {topSlugs.length > 0 ? (
              <BarChart
                xAxis={[
                  {
                    id: "barCategories",
                    data: topSlugs.map(slug => slug.slug),
                  },
                ]}
                series={[
                  {
                    data: topSlugs.map(slug => slug.totalQuantity),
                  },
                ]}
                height={300}
              />
            ) : (
              <></>
            )}
          </div>
          {/* revenue month / all */}
          <div className="border border-gray-700 rounded-3xl relative w-2/3">
            <span className="absolute right-6 -top-4 px-2 bg-black text-lg font-semibold">Last 15 <span className="text-blue-700">Day</span>{"  "}/{"  "}<span className="text-yellow-300">Week</span> Revenue</span>
            {
              revenue && 
              <LineChart
              xAxis={[
                { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
              ]}
              series={[
                {
                  data: revenue.dailyRevenue.map(price => price),
                },
                {
                  data: revenue.weeklyRevenue.map(price => price),
                },
              ]}
              height={300}
            />
            }
          </div>
        </div>
        {/* Map - top state */}
        <div className="flex gap-5">
          {/* Map */}
          <div className="w-2/3 border border-gray-700 rounded-3xl ">Map</div>
          {/* Top state */}
          <div className="w-1/3 border border-gray-700 relative rounded-3xl">
            <h1 className="absolute right-6 -top-4 text-lg font-semibold px-2 bg-black">State With Most Sells</h1>
            {topStates.length > 0 ? (
              <BarChart
                xAxis={[
                  {
                    id: "barCategories",
                    data: topStates.map((state) => state.state),
                  },
                ]}
                series={[
                  {
                    data: topStates.map((state) => state.orderCount),
                  },
                ]}
                height={300}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};
export default AdminDashboard;
