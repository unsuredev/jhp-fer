"use strict";
import { Request, Response, Next } from "restify";
import jwt = require("jsonwebtoken");
import log4js = require("log4js");
import _ = require("lodash");
import { ISystemUser, IUser } from "src/models/types";
import * as Joi from "joi";

export default class BaseController {
  protected log: log4js.Logger;
  protected _: _.LoDashStatic;
  constructor() {
    this._ = _;
    this.log = log4js.getLogger(this.constructor.name);
  }

  /**
   * @param  {Request} restify http request
   * @returns User object.
   * (description) Gets the user from the restify request object by decoding the token.
   */
  protected getUser(req: Request): Promise<IUser | ISystemUser> {
    let user;

    let token = req.headers["at"] || req.params.token;

    if (!token && req.body && req.body.token) {
      token = req.body.token; // check in req body
    }

    // decode token
    if (token) {
      user = jwt.decode(token);
    }

    return user;
  }

  protected setUpdatedBy(req: Request, payload: any): void {
    if (payload) {
      payload.updatedBy = req.username;
    }
  }
  protected setCreatedBy(req: Request, payload: any): void {
    if (payload) {
      payload.createdBy = req.username;
    }
  }
  protected setCompanyId(req: Request, payload: any): void {
    const user: any = this.getUser(req);
    if (payload) {
      payload.companyId = user.companyId;
    }
  }

  /**
   * @param  {any} error object
   * @param  {Request} restify http request
   * @param  {Response} restify http response
   * @param  {Next} restify next handler
   * (description) sends the error response.
   */
  protected ErrorResult = (error: any, req: Request, res: Response, next: Next): void => {
    let finalMessage: string;
    if (error.errors !== undefined && error.errors.length > 0) {
      error.errors.map((x) => this.log.error(x));
    }
    if (typeof error === "string") {
      finalMessage = error;
    } else {
      finalMessage = error.name + " " + error.message;
    }
    const response = {
      success: false,
      message: finalMessage,
    };

    this.log.error(finalMessage);
    res.send(500, response);
    return next();
  };

  protected addressSchema = Joi.object().keys({
    landMark: Joi.string().required(),
    location: Joi.string().optional().allow(""),
    area: Joi.string().optional().allow(""),
    city: Joi.string().optional().allow(""),
    postalCode: Joi.string().required(),
  });
}
