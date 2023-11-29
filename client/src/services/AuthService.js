import { secureAPI } from "./SecureAPIClient";
import { generalAPI } from "./GeneralAPIClient";

export function registerUserService(data) {
  return generalAPI.post("/auth/register", data);
}

export function loginService(data) {
  return generalAPI.post("/auth/login", data);
}

export function changePasswordService(data) {
  return secureAPI.patch("/auth/change-password", data);
}
