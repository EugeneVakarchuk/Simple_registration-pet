import $api from "../http"
import { AxiosResponse } from "axios"
import { AuthResponse } from "../models/response/AuthResponse"


export default class AuthService {

  // Declare request to /login endpoint.
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', {
      email,
      password,
    });
  };

  // Declare request to /registration endpoint.
  static async registration(username: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', {
      username,
      email,
      password,
    });
  };

  // Declare request to /logout endpoint.
  static async logout(): Promise<void> {
    return $api.post('/logout');
  };
};
