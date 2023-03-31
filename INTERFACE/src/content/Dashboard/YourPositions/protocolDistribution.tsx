import React from "react";
import { Pie } from "react-chartjs-2";
import { Box } from "@mui/material";

export function ProtocolChart({ value }) {
  const data = {
    labels: ["Balancer", "Compound", "Uniswap", "Curve", "Aave", "Orange"],
    datasets: [
      {
        label: "Amount Supplied %",
        data: [0, 0, 0, 0, 100, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "rgb(255, 99, 132)",
          },
        },
      },
    },
  };
  return (
    <Box sx={{ minWidth: "300px", pb: "20px" }}>
      <Pie data={data} />
    </Box>
  );
}
