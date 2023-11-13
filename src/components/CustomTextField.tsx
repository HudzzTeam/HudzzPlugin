import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { WP_INPUT_LABEL_PROPS, WP_INPUT_PROPS, WP_INPUT_SX } from "../themes/wordpressTheme";

export type CustomTextFieldProps = TextFieldProps & {
  error?: boolean;
  id: string;
  required?: boolean;
};

export default function CustomTextField({ id, required = false, ...props }: CustomTextFieldProps) {
  return (
    <TextField
      {...props}
      data-testid="custom-text-field"
      FormHelperTextProps={WP_INPUT_LABEL_PROPS}
      helperText={props.helperText || " "}
      id={id}
      InputLabelProps={WP_INPUT_LABEL_PROPS}
      margin="dense"
      name={id}
      required={required}
      size="small"
      sx={WP_INPUT_SX}
      InputProps={{
        endAdornment: <InputAdornment position="end">Aa</InputAdornment>,
      }}
      inputProps={{
        sx: WP_INPUT_PROPS,
      }}
    />
  );
}
