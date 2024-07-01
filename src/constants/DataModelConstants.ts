import citiesJson from "../constants/cities.json";

export interface Option<T> {
  label: string;
  value: T;
}

export type FormDataValue = string | boolean | number | number[];

export type CityOptionMap = { [key: string]: string[] };

export const CITY_OPTION_MAP: CityOptionMap = citiesJson as CityOptionMap;

// export const CITIES_SELECT_OPTIONS: unknown[] = citiesJson;

export const STATE_SELECT_OPTIONS: Option<string>[] = [
  {
    label: "Select a state...",
    value: "",
  },
  {
    label: "Florida",
    value: "FL",
  },
];

export const STATUS_SELECT_OPTIONS: Option<string>[] = [
  {
    label: "Select a status...",
    value: "",
  },
  {
    label: "Active",
    value: "2",
  },
  {
    label: "Contract",
    value: "3",
  },
  {
    label: "Closed",
    value: "4",
  },
  {
    label: "Deleted",
    value: "5",
  },
];

export const PROPERTY_TYPE_OPTIONS: Option<string>[] = [
  {
    label: "Select a property type...",
    value: "",
  },
  {
    label: "SFR",
    value: "1",
  },
  {
    label: "MFR",
    value: "2",
  },
  {
    label: "Commercial",
    value: "3",
  },
  {
    label: "Townhouse",
    value: "4",
  },
  {
    label: "Condo",
    value: "5",
  },
  {
    label: "Land",
    value: "6",
  },
  {
    label: "Other",
    value: "7",
  },
];

export const PROPERTY_TYPE_OPTIONS_MULTISELECT: Option<string>[] = [
  {
    label: "SFR",
    value: "1",
  },
  {
    label: "MFR",
    value: "2",
  },
  {
    label: "Commercial",
    value: "3",
  },
  {
    label: "Townhouse",
    value: "4",
  },
  {
    label: "Condo",
    value: "5",
  },
  {
    label: "Land",
    value: "6",
  },
];

export const HAS_HOA_OPTIONS: Option<boolean>[] = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

export const YES_NO_OPTIONS: Option<boolean>[] = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

export const TRANSACTION_TYPE_OPTIONS: Option<string>[] = [
  {
    label: "Finance",
    value: "Financing",
  },
  {
    label: "Cash",
    value: "Cash",
  },
];

export const WHO_PAYS_OPTIONS: Option<string>[] = [
  {
    label: "Buyer",
    value: "Buyer",
  },
  {
    label: "Seller",
    value: "Seller",
  },
];

export const TITLE_COMPANY_OPTIONS: Option<string>[] = [
  {
    label: "Assure America Title Company",
    value: "2",
  },
  {
    label: "Other Title Company",
    value: "3",
  },
];

export const TRANSACTION_TYPE_ID = "transaction_type";
export const TRANSACTION_TYPE_LABEL = "Transaction Type";

export const ADDRESS_1_ID = "address1";
export const ADDRESS_1_LABEL = "Address 1 (Required)";

export const ADDRESS_2_ID = "address2";
export const ADDRESS_2_LABEL = "Address 2";

export const CITY_ID = "city";
export const CITY_LABEL = "City";

export const CITIES_ID = "cities";
export const CITIES_LABEL = "Cities";

export const STATE_ID = "state";
export const STATE_LABEL = "State (Required)";

export const ZIP_ID = "zip_code";
export const ZIP_LABEL = "Zip";

export const COUNTY_ID = "county";
export const COUNTY_LABEL = "County (Required)";

export const PRICE_ID = "price";
export const PRICE_LABEL = "Sale Price (Required)";

export const PRICE_UPPER_ID = "price_upper";
export const PRICE_UPPER_LABEL = "Price Max";

export const PRICE_LOWER_ID = "price_lower";
export const PRICE_LOWER_LABEL = "Price Min";

export const ESCROW_DEPOSIT_ID = "escrow_deposit";
export const ESCROW_DEPOSIT_LABEL = "Escrow Deposit";

export const SELLER_CONCESSION_ID = "seller_concession";
export const SELLER_CONCESSION_LABEL = "Seller Concession";

export const WHO_PAYS_ID = "who_pays";
export const WHO_PAYS_LABEL = "Who Pays Owner's Title Policy? (Required)";

