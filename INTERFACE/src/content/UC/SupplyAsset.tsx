import { Card } from "@mui/material";
import SupplyAssetTable from "./SupplyAssetTable";

// icons to be used
import dai from "../../../public/icons/tokens/dai.svg";
import btc from "@/public/icons/tokens/btc.svg";
import usdc from "@/public/icons/tokens/usdc.svg";
import eth from "@/public/icons/tokens/eth.svg";
import { useAppDataProvider } from "../../contexts/AppDataContext";
import { useUCDataProvider } from "@/contexts/UCDataContext";
import { useState } from "react";

function getTokenData(PoolData, AavePoolData, walletData, tab) {
  if (tab === "aave") {
    return [
      {
        id: 1,
        name: "weth",
        icon: eth,
        supplyApy: AavePoolData?.supplyRate.weth.toString(),
        supplied: walletData?.aaveSupplyAmounts?.weth.toString(),
      },
      {
        id: 2,
        name: "dai",
        icon: dai,
        supplyApy: AavePoolData?.supplyRate.dai.toString(),
        supplied: walletData?.aaveSupplyAmounts?.dai.toString(),
      },
      {
        id: 3,
        name: "usdc",
        icon: usdc,
        supplyApy: AavePoolData?.supplyRate.usdc.toString(),
        supplied: walletData?.aaveSupplyAmounts?.usdc.toString(),
      },
      {
        id: 4,
        name: "wbtc",
        icon: btc,
        supplyApy: AavePoolData?.supplyRate.wbtc.toString(),
        supplied: walletData?.aaveSupplyAmounts?.wbtc.toString(),
      },
    ];
  }
  return [
    {
      id: 1,
      name: "weth",
      icon: eth,
      supplyApy: PoolData?.supplyRate.weth.toString(),
      supplied: walletData?.supplyAmounts?.weth.toString(),
    },
    {
      id: 2,
      name: "dai",
      icon: dai,
      supplyApy: PoolData?.supplyRate.dai.toString(),
      supplied: walletData?.supplyAmounts?.dai.toString(),
    },
    {
      id: 3,
      name: "usdc",
      icon: usdc,
      supplyApy: PoolData?.supplyRate.usdc.toString(),
      supplied: walletData?.supplyAmounts?.usdc.toString(),
    },
    {
      id: 4,
      name: "wbtc",
      icon: btc,
      supplyApy: PoolData?.supplyRate.wbtc.toString(),
      supplied: walletData?.supplyAmounts?.wbtc.toString(),
    },
  ];
}

function SupplyAssetUC({ walletData, tab, tokenId }) {
  const { PoolData, AavePoolData } = useAppDataProvider();
  const tokenData = getTokenData(PoolData, AavePoolData, walletData, tab);
  // console.log(
  //   "🚀 ~ file: SupplyAsset.tsx:81 ~ SupplyAssetUC ~ walletData",
  //   walletData?.tokenId
  // );

  return (
    <Card>
      <SupplyAssetTable
        tokenData={tokenData}
        isLoading={walletData ? false : true}
        tab={tab}
        tokenId={tokenId}
      />
    </Card>
  );
}

export default SupplyAssetUC;
