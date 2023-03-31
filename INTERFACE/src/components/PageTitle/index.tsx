import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

function PageHeader({ headText, bodyText = "" }) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {headText}
        </Typography>
        <Typography variant="subtitle2">{bodyText}</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
