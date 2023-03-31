import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputForm from "./InputForm";
import { useEffect, useRef, useState } from "react";
import { Alert, AlertTitle, Box, Chip, CircularProgress } from "@mui/material";
import { useContractFunction, useEthers } from "@usedapp/core";
import {
  deployedAddress,
  OCMarketContract,
  USDCContract,
} from "../../constants";
import tokenAddress from "../../constants/tokenAddress.json";
import { BigNumber, ethers } from "ethers";
import { useNotification } from "@web3uikit/core";
import { FaucetContract } from "../../constants";
import { ToolTip } from "@/components/ToolTip/approveToolTip";

interface TokenData {
  id: number;
  name: string;
  icon: any;
}

export default function FaucetDialog(prop: {
  open: boolean;
  handleClose: () => void;
  data: TokenData;
}) {
  const { open, handleClose, data } = prop;
  const { account } = useEthers();
  const [_amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const amountRef = useRef<string>();
  const dispatch = useNotification();
  const [txStatus, setTxStatus] = useState("None");

  const handleChange = (value: string) => {
    amountRef.current = value;
    setAmount(value);
  };

  const { state, send } = useContractFunction(FaucetContract, "mint", {
    transactionName: "Faucet",
  });
  const { status } = state;
  const [txn, setTxn] = useState<number | undefined>(2);

  const handleNewNotification = (status) => {
    const type = status === 1 ? "success" : "error";
    const message =
      status === 1 ? "Transaction Completed" : "Transaction Failed";
    dispatch({
      type: `${type}`,
      message: `${message}`,
      title: "Transaction Notification",
      position: "topR",
    });
  };

  function getAmount(token) {
    if (token === "usdc") return "10000";
    else if (token === "wbtc") return "5";
    else if (token === "weth") return "10";
    else if (token === "dai") return "10000";
    else return "10000";
  }

  const handleSupply = () => {
    setLoading(true);
    send(
      tokenAddress[data.name].address,
      ethers.utils.parseUnits(
        getAmount(data.name),
        tokenAddress[data.name].decimals
      ),
      account
    ).then((val) => {
      setTxn(val?.status);
      setLoading(false);
      handleNewNotification(val?.status);
      handleClose();
    });
  };

  useEffect(() => {
    setTxStatus(status);
    if (status === "Exception" || status === "Success") {
      setTxStatus("None");
    }
  }, [status]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Faucet</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <InputForm
            onChange={handleChange}
            icon={data.icon}
            amount={getAmount(data.name)}
          />
        </DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            onClick={handleSupply}
            variant="contained"
            size="large"
            sx={{ minHeight: "44px", m: 2 }}
          >
            {loading && (
              <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />
            )}
            Faucet
          </Button>
        </Box>
        <DialogContent>
          <Button disabled={true} variant="contained">
            {`Transaction Status: `}{" "}
            <Chip
              color={txStatus === "Mining" ? "warning" : "primary"}
              label={txStatus}
              sx={{ ml: "5px" }}
              variant="outlined"
            />
            {/* <Box sx={{p}}>{txStatus}</Box> */}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
