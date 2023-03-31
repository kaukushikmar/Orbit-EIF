import styled from "@emotion/styled";
import {
  TooltipProps,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import React from "react";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    border: "1px solid #dadde9",
  },
}));

export const ToolTip = ({
  children,
  title,
  description,
}: {
  children: any;
  title?: string;
  description?: string;
}) => {
  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          {title && <Typography color="inherit">{title}</Typography>}
          {description}
        </React.Fragment>
      }
      placement={"top"}
    >
      {children}
    </HtmlTooltip>
  );
};
