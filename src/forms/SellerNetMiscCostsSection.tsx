import { Box } from "@mui/material";
import CurrencyInput from "../components/CurrencyInput";
import PercentageInput from "../components/PercentageInput";
import {
  COMMISSION_ID,
  COMMISSION_LABEL,
  FormDataValue,
  SELLER_MISC_ID,
  SELLER_MISC_LABEL,
  SELLER_TRANSACTION_FEE_ID,
  SELLER_TRANSACTION_FEE_LABEL,
} from "../constants/DataModelConstants";

export type SellerNetMiscCostsectionProps = {
  commission: number;
  onDataChange: (data: { [key: string]: FormDataValue }) => void;
  seller_additional_fee: number;
  seller_misc: number;
};

export default function SellerNetMiscCostsSection({
  commission,
  onDataChange,
  seller_additional_fee,
  seller_misc,
}: SellerNetMiscCostsectionProps) {
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
    </Box>
  );
}
