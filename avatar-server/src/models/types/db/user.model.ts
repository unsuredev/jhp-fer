import { Document } from "./core.model";

export interface IUser extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  type: string; // Admin,
  companyId: string;
  userNo: string;
}
