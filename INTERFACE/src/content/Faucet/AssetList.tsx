import { Card } from "@mui/material";
import SupplyAssetTable from "./AssetListTable";

// icons to be used
import dai from "@/public/icons/tokens/dai.svg";
import btc from "@/public/icons/tokens/btc.svg";
import usdc from "@/public/icons/tokens/usdc.svg";
import eth from "@/public/icons/tokens/eth.svg";
import { useAppDataProvider } from "../../contexts/AppDataContext";
import { useBalance } from "@/hooks/useBalance";
import { useEthers } from "@usedapp/core";

function AssetList() {
  const { account } = useEthers();
  const balance = useBalance(account);
  //   console.log("🚀 ~ file: AssetList.tsx:16 ~ AssetList ~ balance", balance);

  const tokenData = [
    {
      id: 1,
      name: "weth",
      icon: eth,
      balance: balance[3] ?? "0",
    },
    {
      id: 2,
      name: "dai",
      icon: dai,
      balance: balance[1] ?? "0",
    },
    {
      id: 3,
      name: "usdc",
      icon: usdc,
      balance: balance[0] ?? "0",
    },
    {
      id: 4,
      name: "wbtc",
      icon: btc,
      balance: balance[2] ?? "0",
    },
  ];
  return (
    <Card>
      <SupplyAssetTable tokenData={tokenData} isLoading={false} />
    </Card>
  );
}

export default AssetList;
