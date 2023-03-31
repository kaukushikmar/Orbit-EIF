// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

// project imports
import MainCard from "./MainCard";

// assets
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
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

const TotalApyCard = ({ isLoading = false, OCApy, UCApy }) => {
  const theme = useTheme();

  return (
    <>
      <CardWrapper // @ts-ignore
        border={false}
        content={false}
        sx={{
          background: `${theme.colors.alpha.black[5]}`,
        }}
      >
        <Box
          sx={{
            p: 2.25,
            background: `${theme.colors.alpha.black[5]}`,
          }}
        >
          <Grid container direction="column" sx={{ minHeight: "100%" }}>
            <Grid item sx={{ display: "flex", flexDirection: "row" }}>
              <Grid
                container
                alignItems="center"
                display="flex"
                direction="column"
              >
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: 500,
                      mr: 1,
                      mt: 1.75,
                      mb: 0.75,
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress sx={{ mr: "30px" }} />
                    ) : (
                      <FormatValue
                        value={OCApy}
                        token={"apy"}
                        fixed={3}
                        component="card"
                      />
                    )}
                    %{/* TODO: add the current total data here */}
                    {/* TODO: add the current total data here */}
                  </Typography>
                </Grid>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  OC APY
                </Typography>
              </Grid>
              <Divider orientation="vertical" />
              <Grid
                container
                alignItems="center"
                sx={{ ml: "10px" }}
                display="flex"
                direction="column"
              >
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: 500,
                      mr: 1,
                      mt: 1.75,
                      mb: 0.75,
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress sx={{ mr: "30px" }} />
                    ) : (
                      <FormatValue
                        value={UCApy}
                        token={"apy"}
                        fixed={3}
                        component="card"
                      />
                    )}
                    %{/* TODO: add the current total data here */}
                  </Typography>
                </Grid>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  UC APY
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

export default TotalApyCard;
