import PropTypes from "prop-types";
import { forwardRef } from "react";

import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

const headerSX = {
  "& .MuiCardHeader-action": { mr: 0 },
};

const MainCard = forwardRef(
  (
    {
      // @ts-ignore
      border = true,
      // @ts-ignore
      boxShadow,
      children,
      // @ts-ignore
      content = true,
      // @ts-ignore
      contentClass = "",
      // @ts-ignore
      contentSX = {},
      // @ts-ignore
      darkTitle,
      // @ts-ignore
      secondary,
      // @ts-ignore
      shadow,
      // @ts-ignore
      sx = {},
      // @ts-ignore
      title,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Card // @ts-ignore
        ref={ref}
        {...others}
        sx={{
          border: border ? "1px solid" : "none",
          borderColor: theme.palette.primary[200] + 75,
          ":hover": {
            boxShadow: boxShadow
              ? shadow || "0 2px 14px 0 rgb(32 40 45 / 8%)"
              : "inherit",
          },
          ...sx,
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader sx={headerSX} title={title} action={secondary} />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h3">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {
  // @ts-ignore
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default MainCard;
