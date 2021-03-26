import { Document, Schema, model } from "mongoose";
import { OrgRegistry } from "@tokenized_if/shared/src/proto/organizations_pb";

const schemaFields: Record<keyof OrgRegistry.AsObject, any> = {
  address: { type: String, required: true, unique: true },
};

export interface IOrgRegistry extends OrgRegistry.AsObject, Document {}

const schema = new Schema(schemaFields);
export const OrgRegistryModel = model<IOrgRegistry>("OrgRegistry", schema);

export function fromModel(model: IOrgRegistry): OrgRegistry {
  return new OrgRegistry().setAddress(model.address);
}
