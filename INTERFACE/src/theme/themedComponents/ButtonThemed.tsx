import { Button, styled } from "@mui/material";

export const ButtonThemed = styled(Button)(
  ({ theme }) => `
      color: ${"#ffffff"};
      background: ${"linear-gradient(to right, #370535, #670043, #9a0043, #c80035, #eb1212)"};
      transition: 'all 0.2s ease';
      '&:hover, &.Mui-focusVisible': {
        background: ${"linear-gradient(248.86deg, #B6509E 10.51%, #2EBAC6 93.41%)"},
        opacity: '0.9',
      };
`
);
