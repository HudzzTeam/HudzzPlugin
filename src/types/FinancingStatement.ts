export type FinancingStatement = {
  address1: string;
  address2: string;
  appraisal_fee: number;
  buyer_additional_fee: number;
  buyer_misc: number;
  buyer_name: string;
  city: string;
  closing_date: string | null;
  commission: number;
  company: string;
  county: string;
  email: string;
  endorsements: number[];
  escrow_deposit: number;
  first_payoff: number;
  has_hoa: boolean;
  hoa_insurance: number;
  hoa_monthly: number;
  lender_application_fee: number;
  lender_fee: number;
  lender_name: string;
  loan: number;
  loan_points: number;
  prepaid_interest: number;
  price: number;
  property_tax: number;
  second_payoff: number;
  seller_additional_fee: number;
  seller_concession: number;
  seller_misc: number;
  seller_name: string;
  state: string;
  transaction_type: string;
  underwriting_fee: number;
  who_pays: string;
  zip_code: string;
};

export const defaultFinancingStatement: FinancingStatement = {
  address1: "",
  address2: "",
  appraisal_fee: 0,
  buyer_additional_fee: 0,
  buyer_misc: 0,
  buyer_name: "",
  city: "",
  closing_date: null,
  commission: 0,
  company: "",
  county: "",
  email: "",
  endorsements: [],
  escrow_deposit: 0,
  first_payoff: 0,
  has_hoa: false,
  hoa_insurance: 0,
  hoa_monthly: 0,
  lender_application_fee: 0,
  lender_fee: 0,
  lender_name: "",
  loan: 0,
  loan_points: 0,
  prepaid_interest: 0,
  price: 0,
  property_tax: 0,
  second_payoff: 0,
  seller_additional_fee: 0,
  seller_concession: 0,
  seller_misc: 0,
  seller_name: "",
  state: "FL",
  transaction_type: "Financing",
  underwriting_fee: 0,
  who_pays: "",
  zip_code: "",
};

export type FinancingStatementRequest = FinancingStatement & {
  cell_phone?: string;
  email: string;
  endorsements?: number[];
  first_name?: string;
  last_name?: string;
};
