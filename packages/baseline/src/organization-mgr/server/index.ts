import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { IOrganizationsServer } from "@tokenized_if/shared/src/proto/organizations_grpc_pb";
import { OrgRegistry, AddOrgRequest, AddGroupRequest } from "@tokenized_if/shared/src/proto/organizations_pb";
import { OrganizationsService } from "../service";

const service = new OrganizationsService();

export const OrganizationsServer: IOrganizationsServer = {
  getOrgRegistry: async (call: ServerUnaryCall<OrgRegistry, OrgRegistry>, callback: sendUnaryData<OrgRegistry>) => {
    const req = call.request as OrgRegistry;
    callback(null, await service.getRegistry(req));
  },
  deployOrgRegistry: async (call: ServerUnaryCall<OrgRegistry, OrgRegistry>, callback: sendUnaryData<OrgRegistry>) => {
    const req = call.request as OrgRegistry;
    callback(null, await service.deployRegistry(req));
  },
  addOrganization: async (call: ServerUnaryCall<AddOrgRequest, OrgRegistry>, callback: sendUnaryData<OrgRegistry>) => {
    const req = call.request as AddOrgRequest;
    callback(null, await service.addOrganization(req.getRegistry(), req.getOrganization()));
  },
  addWorkgroup: async (call: ServerUnaryCall<AddGroupRequest, OrgRegistry>, callback: sendUnaryData<OrgRegistry>) => {
    const req = call.request as AddGroupRequest;
    callback(null, await service.addWorkgroup(req.getRegistry(), req.getWorkgroup()));
  },
};
