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
import {
  deployedAddress,
  ERC20Interface,
  NFTManagerContract,
  OCMarketContract,
  USDCContract,
} from "../../constants";
import tokenAddress from "../../constants/tokenAddress.json";
import { useNotification } from "@web3uikit/core";
import { BigNumber, Contract, ethers } from "ethers";
import { aaveInteractor } from "@/constants/aaveCallData";
import { useApprovalAllowance } from "@/hooks/useApprovalAllowance";
import { ToolTip } from "@/components/ToolTip/approveToolTip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { simulateTransaction } from "@/utils/tenderly";

interface TokenData {
  id: number;
  name: string;
  icon: any;
  borrowApy: string;
  borrowed: string;
}

export default function PaybackFormDialog(prop: {
  open: boolean;
  handleClose: () => void;
  data: TokenData;
  tab: string;
  tokenId: string;
}) {
  const { open, handleClose, data, tab, tokenId } = prop;
  const { account } = useEthers();
  const [_amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const amountRef = useRef<string>();

  const dispatch = useNotification();
  const [approvalLoading, setApprovalLoading] = useState<boolean>(true);
  const [checkingApproval, setCheckApproval] = useState<boolean>(true);
  const [txStatus, setTxStatus] = useState("None");
  let approvalAllowance = BigNumber.from("0");
  const [txSuccess, setTxSuccess] = useState("-1");

  useEffect(() => {
    setApprovalLoading(false);
  }, [approvalAllowance]);

  useEffect(() => {
    if (
      _amount &&
      !ethers.utils
        .parseUnits(_amount.toString(), tokenAddress[data.name].decimals)
        .gt(approvalAllowance)
    ) {
      setCheckApproval(false);
    } else {
      setCheckApproval(true);
    }
  }, [_amount, checkingApproval]);

  approvalAllowance = useApprovalAllowance(
    tokenAddress[data.name].address,
    account,
    deployedAddress.NFTManager
  );

  const handleChange = (value: string) => {
    amountRef.current = value;
    setAmount(value);
  };

  const { state, send } = useContractFunction(
    NFTManagerContract,
    tab === "aave" ? "useAave" : "supplyToLiquidityPool",
    {
      transactionName: tab === "aave" ? "Payback in aave" : "Payback to wallet",
    }
  );
  const { status } = state;
  const [txn, setTxn] = useState<number | undefined>(2);

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

  const handlePayback = () => {
    setLoading(true);
    const aavePaybackCallData = aaveInteractor(
      "payback",
      tokenAddress[data.name].address,
      ethers.utils
        .parseUnits(_amount.toString(), tokenAddress[data.name].decimals)
        .toString()
    );
    tab === "aave"
      ? send(tokenId, aavePaybackCallData).then((val) => {
          setTxn(val?.status);
          setLoading(false);
          handleNewNotification(val?.status);
          handleClose();
        })
      : send(
          tokenId,
          tokenAddress[data.name].address,
          ethers.utils.parseUnits(
            _amount.toString(),
            tokenAddress[data.name].decimals
          )
        ).then((val) => {
          setTxn(val?.status);
          setLoading(false);
          handleNewNotification(val?.status);
          handleClose();
        });
  };

  const params =
    tab === "aave"
      ? [
          tokenId,
          _amount &&
            aaveInteractor(
              "payback",
              tokenAddress[data.name].address,
              ethers.utils
                .parseUnits(
                  _amount.toString(),
                  tokenAddress[data.name].decimals
                )
                .toString()
            ),
        ]
      : [
          tokenId,
          tokenAddress[data.name].address,
          _amount &&
            ethers.utils.parseUnits(
              _amount.toString(),
              tokenAddress[data.name].decimals
            ),
        ];

  // Simulation
  useEffect(() => {
    setTxSuccess("-1");
    _amount &&
      simulateTransaction(
        account,
        NFTManagerContract,
        tab === "aave" ? "useAave" : "supplyToLiquidityPool",
        ...params
      ).then((res) => setTxSuccess(res));
  }, [_amount]);

  const tokenContract = new Contract(
    tokenAddress[data.name].address,
    ERC20Interface
  );
  const { state: State, send: Send } = useContractFunction(
    tokenContract,
    "approve",
    {
      transactionName: "Approval transaction",
    }
  );
  const handleApproval = () => {
    Send(
      deployedAddress.NFTManager,
      ethers.utils.parseUnits(
        _amount.toString(),
        tokenAddress[data.name].decimals
      )
    ).then((val) => {
      setTxn(val?.status);
      setLoading(false);
      handleNewNotification(val?.status);
      handleChange("0");
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Payback</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <InputForm onChange={handleChange} icon={data.icon} value={_amount} />
        </DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {tab !== "aave" ? (
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
          ) : (
            <></>
          )}
          <Button
            onClick={handlePayback}
            variant="contained"
            size="large"
            sx={{ minHeight: "44px", m: 2 }}
            disabled={
              tab !== "aave" &&
              (approvalLoading === true || checkingApproval === true)
            }
          >
            {loading && (
              <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />
            )}
            {txSuccess === "-1" && _amount && (
              <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />
            )}
            Payback
          </Button>
        </Box>
        <DialogContent>
          {txSuccess === "0x0" && checkingApproval === false && (
            <Alert severity="error">Payback transaction will fail</Alert>
          )}
        </DialogContent>
        <DialogContent>
          <Button disabled={true} variant="contained">
            {`Payback Transaction Status: `}{" "}
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
