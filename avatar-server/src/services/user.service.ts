import BaseService from "../policies/base_service";
import { IResp, IUser ,IAuthResp } from "../models/types";
import { db } from "../models/db";
import { sign } from "jsonwebtoken";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";

export class UserService extends BaseService {
  constructor() {
    super();
  }
  addAUser = async (user: IUser): Promise<IResp<IUser>> => {
    try {
      const enc = { ...user };
      enc.password = hashSync(enc.password, genSaltSync(12));
      enc.userNo = this.getUserNo();
      let userResp = await db.users.create(enc);
      if (userResp == null) throw "unable to create a user";
      userResp = userResp.toObject();
      delete userResp.password;
      delete userResp.createdAt;
      delete userResp.updatedAt;
      return this.successRESP(userResp, "User account created successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  getAUserDetail = async (userId: string): Promise<IResp<IUser[]>> => {
    try {
      const result = await db.users.find({ _id: userId }).select("-password").exec();
      return this.successRESP(result, "Fetched a user details successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  updateAUser = async (userId: string, user: IUser): Promise<IResp<IUser>> => {
    try {
      const result = await db.users.findByIdAndUpdate(userId, { $set: user }, { new: true }).exec();
      return this.successRESP(result, "User updated successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  getAllUser = async (): Promise<IResp<IUser[]>> => {
    try {
      const result = await db.users.find().exec();
      return this.successRESP(result, "Fetched all users successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  removeAUser = async (userId: string, updatedBy: string): Promise<IResp<IUser>> => {
    try {
      const result = await db.users.findByIdAndUpdate(userId, { $set: { isDisabled: true, updatedBy: updatedBy } }, { new: true }).exec();
      return this.successRESP(result, "Removed user successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  searchUsers = async (searchQ: { companyId?: string }): Promise<IResp<IUser[]>> => {
    try {
      const query = {};
      if (searchQ.companyId) query["companyId"] = searchQ.companyId;

      const result = await db.users.find(query).select("-password").exec();
      return this.successRESP(result, "Fetched successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  authUser = async (email: string, password: string): Promise<IResp<IAuthResp>> => {
    try {
      let foundOne = await db.users.findOne({ email: email }).exec();
      if (foundOne == null) return this.errorRESP("No User Found.");

      foundOne = foundOne.toObject();

      // const isMatch = compareSync(password, foundOne.password);
      // if (!isMatch) return this.errorRESP("Wrong email/password");

      // delete things not to disclose to the world
      delete foundOne.password;
      delete foundOne.createdAt;
      delete foundOne.updatedAt;

      // create jwt token
      const jwtOptions = {};
      const token = sign(foundOne, process.env.USER_SECRET, jwtOptions);

      return this.successRESP({ token: token }, "Authenticated successfully");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
}
