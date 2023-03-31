import { Avatar, Box, Button, InputBase, Typography } from "@mui/material";

export default function InputForm({
  onChange,
  icon,
  data,
  value,
  inputFor,
}: {
  onChange: any;
  icon: any;
  data?: any;
  value?: any;
  inputFor?: any;
}) {
  return (
    <>
      <Box
        sx={(theme) => ({
          p: "8px 12px",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "6px",
          mb: 1,
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <InputBase
            sx={{ flex: 1 }}
            placeholder="0.00"
            autoFocus
            type="number"
            value={value}
            required
            onChange={(e) => {
              if (Number(e.target.value) < 0) {
                onChange("0");
              } else if (
                inputFor === "supply" &&
                Number(e.target.value) > Number(data.balance)
              ) {
                onChange(data.balance);
              } else {
                onChange(e.target.value);
              }
            }}
            inputProps={{
              "aria-label": "amount input",
              style: {
                fontSize: "21px",
                lineHeight: "28,01px",
                padding: 0,
                height: "28px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              },
            }}
          />
          {/* TODO: add avatar component for getting icon */}
          <Avatar src={icon} sx={{ ml: "10px" }} />
        </Box>
      </Box>
      {inputFor === "supply" && (
        <Box sx={{ display: "flex", flexDirection: "row", m: "0px" }}>
          <Typography
            component="div"
            variant="subtitle2"
            color="text.secondary"
          >
            Wallet Balance {data.balance}
          </Typography>
          <Button
            size="small"
            sx={{ minWidth: 0, ml: "7px", p: 0 }}
            onClick={() => onChange(data.balance)}
          >
            Max
          </Button>
        </Box>
      )}
    </>
  );
}
