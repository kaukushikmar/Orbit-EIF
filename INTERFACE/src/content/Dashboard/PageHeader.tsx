import { Typography, Box } from "@mui/material";

function PageHeader() {
  return (
    <Box
      display="flex"
      alignItems={{ xs: "stretch", md: "center" }}
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Account Info
          </Typography>
          <Typography variant="subtitle2">
            Your overall position dashboard
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PageHeader;
