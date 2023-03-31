// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, CircularProgress, Grid, Typography } from "@mui/material";

// project imports
import MainCard from "./MainCard";

// assets
import ArrowUpwardIcon from "@mui/icons-material/ArrowDownward";
import FormatValue from "../FormatNumber";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -85,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));

const BorrowCard = ({ isLoading = false, totalBorrowUsd }) => {
  const theme = useTheme();

  return (
    <>
      <CardWrapper // @ts-ignore
        border={false}
        content={false}
        sx={{ background: `${theme.colors.alpha.black[5]}` }}
      >
        <Box sx={{ p: 2.25, background: `${theme.colors.alpha.black[5]}` }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  {isLoading ? (
                    <CircularProgress sx={{ mr: "30px" }} />
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "1.4rem",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      <FormatValue
                        value={totalBorrowUsd}
                        token={""}
                        component="card"
                      />{" "}
                      $
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  <Avatar>
                    <ArrowUpwardIcon fontSize="inherit" />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                Total Borrow
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

export default BorrowCard;
