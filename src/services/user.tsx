/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "./api";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/api/auth/local", {
      identifier: email,
      password: password,
    });

    const token = response.data.jwt;
    localStorage.setItem("jwt", token);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

export const register = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const response = await api.post("/api/auth/local/register", {
      username,
      email,
      password,
    });

    const token = response.data.jwt;
    localStorage.setItem("jwt", token);
    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};
