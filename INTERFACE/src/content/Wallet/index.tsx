import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import WalletBarContent from "./WalletBarContent";

// @todo add props to get tokenId and data for the particular wallet
export default function WalletDrawer({ open, onClose, walletData }) {
  const toggleDrawer = () => onClose(false);
  const anchor = "right";

  return (
    <div>
      {/** @ts-ignore*/}
      <SwipeableDrawer anchor="right" open={open} onClose={toggleDrawer}>
        <WalletBarContent walletData={walletData} />
      </SwipeableDrawer>
    </div>
  );
}
