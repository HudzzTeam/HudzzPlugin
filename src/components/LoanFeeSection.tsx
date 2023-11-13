import { Box } from "@mui/system";
import {
  APPRAISAL_FEE_ID,
  APPRAISAL_FEE_LABEL,
  FormDataValue,
  LENDER_APPLICATION_FEE_ID,
  LENDER_APPLICATION_FEE_LABEL,
  LENDER_PROCESSING_FEE_ID,
  LENDER_PROCESSING_FEE_LABEL,
  LENDER_UNDERWRITING_FEE_ID,
  LENDER_UNDERWRITING_FEE_LABEL,
} from "../constants/DataModelConstants";
import CurrencyInput from "./CurrencyInput";

export type LoanFeeSectionProps = {
  appraisal_fee: number;
  lender_application_fee: number;
  lender_fee: number;
  onDataChange: (data: { [key: string]: FormDataValue }) => void;
  underwriting_fee: number;
};

export default function LoanFeeSection({
  lender_application_fee,
  lender_fee,
  underwriting_fee,
  appraisal_fee,
  onDataChange,
}: LoanFeeSectionProps) {
  const handleChange = (field: string, data: FormDataValue) => {
    onDataChange({ [field]: data });
  };

  return (
    <Box>
      <CurrencyInput
        helperText="Enter the lender application fee."
        id={LENDER_APPLICATION_FEE_ID}
        label={LENDER_APPLICATION_FEE_LABEL}
        value={lender_application_fee}
        onChange={(val) => handleChange(LENDER_APPLICATION_FEE_ID, val as string)}
      />
      <CurrencyInput
        helperText="Enter the lender fee."
        id={LENDER_PROCESSING_FEE_ID}
        label={LENDER_PROCESSING_FEE_LABEL}
        value={lender_fee}
        onChange={(val) => handleChange(LENDER_PROCESSING_FEE_ID, val as string)}
      />
      <CurrencyInput
        helperText="Enter the underwriting fee."
        id={LENDER_UNDERWRITING_FEE_ID}
        label={LENDER_UNDERWRITING_FEE_LABEL}
        value={underwriting_fee}
        onChange={(val) => handleChange(LENDER_UNDERWRITING_FEE_ID, val as string)}
      />
      <CurrencyInput
        helperText="Enter the appraisal fee."
        id={APPRAISAL_FEE_ID}
        label={APPRAISAL_FEE_LABEL}
        value={appraisal_fee}
        onChange={(val) => handleChange(APPRAISAL_FEE_ID, val as string)}
      />
    </Box>
  );
}
