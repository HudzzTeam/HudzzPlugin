import { DatePicker, DatePickerProps, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { WP_INPUT_LABEL_PROPS, WP_INPUT_SX } from "../themes/wordpressTheme";

export type CalendarInputProps = DatePickerProps<Dayjs> & {
  helperText?: string;
  id: string;
  label: string;
  onValueChange: (value: Dayjs | null, isValid: boolean) => void;
  required?: boolean;
  value: Dayjs | null;
};

export default function CalendarInput({
  id,
  label,
  value,
  onValueChange,
  helperText,
  required = false,
}: CalendarInputProps) {
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState<Dayjs | null>(value);
  const currentYear = dayjs().year();

  const minDate = dayjs()
    .set("year", currentYear - 5)
    .set("month", 0)
    .set("date", 1);
  const maxDate = dayjs()
    .set("year", currentYear + 5)
    .set("month", 12)
    .set("date", 31);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        data-testid="calendar-input"
        format="MM-DD-YYYY"
        label={label}
        maxDate={maxDate}
        minDate={minDate}
        value={value}
        slotProps={{
          textField: {
            FormHelperTextProps: WP_INPUT_LABEL_PROPS,
            InputLabelProps: WP_INPUT_LABEL_PROPS,
            // Assuming a prop like this exists, which might not be the case
            error: error,
            fullWidth: true,
            helperText: helperText,
            id: id,
            inputProps: {
              "data-testid": "calendar-input",
            },
            margin: "dense",
            onBlur: () => {
              setError(!inputValue?.isValid());
            },
            required: required,
            size: "small",
            sx: WP_INPUT_SX,
          },
        }}
        onChange={(val) => {
          setInputValue(val);
          if (error) {
            setError(false);
          }
          onValueChange(val, !!val?.isValid());
        }}
      />
    </LocalizationProvider>
  );
}
