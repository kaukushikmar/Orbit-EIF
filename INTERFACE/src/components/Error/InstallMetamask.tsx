import { Container, Typography, Paper } from "@mui/material";

function InstallMetamask() {
  return (
    <Container sx={{ p: "55px" }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 4,
          flex: 1,
        }}
      >
        <>
          <Typography variant="h3" component="h3" gutterBottom>
            Please install Metamask!
          </Typography>
        </>
      </Paper>
    </Container>
  );
}

export default InstallMetamask;
