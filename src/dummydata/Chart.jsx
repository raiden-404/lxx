import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const Chart = () => {
  return (
    <div className="border flex flex-wrap h-[100vh] bg-white rounded-2xl">
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

      <PieChart
        series={[
          {
            data: [
              { label: "Pending", value: 23, color: 'darkorange' },
              { label: "Shipped", value: 77, color: 'green' },
            ],
            innerRadius: 60,
            outerRadius: 100,
            paddingAngle: 1,
            cornerRadius: 5,
            startAngle: -45,
            endAngle: 360,
            cx: 150,
            cy: 150,
          },
        ]}
      />
    </div>
  );
};

export default Chart;
