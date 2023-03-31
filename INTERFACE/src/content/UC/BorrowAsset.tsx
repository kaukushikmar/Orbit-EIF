import { Card } from "@mui/material";
import BorrowAssetTable from "./BorrowAssetTable";

// icons to be used
import dai from "@/public/icons/tokens/dai.svg";
import btc from "@/public/icons/tokens/btc.svg";
import usdc from "@/public/icons/tokens/usdc.svg";
import eth from "@/public/icons/tokens/eth.svg";
import { useAppDataProvider } from "../../contexts/AppDataContext";

function getTokenData(PoolData, AavePoolData, walletData, tab) {
  if (tab === "aave") {
    return [
      {
        id: 1,
        name: "weth",
        icon: eth,
        borrowApy: AavePoolData?.borrowRate.weth.toString(),
        borrowed: walletData?.aaveBorrowAmounts?.weth.toString(),
      },
      {
        id: 2,
        name: "dai",
        icon: dai,
        borrowApy: AavePoolData?.borrowRate.dai.toString(),
        borrowed: walletData?.aaveBorrowAmounts?.dai.toString(),
      },
      {
        id: 3,
        name: "usdc",
        icon: usdc,
        borrowApy: AavePoolData?.borrowRate.usdc.toString(),
        borrowed: walletData?.aaveBorrowAmounts?.usdc.toString(),
      },
      {
        id: 4,
        name: "wbtc",
        icon: btc,
        borrowApy: AavePoolData?.borrowRate.wbtc.toString(),
        borrowed: walletData?.aaveBorrowAmounts?.wbtc.toString(),
      },
    ];
  }
  return [
    {
      id: 1,
      name: "weth",
      icon: eth,
      borrowApy: PoolData?.borrowRate.weth.toString(),
      borrowed: walletData?.borrowAmounts?.weth.toString(),
    },
    {
      id: 2,
      name: "dai",
      icon: dai,
      borrowApy: PoolData?.borrowRate.dai.toString(),
      borrowed: walletData?.borrowAmounts?.dai.toString(),
    },
    {
      id: 3,
      name: "usdc",
      icon: usdc,
      borrowApy: PoolData?.borrowRate.usdc.toString(),
      borrowed: walletData?.borrowAmounts?.usdc.toString(),
    },
    {
      id: 4,
      name: "wbtc",
      icon: btc,
      borrowApy: PoolData?.borrowRate.wbtc.toString(),
      borrowed: walletData?.borrowAmounts?.wbtc.toString(),
    },
  ];
}

function BorrowAssetUC({ walletData, tab, tokenId }) {
  const { PoolData, AavePoolData } = useAppDataProvider();
  const tokenData = getTokenData(PoolData, AavePoolData, walletData, tab);
  // console.log(
  //   "🚀 ~ file: BorrowAsset.tsx:79 ~ BorrowAssetUC ~ walletData",
  //   walletData?.totalBorrowInUsd.toString()
  // );

  return (
    <Card>
      <BorrowAssetTable
        tokenData={tokenData}
        isLoading={walletData ? false : true}
        tab={tab}
        tokenId={tokenId}
      />
    </Card>
  );
}

export default BorrowAssetUC;
