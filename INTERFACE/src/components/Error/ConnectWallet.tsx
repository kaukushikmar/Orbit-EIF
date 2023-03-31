import { Container, Typography, Paper } from "@mui/material";

import { ButtonThemed } from "../../theme/themedComponents/ButtonThemed";

function ConnectWallet({ connect }) {
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
            Please connect your wallet!
          </Typography>
          <Typography sx={{ mb: 6 }} color="text.secondary">
            Please connect your wallet to see your dashboard
          </Typography>
          <ButtonThemed onClick={() => connect()}>Connect wallet</ButtonThemed>
        </>
      </Paper>
    </Container>
  );
}

export default ConnectWallet;
