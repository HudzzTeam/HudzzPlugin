import { CashStatementRequest } from "./CashStatement";

export const validCashStatement: CashStatementRequest = {
  address1: "123 Main St",
  address2: "Apt 456",
  buyer_additional_fee: 100,
  buyer_misc: 50,
  buyer_name: "John Buyer",
  cell_phone: "5551234567",
  city: "Alachua",
  closing_date: "1993-12-30",
  commission: 2000,
  company: "2",
  county: "3100",
  email: "thenate113@gmail.com",
  endorsements: [],
  escrow_deposit: 1000,
  first_name: "John",
  first_payoff: 50000,
  has_hoa: true,
  hoa_monthly: 100,
  last_name: "Doe",
  price: 350000,
  property_tax: 1500,
  second_payoff: 20000,
  seller_additional_fee: 75,
  seller_concession: 1000,
  seller_misc: 30,
  seller_name: "Jane Seller",
  state: "FL",
  transaction_type: "Cash",
  underwriting_fee: 400,
  who_pays: "Buyer",
  zip_code: "12345",
};
