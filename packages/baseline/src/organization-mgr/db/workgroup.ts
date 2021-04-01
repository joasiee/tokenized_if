import { utils } from "ethers";
import { Schema } from "mongoose";
import { Workgroup } from "@tokenized_if/shared/src/proto/organizations_pb";

// Enforces Mongoose schema fields to protobuf schema.
const schemaFields: Record<keyof Workgroup.AsObject, any> = {
  name: { type: String, required: true },
  tokenaddress: { type: String },
  shieldaddress: { type: String, required: true },
  verifieraddress: { type: String, required: true },
  workstep: { type: Number, default: 0 },
};

// instantiate schema, interface and model
export const schema = new Schema(schemaFields);

/**
 * Converts data from smart contract to protobuf class.
 * @param group
 * @returns
 */
export function fromContract(group: {
  name: string;
  tokenAddress: string;
  shieldAddress: string;
  verifierAddress: string;
}) {
  return new Workgroup()
    .setName(utils.parseBytes32String(group.name))
    .setTokenaddress(group.tokenAddress.toLowerCase())
    .setShieldaddress(group.shieldAddress.toLowerCase())
    .setVerifieraddress(group.verifierAddress.toLowerCase());
}
