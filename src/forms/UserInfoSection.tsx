import { useState } from "react";
import EmailTextField from "../components/EmailTextField";
import PhoneNumberInput from "../components/PhoneNumberInput";
import ValidatedTextField from "../components/ValidatedTextField";
import {
  CELL_PHONE_ID,
  CELL_PHONE_LABEL,
  EMAIL_ID,
  EMAIL_LABEL,
  FIRST_NAME_ID,
  FIRST_NAME_LABEL,
  LAST_NAME_ID,
  LAST_NAME_LABEL,
} from "../constants/AppConstants";
import { FormDataValue } from "../constants/DataModelConstants";

type UserInfoProps = {
  cell_phone: string;
  email: string;
  first_name: string;
  last_name: string;
  onDataChange: (data: { [key: string]: FormDataValue }) => void;
  onValidChange: (isValid: boolean) => void;
};

export default function UserInfoSection({
  first_name,
  last_name,
  email,
  cell_phone,
  onDataChange,
  onValidChange,
}: UserInfoProps) {
  const handleChange = (field: string, data: FormDataValue) => {
    onDataChange({ [field]: data });
  };

  const validatePhoneNumber = (val: string) => {
    return val.replace(/\D/g, "").length === 10;
  };

  const [validList, setValidList] = useState<{ [key: string]: boolean }>({
    [CELL_PHONE_ID]: validatePhoneNumber(cell_phone),
    [EMAIL_ID]: RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}").test(email),
    [FIRST_NAME_ID]: first_name !== "",
    [LAST_NAME_ID]: last_name !== "",
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
      <ValidatedTextField
        autoFocus
        fullWidth
        required
        autoComplete="given-name"
        helperText={"Enter your first name."}
        id={FIRST_NAME_ID}
        label={FIRST_NAME_LABEL}
        name={FIRST_NAME_ID}
        value={first_name}
        isValid={(valid) => {
          handleValidationChange(FIRST_NAME_ID, valid);
        }}
        validate={(val) => {
          return val.length > 1;
        }}
        onChange={(val) => handleChange(FIRST_NAME_ID, val as string)}
      />
      <ValidatedTextField
        fullWidth
        required
        autoComplete="family-name"
        helperText={"Enter your last or family name."}
        id={LAST_NAME_ID}
        label={LAST_NAME_LABEL}
        value={last_name}
        isValid={(valid) => {
          handleValidationChange(LAST_NAME_ID, valid);
        }}
        validate={(val) => {
          return val.length > 0;
        }}
        onChange={(val) => handleChange(LAST_NAME_ID, val as string)}
      />
      <PhoneNumberInput
        fullWidth
        autoComplete="phone"
        helperText={"Enter your cell phone number."}
        id={CELL_PHONE_ID}
        isValid={(valid) => handleValidationChange(CELL_PHONE_ID, valid || cell_phone === "")}
        label={CELL_PHONE_LABEL}
        value={cell_phone}
        onInputChange={(val) => handleChange(CELL_PHONE_ID, val)}
      />
      <EmailTextField
        required
        helperText={"Email to recieve your HUD."}
        id={EMAIL_ID}
        label={EMAIL_LABEL}
        value={email}
        isValid={(valid) => {
          handleValidationChange(EMAIL_ID, valid);
        }}
        onChange={(val) => handleChange(EMAIL_ID, val as string)}
      />
    </>
  );
}
