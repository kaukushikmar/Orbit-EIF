import { useContext } from "react";
import { SidebarContext } from "../../../contexts/SidebarContext";
import Scrollbar from "src/components/Scrollbar";
import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  lighten,
  darken,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

import SidebarMenu from "./SidebarMenu";
import orbitLogo from "@/public/icons/logo/mainlogo.svg";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import discord from "@/public/icons/logo/discord.svg";

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);

const StyledButton = styled(Button)`
  &:hover {
    background: none;
  }
`;

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: "none",
            lg: "inline-block",
          },
          position: "fixed",
          left: 0,
          top: 0,
          background:
            theme.palette.mode === "dark"
              ? alpha(lighten(theme.header.background, 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow:
            theme.palette.mode === "dark" ? theme.sidebar.boxShadow : "none",
        }}
      >
        <Scrollbar>
          <Box mt={3} ml={3} display="flex" alignItems="center">
            <Avatar src={orbitLogo} />
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
              sx={{ pl: "10px" }}
            >
              Orbit Labs
            </Typography>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <SidebarMenu />
        </Scrollbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginRight: "10px",
          }}
        >
          <Button
            href="https://t.co/UXI3SYgRNn"
            target="_blank"
            disableRipple
            component="a"
            startIcon={<img src={discord} />}
            sx={{ ":hover": { background: "none" } }}
          />
          <Button
            href="https://twitter.com/labs_orbit"
            target="_blank"
            disableRipple
            component="a"
            startIcon={<TwitterIcon />}
            sx={{ ":hover": { background: "none" } }}
          />
          <Button
            href="https://www.linkedin.com/company/88418741/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bt3V%2FBTgSSsy96O0bpffSDg%3D%3D"
            target="_blank"
            disableRipple
            component="a"
            startIcon={<LinkedInIcon />}
            sx={{ ":hover": { background: "none" } }}
          />
          <Button
            href="https://github.com/OrbitDeFi"
            target="_blank"
            disableRipple
            component="a"
            startIcon={<GitHubIcon />}
            sx={{ ":hover": { background: "none" } }}
          />
        </Box>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10],
          }}
        />
        <Box p={2}>
          <Button
            href="https://youtu.be/L7dyszc_jug"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="success"
            size="small"
            fullWidth
          >
            <YouTubeIcon sx={{ pr: "4px" }} /> Demo Video
          </Button>
        </Box>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
        }}
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === "dark"
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5),
          }}
        >
          <Box mt={3}>
            <Box
              mx={2}
              sx={{
                width: 70,
              }}
            >
              Orbit Labs
            </Box>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <SidebarMenu />
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
