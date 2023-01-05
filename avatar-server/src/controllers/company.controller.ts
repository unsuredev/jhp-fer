import BaseController from "../policies/base_controller";
import { Request, Response, Next } from "restify";
import { CompanyService } from "../services/company.service";
import * as Joi from "joi";

export class CompanyController extends BaseController {
  constructor(protected readonly companyService: CompanyService = new CompanyService()) {
    super();
  }

  private companySchema = Joi.object().keys({
    name: Joi.string().required(),
    // username: Joi.string().required().lowercase(),
  });

  addACompany = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const payload = await this.companySchema
        .keys({
          username: Joi.string().required().lowercase(),
        })
        .validateAsync(req.body, { stripUnknown: true });
      this.setCreatedBy(req, payload);
      this.setUpdatedBy(req, payload);
      const result = await this.companyService.addACompany(payload);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  updateACompany = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const companyId = req.params.companyId;
      const payload = await this.companySchema.validateAsync(req.body, { stripUnknown: true });
      this.setUpdatedBy(req, payload);
      const result = await this.companyService.updateACompany(companyId, payload);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  removeACompany = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const companyId = req.params.companyId;
      const result = await this.companyService.removeACompany(companyId, req.username);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  searchCompanies = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const result = await this.companyService.searchCompanies();
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };
}
