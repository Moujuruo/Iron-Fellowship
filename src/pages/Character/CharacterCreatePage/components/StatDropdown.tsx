import {
  Box,
  Card,
  MenuItem,
  SxProps,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useField } from "formik";
import { Stat } from "types/stats.enum";

export interface StatDropdownProps {
  label: string;
  stat: Stat;

  remainingOptions: number[];
  handleRemainingOptionsChange: (
    previousValue: number | undefined,
    newValue: number | undefined
  ) => void;

  sx?: SxProps;
}

export function StatDropdown(props: StatDropdownProps) {
  const theme = useTheme();
  const { stat, label, remainingOptions, handleRemainingOptionsChange, sx } =
    props;

  const [field, meta, handlers] = useField<number | undefined>({
    name: `stats.${stat}`,
  });
  const value = field.value;

  const handleChange = (value: string | number) => {
    const currentValue = field.value as number | undefined;
    const numValue = typeof value === "string" ? parseInt(value) : value;
    const finalValue = numValue > 0 ? numValue : undefined;
    handleRemainingOptionsChange(currentValue, finalValue);

    handlers.setValue(finalValue);
  };

  return (
    <Card
      variant={"outlined"}
      sx={[
        (theme) => ({
          borderRadius: theme.shape.borderRadius,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          mr: 1,
          mt: 1,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        display={"block"}
        textAlign={"center"}
        variant={"subtitle1"}
        sx={(theme) => ({
          fontFamily: theme.fontFamilyTitle,
          color: theme.palette.grey[600], // should modify
          backgroundColor: theme.palette.grey[100],
        })}
      >
        {label}
      </Typography>
      <Box display={"flex"} flexDirection={"column"} flexGrow={1}>
        <TextField
          id={label}
          select
          variant={"outlined"}
          value={value ?? -1}
          onChange={(evt) => handleChange(evt.target.value)}
          sx={{ width: 100, backgroundColor: theme.palette.background.paper }} // the color of option background
        >
          <MenuItem value={-1}  sx={{ color: theme.palette.primary.contrastText}} >--</MenuItem>
          {value !== undefined && <MenuItem value={value}>{value}</MenuItem>}
          {remainingOptions.map((option, index) => (
            <MenuItem value={option} key={index} 
              sx={{ color: theme.palette.primary.contrastText}} // the color of option text
            >
              {`${option}`}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Card>
  );
}
