import { Box } from "@mui/material";
import CurrencyInput from "../components/CurrencyInput";
import PercentageInput from "../components/PercentageInput";
import {
  BUYER_MISC_ID,
  BUYER_MISC_LABEL,
  BUYER_TRANSACTION_FEE_ID,
  BUYER_TRANSACTION_FEE_LABEL,
  COMMISSION_ID,
  COMMISSION_LABEL,
  FormDataValue,
  SELLER_MISC_ID,
  SELLER_MISC_LABEL,
  SELLER_TRANSACTION_FEE_ID,
  SELLER_TRANSACTION_FEE_LABEL,
} from "../constants/DataModelConstants";

export type MiscCostSectionProps = {
  buyer_additional_fee: number;
  buyer_misc: number;
  commission: number;
  onDataChange: (data: { [key: string]: FormDataValue }) => void;
  seller_additional_fee: number;
  seller_misc: number;
};

export default function MiscCostsSection({
  buyer_additional_fee,
  buyer_misc,
  commission,
  onDataChange,
  seller_additional_fee,
  seller_misc,
}: MiscCostSectionProps) {
  const handleChange = (field: string, data: FormDataValue) => {
    onDataChange({ [field]: data });
  };
  return (
    <Box>
      <PercentageInput
        helperText="Enter commission percentage."
        id={COMMISSION_ID}
        label={COMMISSION_LABEL}
        value={commission}
        onChange={(val) => handleChange(COMMISSION_ID, val as string)}
      />

      <CurrencyInput
        helperText="Enter buyer additional fees."
        id={BUYER_TRANSACTION_FEE_ID}
        label={BUYER_TRANSACTION_FEE_LABEL}
        value={buyer_additional_fee}
        onChange={(val) => handleChange(BUYER_TRANSACTION_FEE_ID, val as string)}
      />

      <CurrencyInput
        helperText="Enter seller additional fees."
        id={SELLER_TRANSACTION_FEE_ID}
        label={SELLER_TRANSACTION_FEE_LABEL}
        value={seller_additional_fee}
        onChange={(val) => handleChange(SELLER_TRANSACTION_FEE_ID, val as string)}
      />

      <CurrencyInput
        helperText="Enter seller additional fees."
        id={SELLER_MISC_ID}
        label={SELLER_MISC_LABEL}
        value={seller_misc}
        onChange={(val) => handleChange(SELLER_MISC_ID, val as string)}
      />
      <CurrencyInput
        helperText="Enter buyer miscellaneous fees."
        id={BUYER_MISC_ID}
        label={BUYER_MISC_LABEL}
        value={buyer_misc}
        onChange={(val) => handleChange(BUYER_MISC_ID, val as string)}
      />
    </Box>
  );
}
