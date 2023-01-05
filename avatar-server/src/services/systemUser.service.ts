import BaseService from "../policies/base_service";
import { IAuthResp, IResp, ISystemUser } from "../models/types";
import { db } from "../models/db";
import { sign } from "jsonwebtoken";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";
export class SystemUserService extends BaseService {
  constructor() {
    super();
  }
  registerASystemUser = async (user: ISystemUser): Promise<IResp<ISystemUser>> => {
    try {
      const enc = { ...user, createdBy: "David", updatedBy: "David" };
      enc.password = hashSync(enc.password, genSaltSync(12));
      let userResp = await db.systemUsers.create(enc);
      if (userResp == null) throw "unable to create a user";

      userResp = userResp.toObject();
      delete userResp.password;
      delete userResp.createdAt;
      delete userResp.updatedAt;

      return this.successRESP(userResp, "System user account created successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  authSystemUser = async (email: string, password: string): Promise<IResp<IAuthResp>> => {
    try {
      let foundOne = await db.systemUsers.findOne({ email: email }).exec();
      if (foundOne == null) throw "No System User Found.";

      foundOne = foundOne.toObject();

      const isMatch = compareSync(password, foundOne.password);
      if (!isMatch) return this.errorRESP("Wrong email/password");

      // delete things not to disclose to the world
      delete foundOne.password;
      delete foundOne.createdAt;
      delete foundOne.updatedAt;

      foundOne["isSystemUser"] = true;
      // create jwt token
      const jwtOptions = {};
      const token = sign(foundOne, process.env.SYSTEM_USER_SECRET, jwtOptions);

      return this.successRESP({ token: token }, "Authenticated successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
}
