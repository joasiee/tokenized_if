import { utils } from "ethers";
import { Document, Schema, model } from "mongoose";
import { Organization } from "@tokenized_if/shared/src/proto/organizations_pb";

const schemaFields: Record<keyof Organization.AsObject, any> = {
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  msgurl: { type: String, required: true },
  msgkey: { type: String, required: true },
  zkpkey: { type: String, required: true },
};

export const schema = new Schema(schemaFields);
export interface IOrganization extends Organization.AsObject, Document {}
export const db = model<IOrganization>("Organization", schema);

export function fromModel(model: IOrganization): Organization {
  return new Organization()
    .setName(model.name)
    .setAddress(model.address)
    .setMsgurl(model.msgurl)
    .setMsgkey(model.msgkey)
    .setZkpkey(model.zkpkey);
}

export function fromContract(
  org: [string, string, string, string, string, string] & {
    orgAddress: string;
    name: string;
    messagingEndpoint: string;
    whisperKey: string;
    zkpPublicKey: string;
    metadata: string;
  }
): Organization {
  return new Organization()
    .setName(utils.parseBytes32String(org.name))
    .setAddress(org.orgAddress)
    .setMsgurl(utils.toUtf8String(org.messagingEndpoint))
    .setMsgkey(utils.toUtf8String(org.whisperKey))
    .setZkpkey(utils.toUtf8String(org.zkpPublicKey));
}
