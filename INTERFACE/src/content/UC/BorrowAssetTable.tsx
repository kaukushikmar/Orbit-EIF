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
import BorrowFormDialog from "./BorrowFormDialog";
import PaybackFormDialog from "./PaybackFormDialog";
import FormatValue from "@/components/FormatNumber";

// @todo
interface TokenData {
  id: number;
  name: string;
  icon: any;
  borrowApy: string;
  borrowed: string;
}

interface BorrowAssetTableProps {
  className?: string;
  tokenData: TokenData[];
  isLoading?: boolean;
  tab: string;
  tokenId: string;
}

const BorrowAssetTable: FC<BorrowAssetTableProps> = ({
  tokenData,
  isLoading,
  tab,
  tokenId,
}) => {
  // @note modal variables for supply and withdraw
  const [openBorrow, setOpenBorrow] = useState(false);
  const [openPayback, setOpenPayback] = useState(false);

  // @note data is token wise data that is fetched
  const [data, setData] = useState<TokenData>({} as TokenData);

  const handleClickOpenBorrow = (data: TokenData) => {
    setOpenBorrow(true);
    setData(data);
  };

  const handleClickOpenPayback = (data: TokenData) => {
    setOpenPayback(true);
    setData(data);
  };

  const handleClose = () => {
    setOpenBorrow(false);
    setOpenPayback(false);
  };

  return (
    <Card>
      {<CardHeader title="Borrow Assets" />}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell>Borrow APY</TableCell>
              <TableCell>Amount Borrowed</TableCell>
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
                      <FormatValue value={token.borrowApy} token={"apy"} />%
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
                          value={token.borrowed}
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
                      onClick={() => handleClickOpenBorrow(token)}
                      size={"small"}
                    >
                      Borrow
                    </Button>
                    {openBorrow && (
                      <BorrowFormDialog
                        open={openBorrow}
                        handleClose={handleClose}
                        data={data}
                        tab={tab}
                        tokenId={tokenId}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: "0px", paddingRight: "5px" }}>
                    <Button
                      sx={{ mt: { xs: 2, md: 0 } }}
                      variant="outlined"
                      onClick={() => handleClickOpenPayback(token)}
                      size={"small"}
                    >
                      Payback
                    </Button>
                    {openPayback && (
                      <PaybackFormDialog
                        open={openPayback}
                        handleClose={handleClose}
                        data={data}
                        tab={tab}
                        tokenId={tokenId}
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
                      onClick={() => handleClickOpenBorrow(token)}
                      size={"small"}
                    >
                      Borrow
                    </Button>
                    {openBorrow && (
                      <BorrowFormDialog
                        open={openBorrow}
                        handleClose={handleClose}
                        data={data}
                        tab={tab}
                        tokenId={tokenId}
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      sx={{ mt: { xs: 2, md: 0 } }}
                      variant="outlined"
                      onClick={() => handleClickOpenPayback(token)}
                      size={"small"}
                    >
                      Payback
                    </Button>
                    {openPayback && (
                      <PaybackFormDialog
                        open={openPayback}
                        handleClose={handleClose}
                        data={data}
                        tab={tab}
                        tokenId={tokenId}
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

BorrowAssetTable.propTypes = {
  tokenData: PropTypes.array.isRequired,
};

BorrowAssetTable.defaultProps = {
  tokenData: [],
};

export default BorrowAssetTable;
