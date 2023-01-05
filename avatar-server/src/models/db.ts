import { createConnection, set } from "mongoose";

import * as SCHEMAS from "./schemas";
import * as DB_TYPES from "./types/db";

const MONGODB_URI = process.env.MONGO_PATH;
set("debug", true);
// set("useCreateIndex", true);
// set("useFindAndModify", false);

const connection = createConnection(MONGODB_URI, { autoIndex: true });

export const db = {
  systemUsers: connection.model<DB_TYPES.ISystemUser>("system-users", SCHEMAS.systemUserSchema),
  users: connection.model<DB_TYPES.IUser>("users", SCHEMAS.userSchema),
  companies: connection.model<DB_TYPES.ICompany>("companies", SCHEMAS.companySchema),
  customers: connection.model<DB_TYPES.ICustomer>("customers", SCHEMAS.customerSchema),
  savingsAccounts: connection.model<DB_TYPES.ISavingsAccount>("savings-accounts", SCHEMAS.savingsAccountSchema),
  loanAccounts: connection.model<DB_TYPES.ILoanAccount>("loan-accounts", SCHEMAS.loanAccountSchema),
};
