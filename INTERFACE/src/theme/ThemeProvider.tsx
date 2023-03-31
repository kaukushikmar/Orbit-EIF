import { FC, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { themeCreator } from "./base";
import { StylesProvider } from "@mui/styles";

const ThemeProviderWrapper: FC = (props) => {
  const [themeName, _] = useState("Override");

  const theme = themeCreator(themeName);

  // @todo Extend jsx type (if time allows)
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
