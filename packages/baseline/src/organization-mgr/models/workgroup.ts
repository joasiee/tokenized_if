import { Document, Schema, model } from "mongoose";
import { Workgroup } from "@tokenized_if/shared/src/proto/organizations_pb";

const schemaFields: Record<keyof Workgroup.AsObject, any> = {
  name: { type: String, required: true },
  tokenaddress: String,
  shieldaddress: { type: String, required: true },
  verifieraddress: { type: String, required: true },
  workstep: Number,
};

export interface IWorkgroupDoc extends Workgroup.AsObject, Document {}

const schema = new Schema(schemaFields);
export const WorkgroupModel = model<IWorkgroupDoc>("Workgroup", schema);
