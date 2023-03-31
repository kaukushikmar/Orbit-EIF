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
} from "@mui/material";
import FaucetDialog from "./FaucetDialog";

// @todo
interface TokenData {
  id: number;
  name: string;
  icon: any;
  balance: string;
}

interface SupplyAssetTableProps {
  className?: string;
  tokenData: TokenData[];
  isLoading?: boolean;
}

const SupplyAssetTable: FC<SupplyAssetTableProps> = ({
  tokenData,
  isLoading,
}) => {
  //   console.log("🚀 ~ file: AssetListTable.tsx:40 ~ tokenData", tokenData);
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

  return (
    <Card>
      {<CardHeader title="Supply Assets" />}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell>Wallet balance</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokenData.map((token) => {
              return (
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
                        {token.name.toUpperCase()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{token.balance}</TableCell>
                  <TableCell align="right">
                    <Button
                      sx={{ mt: { xs: 2, md: 0 } }}
                      variant="contained"
                      onClick={() => handleClickOpenSupply(token)}
                      size={"small"}
                    >
                      Faucet
                    </Button>
                    <FaucetDialog
                      open={openSupply}
                      handleClose={handleClose}
                      data={data}
                    />
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
