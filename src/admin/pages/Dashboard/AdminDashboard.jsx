import { PieChart, LineChart, BarChart } from "@mui/x-charts";
import { ThemeProvider, createTheme } from '@mui/material/styles';

// 1. Define your custom dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // These text colors will be used by the charts for axes, labels, and tooltips
    text: {
      primary: '#fff',       // For axis labels and larger text
      secondary: '#b3b3b3', // For axis tick numbers (the coordinates)
    },
  },
});

const AdminDashboard = () => {
  return (
    //This is parent
    <div className="flex flex-col gap-12">
          <ThemeProvider theme={darkTheme} >
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
            <PieChart
              series={[
                  {
                      data: [
                          { value: 56, label: "Pending", color: '#B35500' },
                          { value: 56, label: "shipped", color: '#00C713' },
                        ],
                        innerRadius: 30,
                        outerRadius: 60,
                        paddingAngle: 1,
                        cornerRadius: 3,
                        startAngle: 0,
                        endAngle: 360,
                        cx: 80,
                        cy: 90,
                    },
                ]}
                />
          </div>
          {/* item sold */}
          <div className="border border-gray-700 row-span-1 pe-16 rounded-3xl ">
            <PieChart sx={{color: '#FAFAFA'}}
              series={[
                  {
                      data: [
                          { value: 56, label: "shipped" },
                          { value: 56, label: "shipped" },
                          { value: 56, label: "shipped" },
                        ],
                        innerRadius: 30,
                        outerRadius: 60,
                        paddingAngle: 2,
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
        <div className="w-1/3 border border-gray-700 rounded-3xl">
          <BarChart
            xAxis={[
                {
                    id: "barCategories",
                    data: [
                        "bar A",
                        "bar B",
                        "bar C",
                        "bar D",
                        "bar E",
                        "bar F",
                        "bar G",
                        "bar H",
                    ],
                },
            ]}
            series={[
                {
                    data: [2, 5, 3, 2, 5, 3, 7, 29],
                },
            ]}
            height={300}
            />
        </div>
        {/* revenue month / all */}
        <div className="border border-gray-700 rounded-3xl w-2/3">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 14, 16, 18, 20, 22, 24] }]}
            series={[
                {
                    data: [2, 5.5, 2, 8.5, 1.5, 5, 2, 8.5, 1.5, 5],
                },
                {
                    data: [1, 5, 4, 2, 1.5, 10, 5, 4, 2, 1.5, 10],
                },
            ]}
            height={300}
            />
        </div>
      </div>
      {/* Map - top state */}
      <div className="flex gap-5">
        {/* Map */}
        <div className="w-2/3 border border-gray-700 rounded-3xl ">Map</div>
        {/* Top state */}
        <div className="w-1/3 border border-gray-700 rounded-3xl">
          <BarChart
            xAxis={[
                {
                    id: "barCategories",
                    data: [
                        "Bihar",
                        "Utter Pradesh",
                        "Delhi",
                        "Goa",
                        "Punjab"
                    ],
                },
            ]}
            series={[
                {
                    data: [21, 52, 43, 32, 25],
                },
            ]}
            height={300}
            />
        </div>
      </div>
            </ThemeProvider>
    </div>
  );
};
export default AdminDashboard;
