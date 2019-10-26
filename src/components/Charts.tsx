import React from "react";
import { Line } from "react-chartjs-2";
import Near, { MonthsArray } from "../near/Near";
export default () => {
  const [m, setM] = React.useState<MonthsArray | null>(null);
  React.useMemo(() => Near.monthCounters(), []).then(setM);
  if (!m) {
    return null;
  }
  return (
    <Line
      options={{
        legend: {
          display: false,
          fontColor: "rgb(255, 99, 132)"
        },
        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true
              }
            }
          ]
        }
      }}
      data={{
        labels: m.monthLabels,
        datasets: [
          {
            backgroundColor: "rgba(24, 119, 242,.2)",
            borderColor: "rgba(24, 119, 242)",
            data: m.monthCounters,
            pointBackgroundColor: "#000",
            pointRadius: 4,
            lineTension: 0
          }
        ]
      }}
    />
  );
};
