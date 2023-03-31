import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

// @todo fix decimals for other tokens
export function TokenChart({ tokenData }) {
  let totalToken = tokenData.weth
    .add(tokenData.usdc)
    .add(tokenData.dai.div(1000000000000))
    .add(tokenData.wbtc);
  //   console.log(
  //     "🚀 ~ file: tokenChart.tsx:13 ~ TokenChart ~ totalToken",
  //     totalToken.toString()
  //   );

  const usdc =
    tokenData.usdc && totalToken.toString() !== "0"
      ? parseFloat(tokenData.usdc.mul(100).div(totalToken).toString())
      : 0;
  //   console.log("🚀 ~ file: tokenChart.tsx:15 ~ TokenChart ~ usdc", usdc);
  const wbtc =
    tokenData.wbtc && totalToken.toString() !== "0"
      ? parseFloat(tokenData.wbtc.mul(100).div(totalToken).toString())
      : 0;
  const weth =
    tokenData.weth && totalToken.toString() !== "0"
      ? parseFloat(tokenData.weth.mul(100).div(totalToken).toString())
      : 0;
  const dai =
    tokenData.dai && totalToken.toString() !== "0"
      ? parseFloat(
          tokenData.dai.div(1000000000000).mul(100).div(totalToken).toString()
        )
      : 0;
  //   console.log(
  //     "🚀 ~ file: tokenChart.tsx:26 ~ TokenChart ~ tokenData.dai.mul(100).div(totalToken).toString()",
  //     tokenData.dai.mul(100).div(totalToken).toString()
  //   );
  //   console.log(
  //     "🚀 -------~ file: tokenChart.tsx:15 ~ TokenChart ~ dai",
  //     tokenData.dai.toString()
  //   );
  //   console.log(
  //     "🚀 -------~ file: tokenChart.tsx:15 ~ TokenChart ~ USDC",
  //     tokenData.usdc.toString()
  //   );
  const data = {
    labels: ["WETH", "USDC", "DAI", "WBTC"],
    datasets: [
      {
        label: "% token Supplied",
        data: [weth, usdc, dai, wbtc],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
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
