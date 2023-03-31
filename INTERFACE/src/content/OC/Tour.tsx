import React from "react";
import JoyRide from "react-joyride";
const TOUR_STEPS = [
  {
    target: '[data-tut="oc-supply-card"]',
    content: (
      <>
        <div>
          <h2>Total Supply amount</h2>
          <p>
            This shows the total supplied amount in the Over collateralized
            market
          </p>
        </div>
      </>
    ),
    disableBeacon: true,
  },
  {
    target: '[data-tut="oc-borrow-card"]',
    content: (
      <>
        <div>
          <h2>Total borrowed amount</h2>
          <p>
            This shows the total borrowed amount in the Over collateralized
            market
          </p>
        </div>
      </>
    ),
  },
  {
    target: '[data-tut="oc-apy-card"]',
    content: (
      <>
        <div>
          <h2>Total Apy</h2>
          <p>
            This shows the total apy you are earning in the Over collateralized
            market
          </p>
        </div>
      </>
    ),
  },
  {
    target: '[data-tut="oc-supply-assets"]',
    content: (
      <>
        <div>
          <h2>Supply assets table</h2>
          <p>
            This shows all the assets you can supply in the Over collateralized
            market
          </p>
        </div>
      </>
    ),
  },
  {
    target: '[data-tut="oc-borrow-assets"]',
    content: (
      <>
        <div>
          <h2>Borrow assets table</h2>
          <p>
            This shows all the assets you can borrow in the Over collateralized
            market
          </p>
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
