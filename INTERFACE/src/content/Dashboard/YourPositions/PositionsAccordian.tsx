/* eslint-disable react/jsx-key */
import SidebarLayout from "@/layouts/SidebarLayout";
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
import SinglePosition from "./SinglePosition";

function PositionsAccordian({ nftData }) {
  return (
    <>
      <CardContent>
        {nftData && nftData.map((data) => <SinglePosition data={data} />)}
      </CardContent>
    </>
  );
}

PositionsAccordian.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default PositionsAccordian;
