import BaseService from "../policies/base_service";
import { IResp, ILoanAccount } from "../models/types";
import { db } from "../models/db";

export class LoanAccountService extends BaseService {
  constructor() {
    super();
  }
  addALoanAccount = async (loan: ILoanAccount): Promise<IResp<ILoanAccount>> => {
    try {
      const enc = { ...loan };
      enc.accountNumber = this.getLoanAccountNo();
      let loanResp = await db.loanAccounts.create(enc);
      if (loanResp == null) throw "unable to create a loan account";
      loanResp = loanResp.toObject();

      delete loanResp.createdAt;
      delete loanResp.updatedAt;

      return this.successRESP(loanResp, "Loan account created successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  getALoanAccountDetails = async (customerId: string): Promise<IResp<ILoanAccount[]>> => {
    try {
      const result = await db.loanAccounts.find({ _id: customerId }).select("-password").exec();
      return this.successRESP(result, "Fetched successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  updateALoanAccount = async (customerId: string, customer: ILoanAccount): Promise<IResp<ILoanAccount>> => {
    try {
      const result = await db.loanAccounts.findByIdAndUpdate(customerId, { $set: customer }, { new: true }).exec();
      return this.successRESP(result, "Loan account updated successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  searchLoanAccounts = async (searchQ: { companyId?: string }): Promise<IResp<ILoanAccount[]>> => {
    try {
      const query = {};
      if (searchQ.companyId) query["companyId"] = searchQ.companyId;
      const result = await db.loanAccounts.find(query).exec();
      return this.successRESP(result, "Fetched all loan accounts successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  removeALoanAccount = async (customerId: string, updatedBy: string): Promise<IResp<ILoanAccount>> => {
    try {
      const result = await db.loanAccounts.findByIdAndUpdate(customerId, { $set: { isDisabled: true, updatedBy: updatedBy } }, { new: true }).exec();
      return this.successRESP(result, "Removed loan account successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
}
