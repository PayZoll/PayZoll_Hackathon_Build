import { jwtDecode } from "jwt-decode";

export const verifyToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};
