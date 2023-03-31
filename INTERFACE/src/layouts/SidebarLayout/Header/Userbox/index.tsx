import { useRef, useState, useEffect } from "react";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  Popover,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import { useEthers, useContractFunction } from "@usedapp/core";
import { ButtonThemed } from "../../../../theme/themedComponents/ButtonThemed";

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

function HeaderUserbox() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const { activateBrowserWallet, account, deactivate } = useEthers();
  const [hasMetamask, setHasMetamask] = useState(false);
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });
  async function connect() {
    await activateBrowserWallet();
  }

  async function disconnect() {
    await deactivate();
  }

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        {/* Don't need avatar */}
        <Avatar
          variant="rounded"
          src={`https://avatars.dicebear.com/api/adventurer-neutral/${account}.svg`}
        />
        <Hidden mdDown>
          <UserBoxText>
            {account ? (
              <UserBoxLabel variant="body1">
                {account.slice(0, 5) + "..." + account.slice(39, 42)}
              </UserBoxLabel>
            ) : (
              <ButtonThemed onClick={connect}>Connect wallet</ButtonThemed>
            )}
          </UserBoxText>
        </Hidden>
        {account && (
          <Hidden smDown>
            <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
          </Hidden>
        )}
      </UserBoxButton>
      {account ? (
        <Popover
          anchorEl={ref.current}
          onClose={handleClose}
          open={isOpen}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuUserBox sx={{ minWidth: 210 }} display="flex">
            <UserBoxText>
              {account ? (
                <UserBoxLabel variant="body1">
                  {account.slice(0, 10) + "..." + account.slice(35, 42)}
                </UserBoxLabel>
              ) : (
                <></>
              )}
            </UserBoxText>
          </MenuUserBox>
          <Divider sx={{ mb: 0 }} />
          <Box sx={{ m: 1 }}>
            <Button color="primary" fullWidth onClick={disconnect}>
              <LockOpenTwoToneIcon sx={{ mr: 1 }} />
              Sign out
            </Button>
          </Box>
        </Popover>
      ) : (
        <></>
      )}
    </>
  );
}

export default HeaderUserbox;
