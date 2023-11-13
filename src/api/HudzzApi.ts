import { AxiosResponse } from "axios";

import { api } from "./axiosConfig";

export const HudzzApi = {
  verify: async function (): Promise<AxiosResponse> {
    const response = await api.post("/plugin/verify/");
    return response; //TODO: Success/fail response
  },
};
