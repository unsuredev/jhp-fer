import BaseController from "../policies/base_controller";
import { Request, Response, Next } from "restify";
import { SystemUserService } from "../services/systemUser.service";
import * as Joi from "joi";

export class SystemUserController extends BaseController {
  constructor(protected readonly systemUserService: SystemUserService = new SystemUserService()) {
    super();
  }

  private systemUserSchema = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string().optional().allow(""),
    lastName: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female").required(),
    email: Joi.string().required().lowercase(),
    password: Joi.string().required(),
    type: Joi.string().required().valid("Admin"),
  });

  registerASystemUser = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const payload = await this.systemUserSchema.validateAsync(req.body, { stripUnknown: true });

      const result = await this.systemUserService.registerASystemUser(payload);

      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  authASystemUser = async (req: Request, res: Response, next: Next): Promise<any> => {
    try {
      const authSchema = Joi.object({
        email: Joi.string().required().lowercase(),
        password: Joi.string().required(),
      });
      const payload = await authSchema.validateAsync(req.body, { stripUnknown: true });
      const result = await this.systemUserService.authSystemUser(payload.email, payload.password);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };
}
