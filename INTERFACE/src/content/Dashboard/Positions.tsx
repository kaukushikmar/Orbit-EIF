import Head from "next/head";
import SidebarLayout from "@/layouts/SidebarLayout";

import PageTitle from "@/components/PageTitle";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  styled,
  Avatar,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUCDataProvider } from "@/contexts/UCDataContext";
import PositionsAccordian from "./YourPositions/PositionsAccordian";
import LinearProgress from "@mui/material/LinearProgress";

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

function Positions() {
  const { UCData } = useUCDataProvider();
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Your Positions NFT" />
            <Divider />
            {/* 1st way */}
            {UCData?.nftDatas ? (
              <PositionsAccordian nftData={UCData?.nftDatas} />
            ) : (
              <CardContent>
                <LinearProgress sx={{ mb: "15px" }} color="secondary" />
              </CardContent>
            )}

            {/* 2nd way */}
            {/* <List>
              <ListItem sx={{ p: 3 }}>
                <ListItemAvatar sx={{ pr: 2 }}>
                  <AvatarWrapper src="/static/images/logo/google.svg" />
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "h5",
                    gutterBottom: true,
                  }}
                  secondaryTypographyProps={{
                    variant: "subtitle2",
                    lineHeight: 1,
                  }}
                  primary="Google"
                  secondary="A Google account hasn’t been yet added to your account"
                />
                <Button color="secondary" size="large" variant="contained">
                  Connect
                </Button>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem sx={{ p: 3 }}>
                <ListItemAvatar sx={{ pr: 2 }}>
                  <AvatarWrapper src="/static/images/logo/google.svg" />
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "h5",
                    gutterBottom: true,
                  }}
                  secondaryTypographyProps={{
                    variant: "subtitle2",
                    lineHeight: 1,
                  }}
                  primary="Google"
                  secondary="A Google account hasn’t been yet added to your account"
                />
                <Button color="secondary" size="large" variant="contained">
                  Connect
                </Button>
              </ListItem>
            </List> */}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

Positions.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Positions;
