import { PUBLIC_API } from "@/constants/api.constant";
import { baseApi } from "../base-api";
import { useMutation } from "@tanstack/react-query";
import type {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from "./auth.dto";

interface AuthService {
  login: (req: LoginRequestDto) => Promise<LoginResponseDto>;
  register: (req: RegisterRequestDto) => Promise<RegisterResponseDto>;
}

const authService: AuthService = {
  login: async function (req) {
    const response = await baseApi.post(PUBLIC_API.login_post, req.data);
    return response.data;
  },
  register: async function (req) {
    const response = await baseApi.post(PUBLIC_API.register_post, req.data);
    return response.data;
  },
};

export const useLogin = () =>
  useMutation({
    mutationFn: authService.login,
  });

export const useRegister = () =>
  useMutation({
    mutationFn: authService.register,
  });
