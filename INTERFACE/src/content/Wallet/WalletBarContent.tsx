import FormatValue from "@/components/FormatNumber";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  styled,
} from "@mui/material";
import dai from "@/public/icons/tokens/dai.svg";
import btc from "@/public/icons/tokens/btc.svg";
import usdc from "@/public/icons/tokens/usdc.svg";
import eth from "@/public/icons/tokens/eth.svg";

// @note Nothing to fetch, just pass all the details from the positions page

// @todo use color from theme: currently overriding
const MeetingBox = styled(Box)(
  ({ theme }) => `
          margin: ${theme.spacing(2)} 0;
          border-radius: ${theme.general.borderRadius};
          padding: ${theme.spacing(2)};
            border: 0.5px solid #8C7CF0;
          '&:hover': {
            background-color: colors.alpha.black[5],
            color: colors.alpha.black[100]
          }
    `
);

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
        width: 400px;
  `
);

// @todo asset details will be passed in this: no need to refetch for this
function SidebarContent({ walletData }) {
  // @todo add nft details something like:
  const Wallet = {
    name: `Token ID: ${walletData?.tokenId.toString()}`,
    avatar: "/static/images/avatars/1.jpg",
  };

  return (
    <RootWrapper>
      <Box display="flex" alignItems="flex-start" sx={{ pb: "10px" }}>
        <Avatar
          alt={Wallet.name}
          src={`https://avatars.dicebear.com/api/adventurer-neutral/${walletData?.tokenId}.svg`}
        />
        <Box
          sx={{
            ml: 1.5,
            flex: 1,
          }}
        >
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" noWrap>
                Wallet
              </Typography>
              <Typography variant="subtitle1" noWrap>
                {Wallet.name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      {/* <Box display="flex" alignItems="flex-start" py={3}>
        <Button variant="outlined" size="large" fullWidth>
          Supply to Aave
        </Button>
      </Box> */}

      <Typography
        sx={{
          mb: 1,
        }}
        variant="h3"
      >
        Assets
      </Typography>
      {walletData && walletData.holdAmounts && (
        <>
          <MeetingBox
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <Box display="flex">
              <Avatar src={eth} />
              <Typography variant="h3" sx={{ paddingLeft: "10px" }}>
                WETH
              </Typography>
            </Box>

            <Box display="flex" alignItems="flex-end">
              <Box pl={1}>
                <Typography variant="h4">
                  <FormatValue
                    value={walletData.holdAmounts.weth.toString()}
                    token="weth"
                  />{" "}
                  WETH
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    lineHeight: 1,
                    pt: "10px",
                  }}
                  color="text.primary"
                >
                  Amount
                </Typography>
              </Box>
            </Box>
          </MeetingBox>

          <MeetingBox
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <Box display="flex">
              <Avatar src={usdc} />
              <Typography variant="h3" sx={{ paddingLeft: "10px" }}>
                USDC
              </Typography>
            </Box>

            <Box display="flex" alignItems="flex-start">
              <Box pl={1}>
                <Typography variant="h4">
                  <FormatValue
                    value={walletData.holdAmounts.usdc.toString()}
                    token="usdc"
                  />{" "}
                  USDC
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    lineHeight: 1,
                    pt: "10px",
                  }}
                  color="text.primary"
                >
                  Amount
                </Typography>
              </Box>
            </Box>
          </MeetingBox>

          <MeetingBox
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <Box display="flex">
              <Avatar src={dai} />
              <Typography variant="h3" sx={{ paddingLeft: "10px" }}>
                DAI
              </Typography>
            </Box>

            <Box display="flex" alignItems="flex-start">
              <Box pl={1}>
                <Typography variant="h4">
                  <FormatValue
                    value={walletData.holdAmounts.dai.toString()}
                    token="dai"
                  />{" "}
                  DAI
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    lineHeight: 1,
                    pt: "10px",
                  }}
                  color="text.primary"
                >
                  Amount
                </Typography>
              </Box>
            </Box>
          </MeetingBox>

          <MeetingBox
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <Box display="flex">
              <Avatar src={btc} />
              <Typography variant="h3" sx={{ paddingLeft: "10px" }}>
                WBTC
              </Typography>
            </Box>

            <Box display="flex" alignItems="flex-start">
              <Box pl={1}>
                <Typography variant="h4">
                  <FormatValue
                    value={walletData.holdAmounts.wbtc.toString()}
                    token="wbtc"
                  />{" "}
                  WBTC
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    lineHeight: 1,
                    pt: "10px",
                  }}
                  color="text.primary"
                >
                  Amount
                </Typography>
              </Box>
            </Box>
          </MeetingBox>
        </>
      )}
    </RootWrapper>
  );
}

export default SidebarContent;
