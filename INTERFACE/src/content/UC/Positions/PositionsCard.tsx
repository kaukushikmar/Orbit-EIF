import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Radio,
  FormControlLabel,
  Typography,
  Card,
  CardHeader,
  Divider,
  lighten,
  CardActionArea,
  CardContent,
  Tooltip,
  IconButton,
  Avatar,
  styled,
  Button,
  Modal,
  Chip,
  CircularProgress,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import NftPosition from "./NftPosition";
import Link from "next/link";
import { BigNumber, ethers } from "ethers";
import {
  UserAmountData,
  PriceInEth,
  PoolData,
} from "../../../contexts/AppDataContext";
import { useContractFunction, useEthers } from "@usedapp/core";
import factoryAbi from "../../../constants/abi/factory.json";

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardLogo = styled("img")(
  ({ theme }) => `
      border: 1px solid ${theme.colors.alpha.black[30]};
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(1)};
      margin-right: ${theme.spacing(2)};
      background: ${theme.colors.alpha.white[100]};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        box-shadow: none;
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[100]};
        }
`
);

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);

const CardCc = styled(Card)(
  ({ theme }) => `
     border: 1px solid ${theme.colors.alpha.black[30]};
     background: ${theme.colors.alpha.black[5]};
     box-shadow: none;
`
);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NftData = [
  {
    // image: set it here
    tokenId: "1342",
    apy: "1.9%",
    totalSupply: "500", //@note in dollar
    totalBorrow: "500",
    orbitFactor: 1.65,
    aaveHF: 1.9,
    totalBorrowAllowed: "900",
  },
  {
    // image: set it here
    tokenId: "1234",
    apy: "1.9%",
    totalSupply: "500", //@note in dollar
    totalBorrow: "500",
    orbitFactor: 1.65,
    aaveHF: 1.9,
    totalBorrowAllowed: "900",
  },
];

interface Capsuledata {
  tokenId: BigNumber;
  wallet: string;
  supplyAmounts: UserAmountData;
  borrowAmounts: UserAmountData;
  holdAmounts: UserAmountData;
  aaveSupplyAmounts: UserAmountData;
  aaveBorrowAmounts: UserAmountData;
  totalSupplyInUsd: BigNumber;
  totalBorrowInUsd: BigNumber;
  totalHoldInUsd: BigNumber;
  totalAaveSupplyInUsd: BigNumber;
  totalAaveBorrowInUsd: BigNumber;
  netApy: BigNumber;
  healthFactor: BigNumber;
  aaveHealthFactor: BigNumber;
}

function PositionsCard({ capsuleData }: { capsuleData: any }) {
  const { account } = useEthers();
  const data = {
    savedCards: 7,
  };

  const [selectedValue, setSelectedValue] = useState("a");
  const [txStatus, setTxStatus] = useState("None");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const FACTORY_ADDR = "0x397897D80aA543C8dA83ACD6098485f9FB2d8eB9";
  const Factory = new ethers.Contract(FACTORY_ADDR, factoryAbi.abi);

  const { state, send } = useContractFunction(Factory, "mint", {});
  const handleMint = () => {
    send(account).then((val) => console.log(val));
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  // console.log(`Capsule data: ${capsuleData}`);
  const { status } = state;
  useEffect(() => {
    setTxStatus(status);
    if (status === "Exception" || status === "Success") {
      setTxStatus("None");
    }
  }, [status]);

  return (
    <Card>
      <CardHeader title={<Typography variant="h3">Positions</Typography>} />
      <Divider />
      <Box p={3} data-tut="uc-positions">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Tooltip arrow title="Add a new position">
              <CardAddAction onClick={handleMint}>
                <CardActionArea sx={{ px: 1 }}>
                  <CardContent>
                    <AvatarAddWrapper>
                      <AddTwoToneIcon fontSize="large" />
                    </AvatarAddWrapper>
                  </CardContent>
                </CardActionArea>
              </CardAddAction>
            </Tooltip>
          </Grid>
          {capsuleData &&
            capsuleData.map((capsule: Capsuledata) => (
              // eslint-disable-next-line react/jsx-key
              <NftPosition NftData={capsule} />
            ))}
        </Grid>
      </Box>
      {txStatus !== "None" && (
        <div>
          <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h1"
                sx={{ mb: "15px" }}
              >
                <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />
                Minting position...
              </Typography>
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
            </Box>
          </Modal>
        </div>
      )}
    </Card>
  );
}

export default PositionsCard;
