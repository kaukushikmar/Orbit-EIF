import { Alert } from "@mui/material";
import React from "react";
import JoyRide from "react-joyride";
import AddIcon from "@mui/icons-material/Add";

const TOUR_STEPS = [
  {
    target: '[data-tut="uc-supply-card"]',
    content: (
      <>
        <div>
          <h2>Total Supply amount</h2>
          <p>
            This shows the total supplied amount in the Under collateralized
            market
          </p>
        </div>
      </>
    ),
    disableBeacon: true,
  },
  {
    target: '[data-tut="uc-borrow-card"]',
    content: (
      <>
        <div>
          <h2>Total borrowed amount</h2>
          <p>
            This shows the total borrowed amount in the Under collateralized
            market
          </p>
        </div>
      </>
    ),
  },
  {
    target: '[data-tut="uc-apy-card"]',
    content: (
      <>
        <div>
          <h2>Total Apy</h2>
          <p>This shows your total apy in the Under collateralized market</p>
        </div>
      </>
    ),
  },
  {
    target: '[data-tut="uc-positions"]',
    content: (
      <>
        <div>
          <h2>Positions table</h2>
          <p>
            This shows all of your positions created. You can go to any position
            by clicking on them.
          </p>
          <Alert severity="info" sx={{ color: "black" }}>
            You can create new position by clicking the + icon{" "}
          </Alert>
        </div>
      </>
    ),
  },
];

const Tour = () => {
  return (
    <>
      <JoyRide
        steps={TOUR_STEPS}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            backgroundColor: "green",
          },
          buttonBack: {
            marginRight: 10,
          },
        }}
      />
    </>
  );
};

export default Tour;
