import BaseController from "../policies/base_controller";
import { Request, Response, Next } from "restify";
import { LoanAccountService } from "../services/loanAccount.service";
import * as Joi from "joi";

export class LoanAccountController extends BaseController {
  constructor(protected readonly loanAccountService: LoanAccountService = new LoanAccountService()) {
    super();
  }

  private loanAccountJoiSchema = Joi.object().keys({
    customerId: Joi.string().required(),
    loanAmount: Joi.number().required(),
    contractDate: Joi.string().required(),
    emiStartDate: Joi.string().required(),
    maturityDate: Joi.string().required(),
    paymentFrequency: Joi.string().required(),
    terms: Joi.number().required(),
    gracePeriod: Joi.number().required(),
    installmentAmount: Joi.number().required(),
    interestCalcType: Joi.string().required(),
  });

  private loanAccountUpadteJoiSchema = Joi.object().keys({
    loanAmount: Joi.number().required(),
    contractDate: Joi.string().required(),
    emiStartDate: Joi.string().required(),
    maturityDate: Joi.string().required(),
    paymentFrequency: Joi.string().required(),
    terms: Joi.number().required(),
    gracePeriod: Joi.number().required(),
    installmentAmount: Joi.number().required(),
    interestCalcType: Joi.string().required(),
  });

  addALoanAccount = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const payload = await this.loanAccountJoiSchema.validateAsync(req.body, { stripUnknown: true });
      this.setCreatedBy(req, payload);
      this.setUpdatedBy(req, payload);
      this.setCompanyId(req, payload);
      const result = await this.loanAccountService.addALoanAccount(payload);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };
  getALoanAccountDetails = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const loanId = req.params.loanId;
      const result = await this.loanAccountService.getALoanAccountDetails(loanId);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  updateALoanAccount = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const loanId = req.params.loanId;
      const payload = await this.loanAccountUpadteJoiSchema.validateAsync(req.body, { stripUnknown: true });
      this.setUpdatedBy(req, payload);
      const result = await this.loanAccountService.updateALoanAccount(loanId, payload);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  searchLoanAccounts = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const schema = Joi.object().keys({
        companyId: Joi.string().optional().empty(""),
      });
      const payload = await schema.validateAsync(req.body, { stripUnknown: true });
      const result = await this.loanAccountService.searchLoanAccounts(payload);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  removeALoanAccount = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const loanId = req.params.loanId;
      const result = await this.loanAccountService.removeALoanAccount(loanId, req.username);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };
}
