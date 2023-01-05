import { BASE_URL } from "../config/constant";

const tokenKey = "jhp_token";

const httpClient = async (url: string, type: string, obj: any = undefined) => {
  try {
    type = type.toUpperCase();
    if (type === "GET" && obj) {
      var params = Object.keys(obj)
        .map(function (key) {
          return key + "=" + obj[key];
        })
        .join("&");
      url += "?" + params;
      obj = undefined;
    }

    let res = await fetch(BASE_URL + url, {
      method: type,
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        encryption: "false",
        access_token: getToken(),
      } as any,
    });
    return await res.json();
  } catch (error) {
    // console.group(`API ${type} Error`);
    console.error(error);
    console.groupEnd();
    // throw error;
  }
};

export const setToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};
export const removeToken = () => {
  localStorage.removeItem(tokenKey);
};

export function getToken() {
  let res = localStorage.getItem(tokenKey);
  if (res === null || res === undefined) {
    return "";
  }
  return res;
}

export { httpClient };
