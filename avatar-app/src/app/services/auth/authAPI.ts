// A mock function to mimic making an async request for data
import { handleErrorResp, httpClient } from "../UtilServices";

export async function loginUser(
  email: string,
  password: string,
  login_type: string
) {
  try {
    return await httpClient<any>(`user/login`, "POST", {
      email,
      password,
      login_type,
    });
  } catch (err) {
    return handleErrorResp(err);
  }
}
