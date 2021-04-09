import * as grpc from '@grpc/grpc-js';
import { OrganizationsClient } from '@tokenized_if/shared/src/proto/organizations_grpc_pb';
import { AddGroupRequest, AddOrgRequest, Organization, OrgRegistry, Workgroup } from '@tokenized_if/shared/src/proto/organizations_pb';
import { Participant } from '../../models/participant';

const client = new OrganizationsClient(
  `localhost:${process.env.BASELINE_PORT}`,
  grpc.credentials.createInsecure(),
);

export async function getOrgRegistry(name: string, address?: string): Promise<OrgRegistry> {
  return new Promise<OrgRegistry>((resolve, reject) => {
    const registry = new OrgRegistry();
    registry.setName(name);
    registry.setAddress(address);
    client.getOrgRegistry(registry, (err, registry) => {
      if (err) {
        return reject(err);
      }
      return resolve(registry);
    });
  });
};

export function deployOrgRegistry(name: string): Promise<OrgRegistry> {
  return new Promise<OrgRegistry>((resolve, reject) => {
    const registry = new OrgRegistry();
    registry.setName(name);
    client.deployOrgRegistry(registry, (err, registry) => {
      if (err) {
        return reject(err);
      }
      return resolve(registry);
    });
  });
};

function mapParticipantToOrganization(participant: Participant): Organization {
  return new Organization()
    .setName(participant.name)
    .setAddress(participant.address)
    .setMsgurl(participant.nats)
    .setMsgkey(participant.nats_key)
    .setZkpkey(participant.zkp_key);
}

export function addOrganization(participant: Participant): Promise<OrgRegistry> {
  return new Promise<OrgRegistry>((resolve, reject) => {
    const registry = new OrgRegistry().setName(`${participant.role}-registry`);
    const organization = mapParticipantToOrganization(participant);
    const req = new AddOrgRequest().setRegistry(registry).setOrganization(organization);
    client.addOrganization(req, (err, registry) => {
      if (err) {
        return reject(err);
      }
      return resolve(registry);
    });
  });
};

export function addWorkgroup(verifierAddress: string, tokenRegistryAddress: string): Promise<OrgRegistry> {
  return new Promise<OrgRegistry>((resolve, reject) => {
    const registry = new OrgRegistry().setName('importer-registry');
    const workgroup = new Workgroup()
      .setName('importer-workgroup')
      .setVerifieraddress(verifierAddress)
      .setTokenaddress(tokenRegistryAddress);
    const req = new AddGroupRequest().setRegistry(registry).setWorkgroup(workgroup);
    client.addWorkgroup(req, (err, registry) => {
      if (err) {
        return reject(err);
      }
      return resolve(registry);
    });
  });
};