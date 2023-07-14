import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip,
  useTheme,
} from "@mui/material";
import RollIcon from "@mui/icons-material/Casino";

export type TextFieldWithOracleProps = Omit<TextFieldProps, "onChange"> & {
  getOracleValue: () => string;
  onChange: (value: string) => void;
};

export function TextFieldWithOracle(props: TextFieldWithOracleProps) {
  const { getOracleValue, onChange, ...textFieldProps } = props;

  const theme = useTheme();

  const handleOracleRoll = () => {
    onChange(getOracleValue());
  };

  return (
    <TextField
      fullWidth

      {...textFieldProps}
      onChange={(evt) => onChange(evt.currentTarget.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position={"end"} >
            <Tooltip
              title={"Consult the Oracle"}
              enterDelay={500}
            >
              <IconButton onClick={() => handleOracleRoll()}>
                <RollIcon
                  sx={(theme) => ({
                    color: theme.palette.icon.main,
                  })} />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
}