export const BUYER_NAME_ID = "buyer_name";
export const BUYER_NAME_LABEL = "Buyer Name";

export const BORROWER_NAME_ID = "buyer_name";
export const BORROWER_NAME_LABEL = "Borrower Name(s)";

export const SELLER_NAME_ID = "seller_name";
export const SELLER_NAME_LABEL = "Seller Name";

export const LENDER_NAME_ID = "lender_name";
export const LENDER_NAME_LABEL = "Lender Name";

export const TITLE_COMPANY_ID = "company";
export const TITLE_COMPANY_LABEL = "Title Company (Required)";

export const LOAN_ID = "loan";
export const LOAN_LABEL = "Loan Amount";

export const NEW_LOAN_AMOUNT_ID = "loan";
export const NEW_LOAN_AMOUNT_LABEL = "New Loan Amount";

export const PRIOR_INSURED_ID = "prior_insured";
export const PRIOR_INSURED_LABEL = "Prior Insured Amount (For Reissue Credit)";

export const CLOSING_DATE_ID = "closing_date";
export const CLOSING_DATE_LABEL = "Closing Date (Required)";

export const FIRST_PAYOFF_ID = "first_payoff";
export const FIRST_PAYOFF_LABEL = "1st Payoff";

export const SECOND_PAYOFF_ID = "second_payoff";
export const SECOND_PAYOFF_LABEL = "2nd Payoff";

export const COMMISSION_ID = "commission";
export const COMMISSION_LABEL = "Real Estate Commission % - Listing/Selling Agent";

export const LENDER_LOAN_POINTS_ID = "loan_points";
export const LENDER_LOAN_POINTS_LABEL = "Lender Loan Points (%)";

export const LENDER_APPLICATION_FEE_ID = "lender_application_fee";
export const LENDER_APPLICATION_FEE_LABEL = "Lender Application Fee";

export const LENDER_PROCESSING_FEE_ID = "lender_fee";
export const LENDER_PROCESSING_FEE_LABEL = "Lender Processing Fee";

export const LENDER_UNDERWRITING_FEE_ID = "underwriting_fee";
export const LENDER_UNDERWRITING_FEE_LABEL = "Lender Underwriting Fee";

export const APPRAISAL_FEE_ID = "appraisal_fee";
export const APPRAISAL_FEE_LABEL = "Appraisal Fee";

export const PREPAID_INTEREST_ID = "prepaid_interest";
export const PREPAID_INTEREST_LABEL = "Prepaid Daily Mortgage Loan Interest";

export const HOMEOWNERS_INSURANCE_MONTHLY_ID = "hoa_monthly";
export const HOMEOWNERS_INSURANCE_MONTHLY_LABEL = "Homeowner's Insurance Monthly Escrow Payments";
export const HOMEOWNERS_INSURANCE_MONTHLY_DUES_LABEL = "Homeowner's Association Monthly Dues";

export const HOMEOWNERS_INSURANCE_MONTHS_ID = "hoa_months";
export const HOMEOWNERS_INSURANCE_MONTHS_LABEL = "Months to collect for Homeowner's Insurance";

export const PROPERTY_TAX_YEARLY_ID = "property_tax";
export const PROPERTY_TAX_YEARLY_LABEL = "Property Tax (Yearly)";
export const PROPERTY_TAX_YEARLY_HELPER = "required to collect from Oct. 1 thru Dec 31";

export const HOMEOWNERS_ASSOCIATION_ID = "has_hoa";
export const HOMEOWNERS_ASSOCIATION_LABEL = "Homeowner's Association";
export const HOMEOWNERS_ASSOCIATION_ESTOPPEL_FEE = "Estoppel fee required for HOA";

//TODO: Double check
export const BUYER_MISC_ID = "buyer_misc";
export const BUYER_MISC_LABEL = "Buyer Miscellaneous Costs";

export const MISCELLANEOUS_LOAN_EXPENSES_ID = "buyer_misc";
export const MISCELLANEOUS_LOAN_EXPENSES_LABEL = "Miscellaneous Loan Expenses";

export const SELLER_MISC_ID = "seller_misc";
export const SELLER_MISC_LABEL = "Seller Miscellaneous Costs";

