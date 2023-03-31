import { Avatar, Box, InputBase } from "@mui/material";

export default function InputForm({ onChange, icon, value }) {
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
          <Avatar src={icon} />
        </Box>
      </Box>
    </>
  );
}
