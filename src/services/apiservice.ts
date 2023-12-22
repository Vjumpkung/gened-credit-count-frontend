import { ApiService } from "./axiosInstance";

export const apiService = new ApiService(
  process.env.NEXT_PUBLIC_API_URL?.toString()
    ? process.env.NEXT_PUBLIC_API_URL?.toString()
    : ""
);
