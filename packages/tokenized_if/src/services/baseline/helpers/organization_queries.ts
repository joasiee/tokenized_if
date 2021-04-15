import { Organization } from "@tokenized_if/shared/src/proto/organizations_pb";
import { Participant } from "../../../models/participant";
import { getOrgRegistry } from "../organizations";

export function mapOrganizationToParticipant(organization: Organization, role: string): Participant {
  return {
    name: organization.getName(),
    address: organization.getAddress(),
    nats: organization.getMsgurl(),
    nats_key: organization.getMsgkey(),
    zkp_key: organization.getZkpkey(),
    role: role,
  };
}

export const getAll = async function () : Promise<Participant[]> {
  return (await getFinancers()).concat(await getImporters());
}

export const getFinancers = async function () : Promise<Participant[]> {
  const orgRegistry = getOrgRegistry("financer-registry");
  return (await orgRegistry).getOrgsList().map(o => mapOrganizationToParticipant(o, "financer"));
}

export const getFinancer = async function (name: string) : Promise<Participant> {
  return (await getFinancers()).find(s => s.name === name);
}

export const getImporters = async function () : Promise<Participant[]> {
  const orgRegistry = getOrgRegistry("importer-registry");
  return (await orgRegistry).getOrgsList().map(o => mapOrganizationToParticipant(o, "importer"));
}

export const getImporter = async function (name: string) : Promise<Participant> {
  return (await getImporters()).find(s => s.name === name);
}

export const getLsp = async function () : Promise<Participant> {
  const orgRegistry = getOrgRegistry("lsp-registry");
  return mapOrganizationToParticipant((await orgRegistry).getOrgsList()[0], "lsp");
}