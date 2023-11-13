import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import CalendarInput from "../components/CalendarInput";
import CurrencyInput from "../components/CurrencyInput";
import CustomTextField from "../components/CustomTextField";
import RadioInput from "../components/RadioInput";
import SelectInput from "../components/SelectInput";
import {
  BUYER_NAME_ID,
  BUYER_NAME_LABEL,
  CLOSING_DATE_ID,
  CLOSING_DATE_LABEL,
  FIRST_PAYOFF_ID,
  FIRST_PAYOFF_LABEL,
  FormDataValue,
  SECOND_PAYOFF_ID,
  SECOND_PAYOFF_LABEL,
  SELLER_NAME_ID,
  SELLER_NAME_LABEL,
  TITLE_COMPANY_ID,
  TITLE_COMPANY_LABEL,
  TITLE_COMPANY_OPTIONS,
  WHO_PAYS_ID,
  WHO_PAYS_LABEL,
  WHO_PAYS_OPTIONS,
} from "../constants/DataModelConstants";

export type ThirdPartySectionProps = {
  buyer_name?: string;
  closing_date: string | null;
  company: string;
  first_payoff: number;
  onDataChange: (data: { [key: string]: FormDataValue }) => void;
  onValidChange(valid: boolean): void;
  second_payoff: number;
  seller_name: string;
  who_pays: string;
};

export default function CashThirdPartySection({
  onDataChange,
  who_pays,
  company,
  closing_date,
  buyer_name,
  seller_name,
  onValidChange,
  first_payoff,
  second_payoff,
}: ThirdPartySectionProps) {
  const handleChange = (field: string, data: FormDataValue) => {
    onDataChange({ [field]: data });
  };

  const [validList, setValidList] = useState<{ [key: string]: boolean }>({
    [CLOSING_DATE_ID]: closing_date == null ? false : dayjs(closing_date)?.isValid(),
    [TITLE_COMPANY_ID]: company !== "",
    [WHO_PAYS_ID]: who_pays !== "",
  });

  const handleValidationChange = (field: string, valid: boolean) => {
    const nextValidList = {
      ...validList,
      [field]: valid,
    };
    setValidList(nextValidList);
    onValidChange(!Object.values(nextValidList).includes(false));
  };

  const [closing_date_obj, set_closing_date_obj] = useState<Dayjs | null>(
    closing_date === null ? null : dayjs(closing_date),
  );

  const handleClosingDateChange = (value: Dayjs | null) => {
    set_closing_date_obj(value);
    handleValidationChange(CLOSING_DATE_ID, value == null ? false : value?.isValid());
    handleChange(CLOSING_DATE_ID, value?.format("YYYY-MM-DD") as string);
  };

  return (
    <Box>
      <CustomTextField
        autoFocus
        fullWidth
        helperText="Enter the buyer's name."
        id={BUYER_NAME_ID}
        label={BUYER_NAME_LABEL}
        style={{ display: buyer_name === undefined ? "none" : "" }}
        value={buyer_name}
        onChange={(e) => handleChange(BUYER_NAME_ID, e.target.value)}
      />
      <CustomTextField
        fullWidth
        helperText="Enter the seller's name."
        id={SELLER_NAME_ID}
        label={SELLER_NAME_LABEL}
        value={seller_name}
        onChange={(e) => handleChange(SELLER_NAME_ID, e.target.value)}
      />
      <SelectInput
        fullWidth
        required
        helperText="Enter the name of the title company."
        id={TITLE_COMPANY_ID}
        label={TITLE_COMPANY_LABEL}
        options={TITLE_COMPANY_OPTIONS}
        value={company}
        onChange={(e) => {
          handleValidationChange(TITLE_COMPANY_ID, e.target.value !== "");
          handleChange(TITLE_COMPANY_ID, e.target.value);
        }}
      />
      <CalendarInput
        required
        helperText="Enter the closing date in MM-DD-YYYY format."
        id={CLOSING_DATE_ID}
        label={CLOSING_DATE_LABEL}
        value={closing_date_obj}
        onValueChange={(val) => {
          // handleValidationChange(CLOSING_DATE_ID, isValid);
          handleClosingDateChange(val);
        }}
      />
      <RadioInput
        required
        id={WHO_PAYS_ID}
        label={WHO_PAYS_LABEL}
        options={WHO_PAYS_OPTIONS}
        value={who_pays}
        onChange={(val) => {
          handleValidationChange(WHO_PAYS_ID, val !== "");
          handleChange(WHO_PAYS_ID, val);
        }}
      />
      <CurrencyInput
        helperText="Enter first payoff amount."
        id={FIRST_PAYOFF_ID}
        label={FIRST_PAYOFF_LABEL}
        value={first_payoff}
        onChange={(val) => handleChange(FIRST_PAYOFF_ID, val as string)}
      />
      <CurrencyInput
        helperText="Enter second payoff amount."
        id={SECOND_PAYOFF_ID}
        label={SECOND_PAYOFF_LABEL}
        value={second_payoff}
        onChange={(val) => handleChange(SECOND_PAYOFF_ID, val as string)}
      />
    </Box>
  );
}
