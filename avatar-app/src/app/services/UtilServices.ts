import { IStandardAPIResponse } from "../../definitions/resp";
import environment from "environment";

const tokenKey = "jhp_token";

export async function httpClient<T>(
  url: string,
  type: string,
  obj: any = undefined
): Promise<IStandardAPIResponse<T>> {
  try {
    type = type.toUpperCase();
    if (type.toLowerCase() === "get" && obj) {
      const params = Object.keys(obj)
        .map(function (key) {
          if (typeof obj[key] === "object" && obj[key].length !== undefined) {
            let a = obj[key].map((e: any) => {
              return key + "=" + e;
            });
            return a.join("&");
          } else {
            return key + "=" + obj[key];
          }
        })
        .join("&");
      url += "?" + params;
      obj = undefined;
    }

    const res = await fetch(environment.api.base + "/" + url, {
      method: type.toUpperCase(),
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        access_token: getToken(),
      },
    });
    return await res.json();
  } catch (error) {
    console.group(`API ${type} Error`);
    console.error(error);
    console.groupEnd();
    throw error;
  }
}

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

export const handleErrorResp = (err: any): IStandardAPIResponse<any> => {
  console.error(err);
  return {
    success: "failure",
    data: err,
    message: "",
  };
};

export const parseJwt = (tokenParsed?: string) => {
  let token;
  if (!tokenParsed) {
    token = getToken();
  } else {
    token = tokenParsed;
  }
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  return undefined;
};

export const isTokenExpired = (tokenString: string | null) => {
  return !tokenString;
};
