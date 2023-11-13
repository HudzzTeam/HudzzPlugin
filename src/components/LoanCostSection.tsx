import { Box } from "@mui/system";
import { useState } from "react";
import {
  FormDataValue,
  HOMEOWNERS_INSURANCE_YEARLY_ID,
  HOMEOWNERS_INSURANCE_YEARLY_LABEL,
  LENDER_LOAN_POINTS_ID,
  LENDER_LOAN_POINTS_LABEL,
  LENDER_NAME_ID,
  LENDER_NAME_LABEL,
  LOAN_ID,
  LOAN_LABEL,
  PREPAID_INTEREST_ID,
  PREPAID_INTEREST_LABEL,
} from "../constants/DataModelConstants";
import CurrencyInput from "./CurrencyInput";
import CustomTextField from "./CustomTextField";
import PercentageInput from "./PercentageInput";

export type LoanCostSectionProps = {
  hoa_insurance: number;
  lender_name: string;
  loan: number;
  loan_points: number;
  onDataChange: (data: { [key: string]: FormDataValue }) => void;
  onValidChange(valid: boolean): void;
  prepaid_interest: number;
};

export default function LoanCostSection({
  loan,
  lender_name,
  loan_points,
  prepaid_interest,
  hoa_insurance,
  onDataChange,
  onValidChange,
}: LoanCostSectionProps) {
  const handleChange = (field: string, data: FormDataValue) => {
    onDataChange({ [field]: data });
  };

  const [validList, setValidList] = useState<{ [key: string]: boolean }>({});

  const handleValidationChange = (field: string, valid: boolean) => {
    const nextValidList = {
      ...validList,
      [field]: valid,
    };
    setValidList(nextValidList);
    onValidChange(!Object.values(nextValidList).includes(false));
  };

  return (
    <Box>
      <CustomTextField
        autoFocus
        fullWidth
        helperText={"Enter the lender's name."}
        id={LENDER_NAME_ID}
        label={LENDER_NAME_LABEL}
        value={lender_name}
        onChange={(e) => {
          handleChange(LENDER_NAME_ID, e.target.value);
        }}
      />

      <CurrencyInput
        required
        helperText={"Enter the loan amount."}
        id={LOAN_ID}
        label={LOAN_LABEL}
        value={loan}
        onChange={(val) => {
          handleValidationChange(LOAN_ID, val !== "");
          handleChange(LOAN_ID, val as string);
        }}
      />
      <PercentageInput
        helperText="Enter the loan points."
        id={LENDER_LOAN_POINTS_ID}
        label={LENDER_LOAN_POINTS_LABEL}
        value={loan_points}
        onChange={(val) => handleChange(LENDER_LOAN_POINTS_ID, val as string)}
      />
      <CurrencyInput
        helperText="Enter the prepaid interest."
        id={PREPAID_INTEREST_ID}
        label={PREPAID_INTEREST_LABEL}
        value={prepaid_interest}
        onChange={(val) => handleChange(PREPAID_INTEREST_ID, val as string)}
      />
      <CurrencyInput
        helperText="Enter the HOA insurance."
        id={HOMEOWNERS_INSURANCE_YEARLY_ID}
        label={HOMEOWNERS_INSURANCE_YEARLY_LABEL}
        value={hoa_insurance}
        onChange={(val) => handleChange(HOMEOWNERS_INSURANCE_YEARLY_ID, val as string)}
      />
    </Box>
  );
}
