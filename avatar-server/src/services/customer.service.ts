import BaseService from "../policies/base_service";
import { IResp, ICustomer } from "../models/types";
import { db } from "../models/db";
import { SavingsAccountService } from "./savingsAccount.service";

export class CustomerService extends BaseService {
  constructor(private readonly savingsAccountService: SavingsAccountService = new SavingsAccountService()) {
    super();
  }
  addACustomer = async (customer: ICustomer): Promise<IResp<ICustomer>> => {
    try {
      const enc = { ...customer };
      enc.customerNo = this.getCustomerNo();
      let customerResp = await db.customers.create(enc);
      if (customerResp == null) throw "unable to create a customer";
      customerResp = customerResp.toObject();
      // create a default customer savings accounts
      await this.savingsAccountService.createAnAccount({ companyId: customerResp.companyId, customerId: customerResp.id, createdBy: customerResp.createdBy, updatedBy: customerResp.updatedBy });

      delete customerResp.createdAt;
      delete customerResp.updatedAt;

      return this.successRESP(customerResp, "Customer created successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  getACustomerDetail = async (customerId: string): Promise<IResp<ICustomer[]>> => {
    try {
      const result = await db.customers.find({ _id: customerId }).select("-password").exec();
      return this.successRESP(result, "Fetched successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  updateACustomer = async (customerId: string, customer: ICustomer): Promise<IResp<ICustomer>> => {
    try {
      const result = await db.customers.findByIdAndUpdate(customerId, { $set: customer }, { new: true }).exec();
      return this.successRESP(result, "Customer updated successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  searchCustomers = async (searchQ: { companyId?: string }): Promise<IResp<ICustomer[]>> => {
    try {
      const query = {};
      if (searchQ.companyId) query["companyId"] = searchQ.companyId;
      const result = await db.customers.find(query).exec();
      return this.successRESP(result, "Fetched all customer successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  removeACustomer = async (customerId: string, updatedBy: string): Promise<IResp<ICustomer>> => {
    try {
      const result = await db.customers.findByIdAndUpdate(customerId, { $set: { isDisabled: true, updatedBy: updatedBy } }, { new: true }).exec();
      return this.successRESP(result, "Removed customer successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
}
