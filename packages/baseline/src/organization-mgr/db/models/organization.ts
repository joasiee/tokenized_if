import { utils } from "ethers";
import { Document, Schema, model } from "mongoose";
import { Organization } from "@tokenized_if/shared/src/proto/organizations_pb";

// Enforces Mongoose schema fields to protobuf schema.
const schemaFields: Record<keyof Organization.AsObject, any> = {
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  msgurl: { type: String, required: true },
  msgkey: { type: String, required: true },
  zkpkey: { type: String, required: true },
};

// instantiate schema, interface and model
export const schema = new Schema(schemaFields);

/**
 * Converts data from smart contract to protobuf class.
 * @param org
 * @returns
 */
export function fromContract(org: {
  orgAddress: string;
  name: string;
  messagingEndpoint: string;
  whisperKey: string;
  zkpPublicKey: string;
  metadata: string;
}): Organization {
  return new Organization()
    .setName(utils.parseBytes32String(org.name))
    .setAddress(org.orgAddress)
    .setMsgurl(utils.toUtf8String(org.messagingEndpoint))
    .setMsgkey(utils.toUtf8String(org.whisperKey))
    .setZkpkey(utils.toUtf8String(org.zkpPublicKey));
}
