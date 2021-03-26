import { Document, Schema, model } from "mongoose";
import { OrgRegistry } from "@tokenized_if/shared/src/proto/organizations_pb";

const schemaFields: Record<keyof OrgRegistry.AsObject, any> = {
  address: { type: String, required: true, unique: true },
};

export interface IOrgRegDoc extends OrgRegistry.AsObject, Document {}

const schema = new Schema(schemaFields);
export const OrgRegModel = model<IOrgRegDoc>("OrgRegistry", schema);
