// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography } from "@mui/material";

// project imports
import MainCard from "./MainCard";

// assets
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import FormatValue from "../FormatNumber";
import FormatNumber from "../FormatNumber/formatNumber";
import { ethers } from "ethers";

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

const HealthFactorCard = ({ isLoading = false, totalHealthFactor }) => {
  const theme = useTheme();

  const formattedHealthFactor = totalHealthFactor;
  let healthFactorColor = "";
  if (formattedHealthFactor >= ethers.utils.parseUnits("3", 18).toString()) {
    healthFactorColor = "#4CAF50";
  } else if (
    formattedHealthFactor < ethers.utils.parseUnits("1.1", 18).toString()
  ) {
    healthFactorColor = "#ff0000";
  } else {
    healthFactorColor = "#F89F1A";
  }

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
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
                    <Typography
                      sx={{
                        fontSize: "1.4rem",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      {totalHealthFactor === "10000000000000000000000" ? (
                        <AllInclusiveIcon
                          fontSize="large"
                          sx={{ color: "#4CAF50" }}
                        />
                      ) : (
                        <FormatValue
                          value={totalHealthFactor}
                          token={"hf"}
                          fixed={2}
                          sx={{ color: healthFactorColor }}
                          component="card"
                        />
                      )}{" "}
                      {/* TODO: add the current total data here */}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar>
                      <HealthAndSafetyIcon fontSize="inherit" />
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
                  Health Factor
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default HealthFactorCard;
