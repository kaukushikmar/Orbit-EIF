import { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

interface BaseLayoutProps {
  children?: ReactNode;
}

// @note baseLayout for the base components
const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        height: "100%",
      }}
    >
      {children}
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
