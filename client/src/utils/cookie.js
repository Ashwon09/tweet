import Cookies from "js-cookie";

const setCookie = (key, value) => {
  Cookies.set(key, value, {
    secure: true,
    sameSite: "Lax",
    expires: 7,
  });
};

const getCookie = (key) => {
  return Cookies.get(key);
};
export { setCookie, getCookie };
