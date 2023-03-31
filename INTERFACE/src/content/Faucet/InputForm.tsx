import { Avatar, Box, InputBase } from "@mui/material";

export default function InputForm({ onChange, icon, amount }) {
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
            onChange={(e) => {
              onChange(e.target.value);
            }}
            value={amount}
            type="number"
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
            disabled={true}
          />
          {/* TODO: add avatar component for getting icon */}
          <Avatar src={icon} />
        </Box>
      </Box>
    </>
  );
}
