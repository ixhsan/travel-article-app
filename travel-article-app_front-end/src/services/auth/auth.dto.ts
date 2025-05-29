import type { ApiRequest, BaseResponse } from "@/types/api-response.type";
import type { User } from "@/types/user.type";

export type LoginRequestDto = ApiRequest<
  Pick<User, "email" | "password">,
  undefined
>;

export type LoginResponseDto = BaseResponse<
  Pick<User, "id" | "name"> & {
    access_token: string;
  }
>;

export type RegisterRequestDto = ApiRequest<Omit<User, "id">, undefined>;

export type RegisterResponseDto = BaseResponse<Omit<User, "password">>;
