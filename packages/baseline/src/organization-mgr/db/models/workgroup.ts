import { utils } from "ethers";
import { Document, Schema, model } from "mongoose";
import { Workgroup } from "@tokenized_if/shared/src/proto/organizations_pb";

const schemaFields: Record<keyof Workgroup.AsObject, any> = {
  name: { type: String, required: true },
  tokenaddress: { type: String },
  shieldaddress: { type: String, required: true },
  verifieraddress: { type: String, required: true },
  workstep: { type: Number },
};

export const schema = new Schema(schemaFields);
export interface IWorkgroup extends Workgroup.AsObject, Document {}
export const db = model<IWorkgroup>("Workgroup", schema);

export function fromModel(model: IWorkgroup): Workgroup {
  return new Workgroup()
    .setName(model.name)
    .setShieldaddress(model.shieldaddress)
    .setTokenaddress(model.tokenaddress)
    .setVerifieraddress(model.verifieraddress)
    .setWorkstep(model.workstep);
}

export function fromContract(group: {
  name: string;
  tokenAddress: string;
  shieldAddress: string;
  verifierAddress: string;
}) {
  return new Workgroup()
    .setName(utils.parseBytes32String(group.name))
    .setTokenaddress(group.tokenAddress)
    .setShieldaddress(group.shieldAddress)
    .setVerifieraddress(group.verifierAddress);
}
