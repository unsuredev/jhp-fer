import BaseController from "../policies/base_controller";
import { Request, Response, Next } from "restify";
import { UserService } from "../services/user.service";
import * as Joi from "joi";

export class UserController extends BaseController {
  constructor(protected readonly userService: UserService = new UserService()) {
    super();
  }

  private userSchema = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string().optional().allow(""),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    email: Joi.string().required().lowercase(),
    type: Joi.string().required().valid("Admin"),
  });

  addAUser = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const schema = this.userSchema.keys({
        password: Joi.string().required(),
      });
      const payload = await schema.validateAsync(req.body, { stripUnknown: true });
      this.setCreatedBy(req, payload);
      this.setUpdatedBy(req, payload);
      this.setCompanyId(req, payload);
      const result = await this.userService.addAUser(payload);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  getAUserDetails = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const userId = req.params.userId;
      const result = await this.userService.getAUserDetail(userId);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  updateUser = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const updateCustomerSchema = this.userSchema;
      const userId = req.params.userId;
      const payload = await updateCustomerSchema.validateAsync(req.body, { stripUnknown: true });
      const result = await this.userService.updateAUser(userId, payload);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  removeAUser = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const userId = req.params.userId;
      const result = await this.userService.removeAUser(userId, req.username);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  searchUsers = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const schema = Joi.object().keys({
        companyId: Joi.string().optional().empty(""),
      });
      const payload = await schema.validateAsync(req.body, { stripUnknown: true });
      const result = await this.userService.searchUsers(payload);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  authAUser = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const authSchema = Joi.object({
        email: Joi.string().required().lowercase(),
        password: Joi.string().required(),
      });
      const payload = await authSchema.validateAsync(req.body, { stripUnknown: true });
      const result = await this.userService.authUser(payload.email, payload.password);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };
}
