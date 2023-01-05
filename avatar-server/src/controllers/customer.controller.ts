import BaseController from "../policies/base_controller";
import { Request, Response, Next } from "restify";
import { CustomerService } from "../services/customer.service";
import * as Joi from "joi";

export class CustomerController extends BaseController {
  constructor(protected readonly customerService: CustomerService = new CustomerService()) {
    super();
  }

  private customerCoreSchema = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string().optional().allow(""),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    mobile: Joi.string().required(),
    address: this.addressSchema,
  });

  addACustomer = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const customerSchema = this.customerCoreSchema.keys({
        email: Joi.string().required().lowercase(),
      });

      const payload = await customerSchema.validateAsync(req.body, { stripUnknown: true });
      this.setCreatedBy(req, payload);
      this.setUpdatedBy(req, payload);
      this.setCompanyId(req, payload);
      const result = await this.customerService.addACustomer(payload);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  getACustomerDetails = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const customerId = req.params.customerId;
      const result = await this.customerService.getACustomerDetail(customerId);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  updateCustomer = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const updateCustomerSchema = this.customerCoreSchema;
      const customerId = req.params.customerId;
      const payload = await updateCustomerSchema.validateAsync(req.body, { stripUnknown: true });
      const result = await this.customerService.updateACustomer(customerId, payload);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };
  searchCustomers = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const schema = Joi.object().keys({
        companyId: Joi.string().optional().empty(""),
      });
      const payload = await schema.validateAsync(req.body, { stripUnknown: true });

      const result = await this.customerService.searchCustomers(payload);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  removeACustomer = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const customerId = req.params.customerId;
      const result = await this.customerService.removeACustomer(customerId, req.username);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };
}
