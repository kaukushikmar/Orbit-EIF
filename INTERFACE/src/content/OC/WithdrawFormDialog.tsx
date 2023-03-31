import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputForm from "./InputForm";
import { useEffect, useRef, useState } from "react";
import { Alert, Box, Chip, CircularProgress } from "@mui/material";
import { useContractFunction, useEthers } from "@usedapp/core";
import { OCMarketContract } from "../../constants";
import tokenAddress from "../../constants/tokenAddress.json";
import { ethers } from "ethers";
import { useNotification } from "@web3uikit/core";
import { simulateTransaction } from "@/utils/tenderly";

interface TokenData {
  id: number;
  name: string;
  icon: any;
  supplyApy: string;
  supplied: string;
}

export default function SupplyFormDialog(prop: {
  open: boolean;
  handleClose: () => void;
  data: TokenData;
}) {
  const { open, handleClose, data } = prop;
  const { account } = useEthers();
  const [_amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useNotification();
  const [txStatus, setTxStatus] = useState("None");
  const amountRef = useRef<string>();
  const [txSuccess, setTxSuccess] = useState("-1");

  const handleChange = (value: string) => {
    amountRef.current = value;
    setAmount(value);
  };

  const { state, send } = useContractFunction(OCMarketContract, "withdraw", {
    transactionName: "Withdraw in OC market",
  });
  const [txn, setTxn] = useState<number | undefined>(0);
  const handleWithdraw = () => {
    setLoading(true);
    send(
      tokenAddress[data.name].address,
      ethers.utils.parseUnits(
        _amount.toString(),
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

  const { status } = state;
  useEffect(() => {
    setTxStatus(status);
    if (status === "Exception" || status === "Success") {
      setTxStatus("None");
    }
  }, [status]);

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

  // Simulation
  useEffect(() => {
    setTxSuccess("-1");
    _amount &&
      simulateTransaction(
        account,
        OCMarketContract,
        "borrow",
        tokenAddress[data.name].address,
        ethers.utils.parseUnits(
          _amount.toString(),
          tokenAddress[data.name].decimals
        ),
        account
      ).then((res) => setTxSuccess(res));
  }, [_amount]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Withdraw</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <InputForm onChange={handleChange} icon={data.icon} value={_amount} />
        </DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            onClick={handleWithdraw}
            variant="contained"
            size="large"
            sx={{ minHeight: "44px", m: 2 }}
            disabled={txSuccess === "-1"}
          >
            {loading && (
              <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />
            )}
            {txSuccess === "-1" && _amount && (
              <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />
            )}
            Withdraw
          </Button>
        </Box>
        <DialogContent>
          {txSuccess === "0x0" && (
            <Alert severity="error">Withdraw transaction will fail</Alert>
          )}
        </DialogContent>
        <DialogContent>
          <Button disabled={true} variant="contained">
            {`Withdraw Transaction Status: `}{" "}
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
