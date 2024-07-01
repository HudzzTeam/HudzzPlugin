import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FormDataValue, Option } from "../constants/DataModelConstants";
import { WP_INPUT_PROPS, WP_RADIO_FORM_CONTROL_SX, WP_RADIO_SX } from "../themes/wordpressTheme";

export type RadioInputProps = {
  helperText?: string;
  id: string;
  label: string;
  onChange: (val: FormDataValue) => void;
  options: Option<string | boolean | number>[];
  required?: boolean;
  value: FormDataValue;
};

export default function RadioInput({
  id,
  label,
  helperText = "",
  value,
  onChange,
  options,
  required = false,
}: RadioInputProps) {
  return (
    <FormControl
      id={id}
      required={required}
      sx={{
        ...WP_RADIO_FORM_CONTROL_SX,
        marginLeft: "14px",
      }}
    >
      <FormLabel component="legend" focused={false} sx={{ color: "var(--hudzz-text-input-color)" }}>
        {label}
      </FormLabel>
      <FormHelperText style={{ fontSize: "0.8em" }}>{helperText}</FormHelperText>
      <RadioGroup
        row
        aria-label="has-hoa"
        name="row-radio-buttons-group"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.label}
            label={option.label}
            value={option.value}
            control={
              <Radio
                sx={{
                  ...WP_RADIO_SX,
                  padding: "5px",
                }}
              />
            }
            sx={{
              WP_INPUT_PROPS,
              WP_RADIO_SX,
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
