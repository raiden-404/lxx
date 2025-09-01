/*
  IMPORTANT: Is component ko chalaane se pehle, neeche di gayi libraries install karna zaroori hai.
  React 19 ke version mismatch error se bachne ke liye, neeche di gayi command ka istemal karein:

  npm install @mui/x-charts @mui/material @emotion/react @emotion/styled d3-scale leaflet react-leaflet --legacy-peer-deps

  NOTE: Agar aap TypeScript use kar rahe hain, to yeh command bhi chalayein:
  npm install -D @types/leaflet --legacy-peer-deps
*/
import { PieChart, LineChart, BarChart } from "@mui/x-charts";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// --- Leaflet libraries for the dynamic map ---
import { MapContainer, TileLayer, GeoJSON, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet ki default styling
import { scaleLinear } from 'd3-scale';
import { Box, CircleAlert, CircleDot, ShoppingBag, Star, User } from "lucide-react";

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

// Choropleth Map Component using Leaflet
const IndiaLeafletMap = ({ data }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  // Map ke liye GeoJSON data online fetch karein taaki local file ki zaroorat na pade
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson')
      .then(res => res.json())
      .then(geoData => setGeoJsonData(geoData))
      .catch(error => console.error("Could not fetch map data:", error));
  }, []);

  // Data ko ek object mein badal dein taaki state dhoondhna aasan ho
  const dataByStateName = data.reduce((acc, stateData) => {
    // API se mile state names ko normalize karein
    acc[stateData.state.toLowerCase()] = stateData.orderCount;
    return acc;
  }, {});

  // Order count ke hisaab se color ka scale banayein
  const colorScale = scaleLinear()
    .domain([0, Math.max(...data.map(d => d.orderCount), 1)])
    .range(["rgb(44, 210, 40, 0)", "rgb(44, 210, 40, 1)"]); // Kam count ke liye halka color, zyada ke liye gehra

  // Har state ke liye style define karne waala function
  const styleGeoJson = (feature) => {
    // GeoJSON file mein state ka naam 'NAME_1' ya 'st_nm' ho sakta hai, isliye dono ko check karein
    const stateName = (feature.properties.NAME_1 || feature.properties.st_nm).toLowerCase();
    const count = dataByStateName[stateName] || 0;
    return {
      fillColor: colorScale(count),
      weight: 1,
      opacity: 1,
      color: '#', // Dark border for states
      fillOpacity: 0.6, // Opacity halki si kam kar di taaki neeche ka map dikhe
    };
  };

  // Har state par interactivity (hover effects) add karne waala function
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const stateName = feature.properties.NAME_1 || feature.properties.st_nm;
        const count = dataByStateName[stateName.toLowerCase()] || 0;
        // Tooltip/popup content
        layer.bindTooltip(`<b>${stateName}</b><br/>${count} orders`).openTooltip();
        // Highlight effect
        e.target.setStyle({
          weight: 0,
          color: 'rgb(255, 0, 0, 0)',
          fillOpacity: 0.6,
        });
      },
      mouseout: (e) => {
        layer.closeTooltip();
        // Highlight effect hatayein
        e.target.setStyle(styleGeoJson(feature));
      },
    });
  };

  // Jab tak map ka data load na ho, loading message dikhayein
  if (!geoJsonData) {
    return <div className="flex h-full w-full items-center justify-center">Loading Map Data...</div>;
  }

  return (
    <MapContainer 
      center={[22, 82]} // Map ko India par center karein
      zoom={4} 
      style={{ height: "100%", width: "100%", backgroundColor: '#1a202c', borderRadius: '24px' }}
      scrollWheelZoom={true}
    >
      {/* Ab hum ek detailed map use kar rahe hain jisme labels aur roads dikhte hain */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      
      {/* Yeh layer aapke colored states ko detailed map ke upar dikhayega */}
      <GeoJSON 
        data={geoJsonData} 
        style={styleGeoJson}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
};


// Data load hote samay dikhaane ke liye ek chhota component
const LoadingSpinner = () => (
  <div className="flex h-screen w-full items-center justify-center bg-black text-white">
    <p>Dashboard ka data load ho raha hai...</p>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // State Management
  const [loading, setLoading] = useState(true);
  const [topStates, setTopStates] = useState([]);
  const [topSlugs, setTopSlugs] = useState([]);
  const [pendingAndShipped, setPendingAndShipped] = useState([0, 0]);
  const [revenue, setRevenue] = useState(null);
  const [orders, setOrders] = useState([0, 0, 0]);
  const [allState, setAllStates] = useState([]);

  // API calls ke liye ek behtar, reusable function
  const fetchApiData = useCallback(async (endpoint) => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      navigate("/login");
      throw new Error("Authentication token nahi mila.");
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
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
          allStateData,
        ] = await Promise.all([
          fetchApiData("/admin/get-top-states"),
          fetchApiData("/admin/get-top-slugs"),
          fetchApiData("/admin/get-processing-shipped"),
          fetchApiData("/admin/get-revenue-chart"),
          fetchApiData("/admin/get-delivered-returned-canceled"),
          fetchApiData("/admin/get-all-state-order-count"),
        ]);

        setTopStates(statesData);
        setTopSlugs(slugsData);
        setPendingAndShipped(processingShippedData);
        setRevenue(revenueData);
        setOrders(orderStatusData);
        setAllStates(allStateData);
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
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white md:p-6 lg:p-8">
      <ThemeProvider theme={darkTheme}>
        <div className="flex flex-col gap-12">
          
          {/* Section 1: Badi screen par flex-row, mobile par flex-col */}
          <div className="flex w-full flex-col gap-6 lg:flex-row">
            <div className="h-96 py-4 px-4 w-full rounded-3xl relative border border-gray-700 lg:w-2/3">
              <h1 className=" absolute right-8 -top-4 text-lg font-semibold px-2 bg-black">Rating & Reviews</h1>
              <span className="absolute flex gap-2 -top-4 left-8 bg-black px-2 font-semibold text-lg items-center">LIVE<CircleDot size={14} fill="red" stroke="red" /></span>
              {/* Live reviews */}
              <div className=" h-full flex flex-col-reverse overflow-y-scroll gap-3 rounded-lg w-full">
                {/* List for map*/}
                {
                  [1,2,3,4,5,6,78,8].map(() => (
                    <div className="h-[18%] py-1 items-center px-2 border rounded-lg border-gray-400/40 flex">
                  {/* Image */}
                    <img className="h-[90%] rounded-full aspect-square" src="https://imgs.search.brave.com/O0Ivivs2MuYw9uwjjD_dXLAPLtA3gbOhSWYbSHdGo5A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYWVz/dGhldGljLWFuaW1l/LXByb2ZpbGUtcGlj/dHVyZXMtYmhkOXAw/bW45bWFidWZjbS5q/cGc" alt="" />
                  <div className="h-full flex flex-col justify-center text-nowrap px-2">
                    <span className="flex max-w-[16ch] truncate gap-1 text-[12px] text-gray-500 font-semibold"><User size={14} stroke="gray" />{"User Default"}</span>
                    <span className="text-gray-500 text-[12px] font-semibold">{"2 Mint ago"}</span>
                  </div>
                  {/*time, product,rating and reviews */}
                  <div className="ps-4 flex flex-col">
                    <span className="flex items-center gap-2 hover:underline font-semibold text-sm text-gray-200"><ShoppingBag size={12} /> {"Iphone 12 pro max black color"}</span>
                    <span className="flex gap-2 "><span className={`flex bg-green-600 h-fit  px-1 text-[12px] gap-1 items-center rounded-lg font-semibold`}>{4} <Star size={10} fill="white" /></span> <p className="text-gray-400 text-[12px] font-semibold line-clamp-2">{"Wow this product is good and creative. Better paper quality but little issue with glitering. image colour is also much accurate. Overall i love this product too much.Better paper quality but little issue with glitering. image colour is also much accurate. Overall i love this product too much.Better paper quality but little issue with glitering. image colour is also much accurate. Overall i love this product too much."}</p></span>
                  </div>
                </div>
                  ))
                }
                
              </div>
              
            </div>
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
            <div className="relative w-full rounded-3xl border border-gray-700 lg:w-1/3">
              <h1 className="absolute -top-4 right-6 bg-black px-2 text-lg font-semibold">Top Selling SLUGS</h1>
              {topSlugs.length > 0 && (
                <BarChart
                  xAxis={[{ 
                    scaleType: "band", 
                    data: topSlugs.map((s) => s.slug),
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
               <IndiaLeafletMap data={allState} />
             </div>
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

