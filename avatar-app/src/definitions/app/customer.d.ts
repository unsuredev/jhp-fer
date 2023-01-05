export interface ICustomer extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName?: string;
  gender: string;
  email: string;
  mobile: string;
  companyId: string;
}
