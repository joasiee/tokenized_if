import { Document, Schema, model } from "mongoose";
import { Organization } from "@tokenized_if/shared/src/proto/organizations_pb";

const schemaFields: Record<keyof Organization.AsObject, any> = {
  name: { type: String, required: true },
  address: { type: String, required: true, unique: true },
  msgurl: { type: String, required: true },
  msgkey: { type: String, required: true },
  zkpkey: { type: String, required: true },
};

export interface IOrgDoc extends Organization.AsObject, Document {}

const schema = new Schema(schemaFields);
export const OrgModel = model<IOrgDoc>("Organization", schema);
