import { CallbackWithoutResultAndOptionalError, Schema as MongooseSchema, SchemaDefinition, SchemaOptions } from "mongoose";

const schemaOptions: SchemaOptions = {
  timestamps: true,
  versionKey: false,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
};

/**
 * Methods to create schema. Here we attach common method and functionality
 * @param schemaDefinition SchemaDefinition
 * @param options SchemaOptions
 * @returns MongooseSchema
 */
export function generateSchema(schemaDefinition: SchemaDefinition, options: SchemaOptions = {}): MongooseSchema {
  // default value for all schema
  schemaDefinition["isDisabled"] = { type: Boolean, default: false, required: true };
  schemaDefinition["updatedBy"] = { type: String, required: true };
  schemaDefinition["createdBy"] = {
    type: String,
    required: true,
  };
  const schema = new MongooseSchema(schemaDefinition, { ...schemaOptions, ...options });

  // pre middleware for find queries
  schema.pre("find", preHookForFindQuery);
  schema.pre("findOne", preHookForFindQuery);
  schema.pre("findOneAndDelete", preHookForFindQuery);
  schema.pre("findOneAndRemove", preHookForFindQuery);
  schema.pre("findOneAndUpdate", preHookForFindQuery);
  // schema.pre("aggregate", preHookForFindQuery); // todo find how to ignore disabled docs

  // // pre middleware when we save docs
  // schema.pre("validate", function (next) {
  //   this.set({ updatedBy: "David" }); // todo replace with the user fullName
  //   next();
  // });

  return schema;
}

/**
 * Pre hook function for find queries. It ignores all disabled documents
 * @param next CallbackWithoutResultAndOptionalError
 */
export function preHookForFindQuery(next: CallbackWithoutResultAndOptionalError): void {
  if (!("isDisabled" in this.getQuery())) this.where("isDisabled").equals(false);
  next();
}
