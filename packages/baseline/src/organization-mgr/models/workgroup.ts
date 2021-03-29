import { Document, Schema, model } from "mongoose";
import { Workgroup } from "@tokenized_if/shared/src/proto/organizations_pb";

const schemaFields: Record<keyof Workgroup.AsObject, any> = {
  name: { type: String, required: true },
  tokenaddress: String,
  shieldaddress: { type: String, required: true },
  verifieraddress: { type: String, required: true },
  workstep: Number,
};

export interface IWorkgroup extends Workgroup.AsObject, Document {}

const schema = new Schema(schemaFields);
export const db = model<IWorkgroup>("Workgroup", schema);

export function fromModel(model: IWorkgroup): Workgroup {
  return new Workgroup()
    .setName(model.name)
    .setShieldaddress(model.shieldaddress)
    .setTokenaddress(model.tokenaddress)
    .setVerifieraddress(model.verifieraddress)
    .setWorkstep(model.workstep);
}
