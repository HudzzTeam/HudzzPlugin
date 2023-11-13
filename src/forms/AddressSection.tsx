import { useState } from "react";
import CustomAutoComplete from "../components/CustomAutoComplete";
import CustomTextField from "../components/CustomTextField";
import PatternInput from "../components/PatternTextInput";
import StatementSelectInput from "../components/SelectInput";
import {
  ADDRESS_1_ID,
  ADDRESS_1_LABEL,
  ADDRESS_2_ID,
  ADDRESS_2_LABEL,
  CITY_ID,
  CITY_LABEL,
  CITY_OPTION_MAP,
  COUNTY_ID,
  COUNTY_LABEL,
  FormDataValue,
  Option,
  STATE_ID,
  STATE_LABEL,
  STATE_SELECT_OPTIONS,
  ZIP_ID,
  ZIP_LABEL,
} from "../constants/DataModelConstants";
import { countyOptions } from "../constants/counties";

type ErrorObject = {
  [key: string]: boolean;
};

export type DataObject = {
  [key: string]: string | number | boolean | null;
};

type AddressSectionProps = {
  address1: string;
  address2: string;
  city: string;
  countyObj: Option<string>;
  errors: ErrorObject;
  onCountyChange: (county: Option<string>) => void;
  onDataChange: (data: { [key: string]: FormDataValue }) => void;
  onValidChange(valid: boolean): void;
  state: string;
  zip_code: string;
};

export default function AddressSection({
  errors,
  address1,
  address2,
  city,
  state,
  zip_code,
  onDataChange,
  onValidChange,
  onCountyChange,
  countyObj,
}: AddressSectionProps) {
  const handleChange = (field: string, data: FormDataValue) => {
    onDataChange({ [field]: data });
  };

  const [validList, setValidList] = useState<{ [key: string]: boolean }>({
    [ADDRESS_1_ID]: false,
    [COUNTY_ID]: false,
    [STATE_ID]: true,
  });

  const handleValidationChange = (field: string, valid: boolean) => {
    const nextValidList = {
      ...validList,
      [field]: valid,
    };
    setValidList(nextValidList);
    onValidChange(!Object.values(nextValidList).includes(false));
  };

  const handleStateSelectChange = (data: string) => {
    if (data === "") {
      onDataChange({
        [CITY_ID]: "",
        [COUNTY_ID]: "",
        [STATE_ID]: "",
      });
    } else {
      onDataChange({ [STATE_ID]: data });
    }
  };

  function isOptionString(obj: unknown): obj is Option<string> {
    return typeof obj === "object" && obj !== null && "value" in obj;
  }

  return (
    <>
      <CustomTextField
        autoFocus
        fullWidth
        required
        helperText={"Enter your street address."}
        id={ADDRESS_1_ID}
        label={ADDRESS_1_LABEL}
        value={address1}
        onChange={(e) => {
          handleValidationChange(ADDRESS_1_ID, e.target.value !== "");
          handleChange(ADDRESS_1_ID, e.target.value);
        }}
      />
      <CustomTextField
        fullWidth
        helperText={"Enter your apartment, suite, or unit number."}
        id={ADDRESS_2_ID}
        label={ADDRESS_2_LABEL}
        value={address2}
        onChange={(e) => handleChange(ADDRESS_2_ID, e.target.value)}
      />
      <StatementSelectInput
        required
        error={errors[STATE_ID]}
        helperText={"Select your state from the dropdown."}
        id={STATE_ID}
        label={STATE_LABEL}
        options={STATE_SELECT_OPTIONS}
        value={state}
        onChange={(e) => {
          handleValidationChange(STATE_ID, e.target.value !== "");
          handleStateSelectChange(e.target.value);
        }}
      />
      <CustomAutoComplete
        disabled={state === ""}
        helperText={"Start typing your city, then click or use arrow keys to select."}
        id={CITY_ID}
        label={CITY_LABEL}
        options={CITY_OPTION_MAP[state]}
        value={city === "" ? null : city}
        onValueChange={(value) => handleChange(CITY_ID, typeof value == "string" ? value : "")}
      />
      <CustomAutoComplete
        required
        disabled={state === ""}
        error={errors[COUNTY_ID]}
        helperText={"Start typing your county, then click or use arrow keys to select."}
        id={COUNTY_ID}
        isValid={(valid) => handleValidationChange(COUNTY_ID, valid)}
        label={COUNTY_LABEL}
        options={countyOptions[state] || []}
        value={countyObj.label || null}
        onValueChange={(obj) => {
          if (isOptionString(obj)) {
            onCountyChange(obj);
          }
        }}
      />
      <PatternInput
        format={"#####"}
        helperText={"Enter your 5 digit zip code."}
        id={ZIP_ID}
        isValid={() => {}}
        label={ZIP_LABEL}
        maxLength={5}
        name={ZIP_ID}
        value={zip_code}
        onChange={(val) => handleChange(ZIP_ID, val as string)}
      />
    </>
  );
}
