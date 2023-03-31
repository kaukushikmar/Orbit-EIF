import { Card } from "@mui/material";
import BorrowAssetTable from "./BorrowAssetTable";

// icons to be used
import dai from "@/public/icons/tokens/dai.svg";
import btc from "@/public/icons/tokens/btc.svg";
import usdc from "@/public/icons/tokens/usdc.svg";
import eth from "@/public/icons/tokens/eth.svg";
import { useAppDataProvider } from "../../contexts/AppDataContext";

function BorrowAsset() {
  const { OCData, PoolData } = useAppDataProvider();

  const tokenData = [
    {
      id: 1,
      name: "weth",
      icon: eth,
      borrowApy: PoolData?.borrowRate.weth.toString(),
      borrowed: OCData?.borrowAmounts?.weth.toString(),
    },
    {
      id: 2,
      name: "dai",
      icon: dai,
      borrowApy: PoolData?.borrowRate.dai.toString(),
      borrowed: OCData?.borrowAmounts?.dai.toString(),
    },
    {
      id: 3,
      name: "usdc",
      icon: usdc,
      borrowApy: PoolData?.borrowRate.usdc.toString(),
      borrowed: OCData?.borrowAmounts?.usdc.toString(),
    },
    {
      id: 4,
      name: "wbtc",
      icon: btc,
      borrowApy: PoolData?.borrowRate.wbtc.toString(),
      borrowed: OCData?.borrowAmounts?.wbtc.toString(),
    },
  ];
  return (
    <Card>
      <BorrowAssetTable
        tokenData={tokenData}
        isLoading={OCData ? false : true}
      />
    </Card>
  );
}

export default BorrowAsset;
