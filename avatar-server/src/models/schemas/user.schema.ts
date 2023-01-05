import { generateSchema } from "./core.schema";

export const userSchema = generateSchema({
  firstName: { type: String, require: true },
  middleName: { type: String, require: false },
  lastName: { type: String, require: true },
  gender: { type: String, require: true },
  email: { type: String, require: true, lowercase: true, unique: true },
  password: { type: String, require: true },
  type: { type: String, require: true, enum: ["Admin"] },
  companyId: { type: String, required: true },
  userNo: { type: String, required: true, unique: true },
});

userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + (this.middleName ? this.middleName + " " : "") + this.lastName;
});

userSchema.virtual("company", {
  ref: "companies",
  localField: "companyId",
  foreignField: "_id",
  justOne: true,
});
