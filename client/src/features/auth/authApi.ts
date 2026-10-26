import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUser } from "../../utils/types";

export interface BaseAuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export type SignupResponse = Pick<BaseAuthResponse, "message">;
export type SigninResponse = BaseAuthResponse;
export type VerifyResponse = { user: IUser; token: string };
export type RefreshResponse = Pick<BaseAuthResponse, "accessToken">;

export interface BaseAuthArgs {
  username: string;
  email: string;
  password: string;
  token: string;
}

export type SignupArgs = Omit<BaseAuthArgs, "token">;
export type SigninArgs = Pick<BaseAuthArgs, "email" | "password">;
export type VerifyArgs = Pick<BaseAuthArgs, "token">;
export type RefreshArgs = {
  refreshToken: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/auth/",
  }),
  endpoints: (build) => ({
    signup: build.mutation<SignupResponse, SignupArgs>({
      query: (body) => ({
        url: "signup",
        method: "POST",
        body,
      }),
    }),
    signin: build.mutation<SigninResponse, SigninArgs>({
      query: (body) => ({
        url: "signin",
        method: "POST",
        body,
      }),
    }),
    verify: build.mutation<VerifyResponse, VerifyArgs>({
      query: (body) => ({
        url: "verify",
        method: "PATCH",
        body,
      }),
    }),
    refresh: build.mutation<RefreshResponse, RefreshArgs>({
      query: (body) => ({
        url: "refresh",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useVerifyMutation,
  useRefreshMutation,
} = authApi;
