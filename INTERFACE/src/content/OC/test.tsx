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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useApprovalAllowance } from "@/hooks/useApprovalAllowance";
import { ToolTip } from "@/components/ToolTip/approveToolTip";

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
  // console.log("🚀 ~ file: SupplyFormDialog.tsx:37 ~ data", data);
  const { account } = useEthers();
  const [_amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const amountRef = useRef<string>();
  const dispatch = useNotification();
  const [approvalLoading, setApprovalLoading] = useState<boolean>(true);
  const [checkingApproval, setCheckApproval] = useState<boolean>(true);
  const [txStatus, setTxStatus] = useState("None");
  let approvalAllowance = BigNumber.from("0");

  useEffect(() => {
    setApprovalLoading(false);
  }, [approvalAllowance]);

  useEffect(() => {
    if (_amount && !BigNumber.from(_amount).gt(approvalAllowance)) {
      setCheckApproval(false);
    } else {
      setCheckApproval(true);
    }
  }, [_amount, checkingApproval]);

  approvalAllowance = useApprovalAllowance(
    tokenAddress[data.name].address,
    account,
    deployedAddress.OCMarket
  );
  // console.log(
  //   "🚀 ~ file: SupplyFormDialog.tsx:47 ~ approvalAllowance",
  //   approvalAllowance.toString()
  // );

  const handleChange = (value: string) => {
    amountRef.current = value;
    setAmount(value);
  };

  const { state, send } = useContractFunction(OCMarketContract, "supply", {
    transactionName: "supply in OC market",
  });
  const { status } = state;
  const [txn, setTxn] = useState<number | undefined>(2);

  useEffect(() => {
    setTxStatus(status);
    if (status === "Exception" || status === "Success") {
      setTxStatus("None");
    }
  }, [status]);

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
    });
  };

  const handleSupply = () => {
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
      handleNewNotification();
      handleClose();
    });
  };

  const { state: State, send: Send } = useContractFunction(
    USDCContract,
    "approve",
    {
      transactionName: "approve in OC market",
    }
  );
  const handleApproval = () => {
    Send(deployedAddress.LiquidityPool, ethers.utils.parseEther("100000")).then(
      (val) => {
        setTxn(val?.status);
        setLoading(false);
        handleNewNotification();
        handleClose();
      }
    );
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Supply</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <InputForm onChange={handleChange} icon={data.icon} />
        </DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            onClick={handleApproval}
            variant="contained"
            size="large"
            sx={{ minHeight: "44px", mx: 2 }}
            disabled={approvalLoading === true || checkingApproval !== true}
          >
            {approvalLoading && (
              <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />
            )}
            Approve {"  "}
            <ToolTip
              description={
                "To continue, you need to grant Orbit smart contracts permission to move your funds from your wallet. Depending on the asset and wallet you use, it is done by signing the permission message (gas free), or by submitting an approval transaction (requires gas). "
              }
            >
              <InfoOutlinedIcon sx={{ ml: "5px" }} />
            </ToolTip>
          </Button>
          <Button
            onClick={handleSupply}
            variant="contained"
            size="large"
            sx={{ minHeight: "44px", m: 2 }}
            disabled={approvalLoading === true || checkingApproval === true}
          >
            {loading && (
              <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />
            )}
            Supply
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
