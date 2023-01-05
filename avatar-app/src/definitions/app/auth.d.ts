export interface ILogin {
  email: string;
  password: string;
  login_type: string;
}

export interface ILoginUser {
  _id: string;
  fullName: string;
  type: string;
  email: string;
  companyId?: string;
  type: string;
}
