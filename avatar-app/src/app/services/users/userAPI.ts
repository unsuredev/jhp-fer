// A mock function to mimic making an async request for data
import { IUser } from "definitions/app/user";
import { handleErrorResp, httpClient } from "../UtilServices";

export async function searchUsers(companyId: string) {
  try {
    return await httpClient<any>(`user/getall`, "GET", {});
  } catch (err) {
    return handleErrorResp(err);
  }
}
export async function addAUser(data: IUser) {
  try {
    return await httpClient<any>(`user`, "PUT", data);
  } catch (err) {
    return handleErrorResp(err);
  }
}
export async function updateAUser(data: IUser) {
  try {
    return await httpClient<any>(`user/${data._id}`, "PATCH", data);
  } catch (err) {
    return handleErrorResp(err);
  }
}
