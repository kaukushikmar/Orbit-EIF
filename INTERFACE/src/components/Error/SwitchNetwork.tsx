import { Container, Typography, Paper } from "@mui/material";

function SwitchNetwork() {
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
            Please use Goerli testnet !
          </Typography>
        </>
      </Paper>
    </Container>
  );
}

export default SwitchNetwork;
