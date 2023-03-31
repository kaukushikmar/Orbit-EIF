import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import Link from "src/components/Link";

import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import polygon from "@/public/icons/networks/polygon.svg";
import ethereum from "@/public/icons/networks/ethereum.svg";

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(["color", "fill"])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <ListWrapper
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem button ref={ref} onClick={handleOpen}>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <Avatar src={ethereum} sx={{ mr: "10px" }} />
                  </Box>
                  <Typography variant="h4" component="h4" gutterBottom>
                    Ethereum Market
                  </Typography>
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </List>
      </ListWrapper>
      <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        <MenuItem sx={{ px: 3 }} component={Link} href="/">
          <Box display="flex" alignItems="center">
            <Avatar src={ethereum} sx={{ mr: "10px" }} />
          </Box>
          <Typography variant="h5" component="h4" gutterBottom>
            Ethereum Market
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{ px: 3 }}
          component={Link}
          href="https://mumbai.orbitlabs.space/"
          disabled
        >
          <Avatar src={polygon} sx={{ mr: "10px" }} />
          <Box sx={{ flexDirection: "column" }}>
            <Typography variant="h5" component="h4" gutterBottom>
              Polygon Market
            </Typography>
            <Typography variant="subtitle2">Coming soon</Typography>
          </Box>
        </MenuItem>
        {/* Shardeum test net */}
        {/* <MenuItem sx={{ px: 3 }} component={Link} href="/components/tabs">
          <Typography variant="h5" component="h4" gutterBottom>
            Shardeum Market
          </Typography>
        </MenuItem> */}
      </Menu>
    </>
  );
}

export default HeaderMenu;
