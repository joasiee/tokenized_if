import { organization, workgroup } from "./index";
import { Document, Schema, model } from "mongoose";
import { Organization, OrgRegistry, Workgroup } from "@tokenized_if/shared/src/proto/organizations_pb";

// Enforces Mongoose schema fields to protobuf schema.
const schemaFields: Record<keyof OrgRegistry.AsObject, any> = {
  address: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  orgsList: [organization.schema],
  groupsList: [workgroup.schema],
};

// instantiate schema, interface and model
export const schema = new Schema(schemaFields);
export interface IOrgRegistry extends OrgRegistry.AsObject, Document {}
export const db = model<IOrgRegistry>("OrgRegistry", schema);

/**
 * Converts mongoose model to protobuf class.
 * @param model
 * @returns
 */
export function fromModel(model: IOrgRegistry): OrgRegistry {
  const orgs = model.orgsList.map(function (org) {
    return new Organization()
      .setAddress(org.address)
      .setMsgkey(org.msgkey)
      .setMsgurl(org.msgurl)
      .setName(org.name)
      .setZkpkey(org.zkpkey);
  });
  const groups = model.groupsList.map(function (group) {
    return new Workgroup()
      .setName(group.name)
      .setShieldaddress(group.shieldaddress)
      .setTokenaddress(group.tokenaddress)
      .setVerifieraddress(group.verifieraddress)
      .setWorkstep(group.workstep);
  });
  return new OrgRegistry().setAddress(model.address).setName(model.name).setOrgsList(orgs).setGroupsList(groups);
}
