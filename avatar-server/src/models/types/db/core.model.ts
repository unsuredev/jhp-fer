import { Document as MongooseDocument } from "mongoose";

export interface Document extends MongooseDocument {
  createdAt?: Date;
  updatedAt?: Date;
  isDisabled?: boolean;
  updatedBy?: string;
  createdBy?: string;
}
