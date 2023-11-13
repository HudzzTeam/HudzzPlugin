import { AxiosResponse } from "axios";
import { CashStatementRequest } from "../types/CashStatement";
import { FinancingStatementRequest } from "../types/FinancingStatement";
import { SellerNetSheetStatementRequest } from "../types/SellerNetSheetStatement";
import { api } from "./axiosConfig";

export const StatementApi = {
  create: async function (
    data: CashStatementRequest | FinancingStatementRequest | SellerNetSheetStatementRequest,
  ): Promise<AxiosResponse> {
    const response = await api.post("hud/preview/", data);

    return response; //TODO: Success/fail response
  },
};
