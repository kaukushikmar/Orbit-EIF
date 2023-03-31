import { FC, ChangeEvent, useState } from "react";
import PropTypes from "prop-types";
import {
  Divider,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  CardHeader,
  Avatar,
  CircularProgress,
  Button,
  LinearProgress,
} from "@mui/material";
import SupplyFormDialog from "./SupplyFormDialog";
import WithdrawFormDialog from "./WithdrawFormDialog";
import formatValue from "@/components/FormatNumber";
import FormatValue from "@/components/FormatNumber";

// @todo
interface TokenData {
  id: number;
  name: string;
  icon: any;
  supplyApy: string;
  supplied: string;
  balance: string;
}

interface SupplyAssetTableProps {
  className?: string;
  tokenData: TokenData[];
  isLoading?: boolean;
}

const SupplyAssetTable: FC<SupplyAssetTableProps> = ({
  tokenData,
  isLoading = false,
}) => {
  // console.log("🚀 ~ file: SupplyAssetTable.tsx:45 ~ tokenData", tokenData);
  // @note modal variables for supply and withdraw
  const [openSupply, setOpenSupply] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);

  // @note data is token wise data that is fetched
  const [data, setData] = useState<TokenData>({} as TokenData);

  const handleClickOpenSupply = (data: TokenData) => {
    setOpenSupply(true);
    setData(data);
  };

  const handleClickOpenWithdraw = (data: TokenData) => {
    setOpenWithdraw(true);
    setData(data);
  };

  const handleClose = () => {
    setOpenSupply(false);
    setOpenWithdraw(false);
  };

  // console.log(`token data: ${tokenData[2].supplied}`);

  return (
    <Card>
      {<CardHeader title="Supply Assets" />}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell>Supply APY</TableCell>
              <TableCell>Amount Supplied</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokenData.map((token) => {
              return !isLoading ? (
                <TableRow hover key={token.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar src={token.icon} />
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        sx={{ pl: "10px" }}
                      >
                        {token.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      <FormatValue value={token.supplyApy} token={"apy"} />%
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        <FormatValue
                          value={token.supplied}
                          token={token.name}
                        />{" "}
                        {token.name.toUpperCase()}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    <Button
                      sx={{ mt: { xs: 2, md: 0 } }}
                      variant="contained"
                      onClick={() => handleClickOpenSupply(token)}
                      size={"small"}
                    >
                      Supply
                    </Button>
                    {openSupply && (
                      <SupplyFormDialog
                        open={openSupply}
                        handleClose={handleClose}
                        data={data}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: "0px", paddingRight: "5px" }}>
                    <Button
                      sx={{ mt: { xs: 2, md: 0 } }}
                      variant="outlined"
                      onClick={() => handleClickOpenWithdraw(token)}
                      size={"small"}
                    >
                      Withdraw
                    </Button>
                    {openWithdraw && (
                      <WithdrawFormDialog
                        open={openWithdraw}
                        handleClose={handleClose}
                        data={data}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow hover key={token.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar src={token.icon} />
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        sx={{ pl: "10px" }}
                      >
                        {token.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      <LinearProgress />
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <LinearProgress />
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      sx={{ mt: { xs: 2, md: 0 } }}
                      variant="contained"
                      onClick={() => handleClickOpenSupply(token)}
                      size={"small"}
                    >
                      Supply
                    </Button>
                    {openSupply && (
                      <SupplyFormDialog
                        open={openSupply}
                        handleClose={handleClose}
                        data={data}
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      sx={{ mt: { xs: 2, md: 0 } }}
                      variant="outlined"
                      onClick={() => handleClickOpenWithdraw(token)}
                      size={"small"}
                    >
                      Withdraw
                    </Button>
                    {openWithdraw && (
                      <WithdrawFormDialog
                        open={openWithdraw}
                        handleClose={handleClose}
                        data={data}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

SupplyAssetTable.propTypes = {
  tokenData: PropTypes.array.isRequired,
};

SupplyAssetTable.defaultProps = {
  tokenData: [],
};

export default SupplyAssetTable;
