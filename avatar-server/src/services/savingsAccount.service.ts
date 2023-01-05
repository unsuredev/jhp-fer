import BaseService from "../policies/base_service";
import { ISavingsAccount } from "../models/types/db";
import { db } from "../models/db";
import { IResp } from "src/models/types";

export class SavingsAccountService extends BaseService {
  constructor() {
    super();
  }

  createAnAccount = async (data: { customerId: string; companyId: string; createdBy: string; updatedBy: string }): Promise<IResp<ISavingsAccount>> => {
    try {
      const obj = {
        ...data,
        accountNumber: this.getSavingAccountNo(),
      };
      const result = await db.savingsAccounts.create(obj);
      return this.successRESP(result, "Savings Account created successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
}
