import { Document, Schema, model, Mixed } from "mongoose";
import { Organization, OrgRegistry, Workgroup } from "@tokenized_if/shared/src/proto/organizations_pb";

const schemaFields: Record<keyof OrgRegistry.AsObject, any> = {
  address: { type: String, required: true, unique: true },
  name: String,
  orgsList: Schema.Types.Mixed,
  groupsList: Schema.Types.Mixed,
};

export interface IOrgRegistry extends OrgRegistry.AsObject, Document {}

const schema = new Schema(schemaFields);
export const db = model<IOrgRegistry>("OrgRegistry", schema);

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
