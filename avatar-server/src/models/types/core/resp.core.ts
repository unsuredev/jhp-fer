export interface IResp<T> {
  success: boolean;
  message: string;
  payload?: T;
}

export interface IAuthResp {
  token: string;
}
