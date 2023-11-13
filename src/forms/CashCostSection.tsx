import { useState } from "react";
import CurrencyInput from "../components/CurrencyInput";
import RadioInput from "../components/RadioInput";
import {
  ESCROW_DEPOSIT_ID,
  ESCROW_DEPOSIT_LABEL,
  FormDataValue,
  HAS_HOA_OPTIONS,
  HOMEOWNERS_ASSOCIATION_ID,
  HOMEOWNERS_ASSOCIATION_LABEL,
  HOMEOWNERS_INSURANCE_MONTHLY_DUES_LABEL,
  HOMEOWNERS_INSURANCE_MONTHLY_ID,
  PRICE_ID,
  PRICE_LABEL,
  PROPERTY_TAX_YEARLY_ID,
  PROPERTY_TAX_YEARLY_LABEL,
  SELLER_CONCESSION_ID,
  SELLER_CONCESSION_LABEL,
} from "../constants/DataModelConstants";

export type CostSectionProps = {
  escrow_deposit?: number;
  has_hoa: boolean;
  hoa_monthly: number;
  onDataChange: (data: { [key: string]: FormDataValue }) => void;
  onValidChange(valid: boolean): void;
  price: number;
  property_tax: number;
  seller_concession: number;
};

export default function CashCostSection({
  price,
  has_hoa,
  seller_concession,
  escrow_deposit,
  hoa_monthly,
  onDataChange,
  property_tax,
  onValidChange,
}: CostSectionProps) {
  const handleChange = (field: string, data: FormDataValue) => {
    onDataChange({ [field]: data });
  };

  const [validList, setValidList] = useState<{ [key: string]: boolean }>({
    [PRICE_ID]: price !== 0,
  });

  const handleValidationChange = (field: string, valid: boolean) => {
    const nextValidList = {
      ...validList,
      [field]: valid,
    };
    setValidList(nextValidList);
    onValidChange(!Object.values(nextValidList).includes(false));
  };
  return (
    <>
      <CurrencyInput
        autoFocus
        required
        helperText={"Enter the sale price of the home."}
        id={PRICE_ID}
        label={PRICE_LABEL}
        value={price}
        onChange={(val) => {
          handleValidationChange(PRICE_ID, val !== "");
          handleChange(PRICE_ID, val as string);
        }}
      />
      <CurrencyInput
        helperText="Enter the escrow deposit."
        id={ESCROW_DEPOSIT_ID}
        label={ESCROW_DEPOSIT_LABEL}
        style={{ display: escrow_deposit === undefined ? "none" : "" }}
        value={escrow_deposit}
        onChange={(val) => handleChange(ESCROW_DEPOSIT_ID, val as string)}
      />
      <CurrencyInput
        helperText="Enter the seller concession."
        id={SELLER_CONCESSION_ID}
        label={SELLER_CONCESSION_LABEL}
        value={seller_concession}
        onChange={(val) => handleChange(SELLER_CONCESSION_ID, val as string)}
      />
      <RadioInput
        id={HOMEOWNERS_ASSOCIATION_ID}
        label={HOMEOWNERS_ASSOCIATION_LABEL}
        options={HAS_HOA_OPTIONS}
        value={has_hoa}
        onChange={(val) => handleChange(HOMEOWNERS_ASSOCIATION_ID, val === "true")}
      />
      <CurrencyInput
        disabled={!has_hoa}
        helperText="Only required if the property has a homeowners association."
        id={HOMEOWNERS_INSURANCE_MONTHLY_ID}
        label={HOMEOWNERS_INSURANCE_MONTHLY_DUES_LABEL}
        value={hoa_monthly}
        onChange={(val) => handleChange(HOMEOWNERS_INSURANCE_MONTHLY_ID, val as string)}
      />
      <CurrencyInput
        helperText="Required to collect from Oct 1 thru Dec 31"
        id={PROPERTY_TAX_YEARLY_ID}
        label={PROPERTY_TAX_YEARLY_LABEL}
        value={property_tax}
        onChange={(val) => handleChange(PROPERTY_TAX_YEARLY_ID, val as string)}
      />
    </>
  );
}
