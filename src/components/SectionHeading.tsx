import { Box, SxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

export interface SectionHeadingProps {
  label: string;
  action?: ReactNode;
  breakContainer?: boolean;
  sx?: SxProps;
}

export function SectionHeading(props: SectionHeadingProps) {
  const { label, action, breakContainer, sx } = props;

  return (
    <Box
      bgcolor={(theme) => theme.palette.background.background}
      py={0.5}
      display={"flex"}
      justifyContent={"space-between"}
      sx={[
        (theme) => ({
          flexDirection: "row",
          alignItems: "center",
          
          marginX: breakContainer ? -3 : 0,
          paddingX: 3,

          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",

            marginX: breakContainer ? -2 : 0,
            paddingX: 2,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        variant={"h6"}
        fontFamily={(theme) => theme.fontFamilyTitle}
        color={(theme) => theme.palette.grey[50]}
      >
        {label}
      </Typography>
      {action}
    </Box>
  );
}
