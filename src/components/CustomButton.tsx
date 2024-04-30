import { Button, ButtonProps } from "@mui/material";
import React from "react";

type PassthroughProps<T> = T & React.HTMLAttributes<HTMLElement>;

// TODO: Refactor to use styled-component instead of CSS file
export default function CustomButton({ children, ...props }: PassthroughProps<ButtonProps>) {
  return (
    <Button
      {...props}
      className="hudzz-button"
      size="large"
      style={{ backgroundColor: "var(--hudzz-primary-color)", ...props.style }}
      sx={{ paddingLeft: 10, paddingRight: 10 }}
      variant="contained"
    >
      {children}
    </Button>
  );
}
