import { Card } from "@mui/material";
import SupplyAssetTable from "./SupplyAssetTable";

// icons to be used
import dai from "@/public/icons/tokens/dai.svg";
import btc from "@/public/icons/tokens/btc.svg";
import usdc from "@/public/icons/tokens/usdc.svg";
import eth from "@/public/icons/tokens/eth.svg";
import { useAppDataProvider } from "../../contexts/AppDataContext";
import { useEthers } from "@usedapp/core";
import { useBalance } from "@/hooks/useBalance";

function SupplyAsset() {
  const { account } = useEthers();
  const { OCData, PoolData } = useAppDataProvider();
  const balance = useBalance(account);
  const tokenData = [
    {
      id: 1,
      name: "weth",
      icon: eth,
      supplyApy: PoolData?.supplyRate.weth.toString(),
      supplied: OCData?.supplyAmounts?.weth.toString(),
      balance: balance[3] ?? "0",
    },
    {
      id: 2,
      name: "dai",
      icon: dai,
      supplyApy: PoolData?.supplyRate.dai.toString(),
      supplied: OCData?.supplyAmounts?.dai.toString(),
      balance: balance[1] ?? "0",
    },
    {
      id: 3,
      name: "usdc",
      icon: usdc,
      supplyApy: PoolData?.supplyRate.usdc.toString(),
      supplied: OCData?.supplyAmounts?.usdc.toString(),
      balance: balance[0] ?? "0",
    },
    {
      id: 4,
      name: "wbtc",
      icon: btc,
      supplyApy: PoolData?.supplyRate.wbtc.toString(),
      supplied: OCData?.supplyAmounts?.wbtc.toString(),
      balance: balance[2] ?? "0",
    },
  ];
  return (
    <Card>
      <SupplyAssetTable
        tokenData={tokenData}
        isLoading={OCData ? false : true}
      />
    </Card>
  );
}

export default SupplyAsset;
