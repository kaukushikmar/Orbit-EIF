import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

function PageHeaderPositions({ WalletOpen, tokenId }) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          NFT Position
        </Typography>
        <Typography variant="subtitle2">
          Your position in NFT Token id: {tokenId}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={() => WalletOpen(true)}
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
        >
          NFT Wallet
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeaderPositions;