export const ENDORESMENTS_ID = "endorsements";
export const ENDORESMENTS_LABEL = "Endorsements";

// export const HOMEOWNERS_INSURANCE_YEARLY_ID = "hoa_yearly";
export const HOMEOWNERS_INSURANCE_YEARLY_ID = "hoa_insurance"; // TODO: Replace in backend to be hoa_yearly
export const HOMEOWNERS_INSURANCE_YEARLY_LABEL = "Homeowner's Insurance (Yearly)";

export const BUYER_TRANSACTION_FEE_ID = "buyer_additional_fee";
export const BUYER_TRANSACTION_FEE_LABEL = "Buyer Real Estate Transaction Fee";

export const SELLER_TRANSACTION_FEE_ID = "seller_additional_fee";
export const SELLER_TRANSACTION_FEE_LABEL = "Seller Real Estate Transaction Fee";

export const SQUARE_FEET_ID = "sqfeet";
export const SQUARE_FEET_LABEL = "Square Feet";

export const BEDROOMS_ID = "bedrooms";
export const BEDROOMS_LABEL = "Bedrooms";

export const BEDROOMS_LOWER_ID = "bedrooms_lower";
export const BEDROOMS_LOWER_LABEL = "Bedrooms Lower";

export const BEDROOMS_UPPER_ID = "bedrooms_upper";
export const BEDROOMS_UPPER_LABEL = "Bedrooms Upper";

export const BATHROOMS_ID = "baths";
export const BATHROOMS_LABEL = "Baths";

export const BATHROOMS_LOWER_ID = "baths_lower";
export const BATHROOMS_LOWER_LABEL = "Baths Min";

export const BATHROOMS_UPPER_ID = "baths_upper";
export const BATHROOMS_UPPER_LABEL = "Baths Max";

export const GARAGE_ID = "garage";
export const GARAGE_LABEL = "Garage";

export const GARAGE_LOWER_ID = "garage_lower";
export const GARAGE_LOWER_LABEL = "Garage Min";

export const GARAGE_UPPER_ID = "garage_upper";
export const GARAGE_UPPER_LABEL = "Garage Max";

export const YEAR_ID = "year";
export const YEAR_LABEL = "Year Built";

export const STORIES_ID = "stories";
export const STORIES_LABEL = "Stories";

export const STORIES_LOWER_ID = "stories_lower";
export const STORIES_LOWER_LABEL = "Stories Min";

export const STORIES_UPPER_ID = "stories_upper";
export const STORIES_UPPER_LABEL = "Stories Max";

export const LOT_SIZE_ID = "lot_size"; //TODO
export const LOT_SIZE_LABEL = "Lot Size";

export const MLS_ID = "mls_id";
export const MLS_LABEL = "MLS ID";

export const STATUS_ID = "status";
export const STATUS_LABEL = "Status";

export const POOL_ID = "pool";
export const POOL_LABEL = "Pool";

export const WATERFRONT_ID = "waterfront";
export const WATERFRONT_LABEL = "Waterfront";

export const DESCRIPTION_ID = "description";
export const DESCRIPTION_LABEL = "Description";

export const _ID = "";
export const _LABEL = "";

export const SAVED_SEARCH_ID = "saved_search";
export const SAVED_SEARCH_LABEL = "Saved Search";

export const PROPERTY_TYPE_ID = "property_type";
export const PROPERTY_TYPE_LABEL = "Property Type";

export const PROPERTY_TYPES_ID = "property_types";
export const PROPERTY_TYPES_LABEL = "Property Types";

export const MAX_DISTANCE_ID = "max_distance";
export const MAX_DISTANCE_LABEL = "Max Distance (Zip)";

export const ENDORSEMENTS_DICT = {
  1: "Alta 6.2 Negative Rate Mortgage",
  2: "Alta 6.0/6.1 Adjustable Rate Mortgage",
  3: "Alta 4.1 Condominium (Required for a Condo)",
  4: "Alta 5.1 Planned Unit Development (Required for a SFR with an HOA)",
  5: "Alta 8.1 Environmental Protection (Required for all properties)",
  6: "Alta 9.0 (FF 9) (Required for all properties)",
};
