import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

export interface PrimaryCtaButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

export function PrimaryCtaButton({
  children = "Create Your Hushh ID →",
  ...rest
}: PrimaryCtaButtonProps) {
  return (
    <Button
      type="button"
      size="lg"
      borderRadius="full"
      fontWeight="bold"
      bgGradient="linear(to-r, rgb(0, 169, 224), rgb(109, 211, 239))"
      color="white"
      boxShadow="0 10px 25px rgba(0, 169, 224, 0.35)"
      _hover={{
        bgGradient: "linear(to-r, rgb(0, 150, 200), rgb(90, 195, 230))",
        boxShadow: "0 12px 30px rgba(0, 150, 200, 0.45)",
        _disabled: {
          bgGradient: "linear(to-r, rgb(0, 169, 224), rgb(109, 211, 239))",
          boxShadow: "0 10px 25px rgba(0, 169, 224, 0.35)",
        },
      }}
      _active={{
        transform: "scale(0.98)",
        boxShadow: "0 6px 18px rgba(0, 120, 170, 0.45)",
      }}
      _focusVisible={{
        outline: "2px solid rgba(0, 169, 224, 0.9)",
        outlineOffset: "2px",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
