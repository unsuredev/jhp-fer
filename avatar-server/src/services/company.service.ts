import BaseService from "../policies/base_service";
import { db } from "../models/db";
import { ICompany, IResp } from "src/models/types";
export class CompanyService extends BaseService {
  constructor() {
    super();
  }
  /**
   * create a company
   * @param company ICompany
   * @returns created company details
   */
  addACompany = async (company: ICompany): Promise<IResp<ICompany>> => {
    try {
      const result = await db.companies.create(company);
      return this.successRESP(result, "Company registered successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  /**
   * find companies
   * @returns companies
   */
  searchCompanies = async (): Promise<IResp<ICompany[]>> => {
    try {
      const results = await db.companies.find({}).exec();

      return this.successRESP(results, "Fetched successfully.");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  /**
   * update a company
   * @param companyId
   * @param company
   * @returns updated company
   */
  updateACompany = async (companyId: string, company: ICompany): Promise<IResp<ICompany>> => {
    try {
      const result = await db.companies.findByIdAndUpdate(companyId, { $set: company }, { new: true }).exec();

      return this.successRESP(result, "Updated successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  /**
   * remove a company. It just update company disabled status as true
   * @param companyId
   * @returns updated company details
   */
  removeACompany = async (companyId: string, updatedBy: string): Promise<IResp<ICompany>> => {
    try {
      const result = await db.companies.findByIdAndUpdate(companyId, { $set: { isDisabled: true, updatedBy: updatedBy } }, { new: true }).exec();

      return this.successRESP(result, "Removed company successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
}
