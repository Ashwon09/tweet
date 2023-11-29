import { generalAPI } from "./GeneralAPIClient";

export function loadUserInfo(id) {
  return generalAPI.get(`/auth/${id}`);
}
