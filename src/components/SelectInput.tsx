import MenuItem from "@mui/material/MenuItem";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import type { Option } from "../constants/DataModelConstants";
import {
  WP_INPUT_LABEL_PROPS,
  WP_INPUT_SX,
  WP_MENU_PROPS,
  WP_PRIMARY_COLOR_AND_BACKGROUND_COLOR,
} from "../themes/wordpressTheme";

export type SelectInputProps = TextFieldProps & {
  error?: boolean;
  id: string;
  label: string;
  options: Option<string>[] | string[];
  required?: boolean;
  value: string;
};

export default function SelectInput({
  id,
  required = false,
  options,
  value,
  ...props
}: SelectInputProps) {
  return (
    <TextField
      {...props}
      fullWidth
      select
      data-testid="select-input"
      FormHelperTextProps={WP_INPUT_LABEL_PROPS}
      helperText={props.helperText || " "}
      id={id}
      InputLabelProps={WP_INPUT_LABEL_PROPS}
      margin="dense"
      name={id}
      required={required}
      size="small"
      sx={WP_INPUT_SX}
      value={value}
      InputProps={{
        sx: WP_PRIMARY_COLOR_AND_BACKGROUND_COLOR,
      }}
      SelectProps={{
        MenuProps: {
          sx: WP_MENU_PROPS,
        },
      }}
    >
      {options.map((option) => {
        if (typeof option === "string") {
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          );
        } else if (typeof option === "object") {
          const { label, value } = option as { label: string; value: string };

          return (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          );
        }
      })}
    </TextField>
  );
}
