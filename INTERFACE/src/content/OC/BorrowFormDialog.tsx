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
import { OCMarketContract } from "../../constants";
import tokenAddress from "../../constants/tokenAddress.json";
import { BigNumber, ethers } from "ethers";
import { useNotification } from "@web3uikit/core";
import { ToolTip } from "@/components/ToolTip/approveToolTip";
import { simulateTransaction } from "@/utils/tenderly";

interface TokenData {
  id: number;
  name: string;
  icon: any;
  borrowApy: string;
  borrowed: string;
}

export default function BorrowFormDialog(prop: {
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
  const [txSuccess, setTxSuccess] = useState("-1");

  const handleChange = (value: string) => {
    amountRef.current = value;
    setAmount(value);
  };

  const { state, send } = useContractFunction(OCMarketContract, "borrow", {
    transactionName: "Borrow in OC market",
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

  const handleBorrow = () => {
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

  useEffect(() => {
    setTxStatus(status);
    if (status === "Exception" || status === "Success") {
      setTxStatus("None");
    }
  }, [status]);

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
        <DialogTitle>Borrow</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <InputForm onChange={handleChange} icon={data.icon} value={_amount} />
        </DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            onClick={handleBorrow}
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
            Borrow
          </Button>
        </Box>
        <DialogContent>
          {txSuccess === "0x0" && (
            <Alert severity="error">Borrow transaction will fail</Alert>
          )}
        </DialogContent>
        <DialogContent>
          <Button disabled={true} variant="contained">
            {`Borrow Transaction Status: `}{" "}
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
