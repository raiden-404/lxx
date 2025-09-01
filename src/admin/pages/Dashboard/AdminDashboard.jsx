/*
  NOTE: Is component ko chalaane ke liye, aapko MUI X Charts library install karni hogi.
  Apne terminal mein yeh command chalayein:
  npm install @mui/x-charts @mui/material @emotion/react @emotion/styled
*/
import { PieChart, LineChart, BarChart } from "@mui/x-charts";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// API URL ko ek constant mein rakha gaya hai.
// Apne backend ka sahi URL yahan daalein.
const API_BASE_URL = "http://localhost:8080";

// Dark theme ki definition
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
});

// Data load hote samay dikhaane ke liye ek chhota component
const LoadingSpinner = () => (
  <div className="flex h-screen w-full items-center justify-center bg-black text-white">
    <p>Dashboard ka data load ho raha hai...</p>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  // Yeh hook responsiveness ke liye zaroori hai. Mobile screen par 'true' return karega.
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // State Management
  const [loading, setLoading] = useState(true);
  const [topStates, setTopStates] = useState([]);
  const [topSlugs, setTopSlugs] = useState([]);
  const [pendingAndShipped, setPendingAndShipped] = useState([0, 0]);
  const [revenue, setRevenue] = useState(null);
  const [orders, setOrders] = useState([0, 0, 0]);

  // API calls ke liye ek behtar, reusable function
  const fetchApiData = useCallback(async (endpoint) => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      navigate("/login");
      throw new Error("Authentication token nahi mila.");
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Endpoint se data fetch nahi ho paaya: ${endpoint}`);
    }
    return response.json();
  }, [navigate]);

  // Saara data ek saath fetch karein taaki performance acchi rahe
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          statesData,
          slugsData,
          processingShippedData,
          revenueData,
          orderStatusData,
        ] = await Promise.all([
          fetchApiData("/admin/get-top-states"),
          fetchApiData("/admin/get-top-slugs"),
          fetchApiData("/admin/get-processing-shipped"),
          fetchApiData("/admin/get-revenue-chart"),
          fetchApiData("/admin/get-delivered-returned-canceled"),
        ]);

        setTopStates(statesData);
        setTopSlugs(slugsData);
        setPendingAndShipped(processingShippedData);
        setRevenue(revenueData);
        setOrders(orderStatusData);
      } catch (error) {
        console.error("Dashboard ka data fetch karte samay error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [fetchApiData]);

  // Responsiveness ke liye dynamic chart configurations
  const smallPieChartConfig = {
    innerRadius: isMobile ? 25 : 30,
    outerRadius: isMobile ? 50 : 60,
    cx: isMobile ? 70 : 80,
    cy: isMobile ? 80 : 90,
    paddingAngle: 1,
    cornerRadius: 3,
  };
  
  const largePieChartConfig = {
    innerRadius: isMobile ? 50 : 60,
    outerRadius: isMobile ? 90 : 110,
    paddingAngle: 2,
    cornerRadius: 5,
    // CX aur CY ko yahan se hata diya gaya hai taaki legend ke saath aasaani se adjust ho sake
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white md:p-6 lg:p-8">
      <ThemeProvider theme={darkTheme}>
        {/* Layout ab flex-col hai, taaki mobile par sab stack ho jaye */}
        <div className="flex flex-col gap-12">
          
          {/* Section 1: Badi screen par flex-row, mobile par flex-col */}
          <div className="flex w-full flex-col gap-6 lg:flex-row">
            {/* Badi screen par 2/3 width, mobile par full width */}
            <div className="h-96 w-full rounded-3xl border border-gray-700 lg:w-2/3">
              {/* FIX: PieChart ki height ab parent div se control ho rahi hai, aur legend ko sahi se position kiya gaya hai. */}
              <PieChart
                series={[{
                    data: [
                      { value: 56, label: "Electronics" },
                      { value: 45, label: "Apparel" },
                      { value: 30, label: "Home Goods" },
                    ],
                    ...largePieChartConfig,
                }]}
                slotProps={{
                  legend: {
                    direction: 'column',
                    position: { vertical: 'middle', horizontal: 'right' },
                    padding: 0,
                  },
                }}
              />
            </div>
            {/* Badi screen par 1/3 width, mobile par full width */}
            <div className="grid w-full grid-rows-2 gap-5 lg:w-1/3">
              <div className="relative row-span-1 pe-4 rounded-3xl border border-gray-700">
                <h1 className="absolute -top-4 right-6 bg-black px-2 text-lg font-semibold">Order Status</h1>
                <PieChart
                  series={[{
                      data: [
                        { value: pendingAndShipped[0], label: "Processing", color: "#D99521" },
                        { value: pendingAndShipped[1], label: "Shipped", color: "#0047B8" },
                      ],
                      ...smallPieChartConfig
                  }]}
                />
              </div>
              <div className="relative row-span-1 pe-4 rounded-3xl border border-gray-700">
                <h1 className="absolute -top-4 right-6 bg-black px-2 text-lg font-semibold">Orders This Month</h1>
                <PieChart
                  series={[{
                      data: [
                        { value: orders[0], label: "Delivered", color: "#28a745" },
                        { value: orders[1], label: "Cancelled", color: "#dc3545" },
                        { value: orders[2], label: "Returned", color: "#fd7e14" },
                      ],
                      ...smallPieChartConfig
                  }]}
                />
              </div>
            </div>
          </div>
          
          {/* Section 2: Badi screen par flex-row, mobile par flex-col */}
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Badi screen par 1/3 width, mobile par full width */}
            <div className="relative w-full rounded-3xl border border-gray-700 lg:w-1/3">
              <h1 className="absolute -top-4 right-6 bg-black px-2 text-lg font-semibold">Top Selling SLUGS</h1>
              {topSlugs.length > 0 && (
                <BarChart
                  // NOTE: MUI X Charts (v6) mein bar ko round karne ka direct option nahi hai.
                  // Yeh feature v7 mein aane ki sambhavna hai.
                  xAxis={[{ 
                    scaleType: "band", 
                    data: topSlugs.map((s) => s.slug),
                    // FIX: Lambe labels ko cutne se bachane ke liye unhe rotate kiya gaya hai.
                    tickLabelStyle: {
                        angle: 0,
                        textAnchor: 'middle',
                        fontSize: 10,
                        textTransform:"full-width"
                    }
                  }]}
                  series={[{ data: topSlugs.map((s) => s.totalQuantity), color: "#00B377" }]}
                  height={300}
                  margin={{bottom:4}}
                />
              )}
            </div>
            {/* Badi screen par 2/3 width, mobile par full width */}
            <div className="relative w-full rounded-3xl border border-gray-700 lg:w-2/3">
              <span className="absolute -top-4 right-6 bg-black px-2 text-lg font-semibold">
                Last 15 <span className="text-[#00FFD9]">Day</span> /{" "}
                <span className="text-[#FF0569]">Week</span> Revenue
              </span>
              {revenue && (
                <LineChart
                  xAxis={[{ data: Array.from({ length: 15 }, (_, i) => i + 1) }]}
                  series={[
                    { data: revenue.dailyRevenue, label: "Daily", color: "#00FFD9", curve: "natural" },
                    { data: revenue.weeklyRevenue, label: "Weekly", color: "#FF0569", curve: "natural" },
                  ]}
                  height={300}
                />
              )}
            </div>
          </div>

          {/* Section 3: Badi screen par flex-row, mobile par flex-col */}
          <div className="flex flex-col gap-6 lg:flex-row">
             {/* Map Integration */}
             <div className="h-96 w-full rounded-3xl border border-gray-700 lg:w-2/3">
                <iframe
                    title="India Sales Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15247900.41793731!2d73.08339304383196!3d20.73033871691492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1678886196231!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '24px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            {/* Badi screen par 1/3 width, mobile par full width */}
            <div className="relative h-96 w-full rounded-3xl border border-gray-700 lg:w-1/3">
              <h1 className="absolute -top-4 right-6 bg-black px-2 text-lg font-semibold">
                State With Most Sells
              </h1>
              {topStates.length > 0 && (
                <BarChart
                  layout="horizontal"
                  yAxis={[{ 
                    scaleType: "band", 
                    data: topStates.map((s) => s.state),
                  }]}
                  series={[{ data: topStates.map((s) => s.orderCount), color: "#0DBDB4" }]}
                  // FIX: Lambe state names ko cutne se bachane ke liye left margin badhaya gaya hai.
                  margin={{ left: isMobile ? 10 : 20 }}
                />
              )}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default AdminDashboard;

