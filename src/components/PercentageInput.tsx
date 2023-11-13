import { InputAdornment, TextField } from "@mui/material";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { WP_INPUT_LABEL_PROPS, WP_INPUT_SX } from "../themes/wordpressTheme";

export type PercentageInputProps = NumericFormatProps & {
  helperText?: string;
  id: string;
  label: string;
  onChange: (val: string) => void;
};

export default function PercentageInput({
  id,
  value,
  label,
  helperText = " ",
  autoFocus,
  onChange,
  disabled,
}: PercentageInputProps) {
  return (
    <NumericFormat
      fullWidth
      thousandSeparator
      autoFocus={autoFocus}
      customInput={TextField}
      decimalScale={2}
      disabled={disabled}
      FormHelperTextProps={WP_INPUT_LABEL_PROPS}
      helperText={helperText}
      id={id}
      InputLabelProps={WP_INPUT_LABEL_PROPS}
      inputMode="numeric"
      label={label}
      margin="dense"
      maxLength={5}
      size="small"
      suffix={"%"}
      sx={WP_INPUT_SX}
      value={value === 0 ? "" : value}
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      }}
      isAllowed={(values) => {
        const { floatValue } = values;
        return floatValue === undefined || floatValue <= 100;
      }}
      onChange={(e) => {
        const val = e.target.value.replace(/[^0-9]/g, "");
        onChange(val);
      }}
    />
  );
}
