import React from "react";
import { Bar } from "react-chartjs-2";

export default function Chart(props) {
  const { houseHoldInfo } = props;
  let counties = [];
  let houseHolds = [];

  houseHoldInfo.map((house, i) => {
    if (i !== 0) {
      counties.push(house[0].split(",")[0]);
    }
  });

  houseHoldInfo.map((house, i) => {
    if (i !== 0) {
      houseHolds.push(house[1]);
    }
  });
  return (
    <div className="barchart">
      <Bar
        data={{
          labels: counties,
          datasets: [
            {
              label: "Households  by counties",
              data: houseHolds,
              backgroundColor: "red"
            }
          ]
        }}
        height={400}
        width={1040}
        options={{
          plugins: {
            datalabels: {
              display: "auto",
              align: "top",
              anchor: "end",
              color: "#000000",
              font: {
                size: 10
              }
            }
          },
          maintainAspectRatio: false,
          tooltips: { enabled: true },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }}
      />
    </div>
  );
}
