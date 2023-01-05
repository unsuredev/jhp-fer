"use strict";
import log4js = require("log4js");
import _ = require("lodash");
import { IResp } from "../models/types/core/resp.core";
import { customAlphabet } from "nanoid";

export default class BaseService {
  protected log: log4js.Logger;
  protected _: _.LoDashStatic;
  constructor() {
    this._ = _;
    this.log = log4js.getLogger(this.constructor.name);
  }

  protected successRESP<T = unknown>(payload?: T, msg = "Success"): IResp<T> {
    return { success: true, message: msg, payload: payload };
  }
  protected errorRESP(msg = "Error"): IResp<null> {
    return { success: false, message: msg, payload: null };
  }

  protected getUserNo(role?: string): string {
    const generate = customAlphabet("1234567890", 6);
    return "U" + (role ?? "") + generate();
  }
  protected getCustomerNo(): string {
    const generate = customAlphabet("1234567890", 6);
    return "C" + generate();
  }
  protected getSavingAccountNo(): string {
    const generate = customAlphabet("1234567890", 10);
    return "S" + generate();
  }
  protected getLoanAccountNo(): string {
    const generate = customAlphabet("1234567890", 10);
    return "L" + generate();
  }
}
