import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { IOrganizationsServer } from "@tokenized_if/shared/src/proto/organizations_grpc_pb";
import { OrgRegistry } from "@tokenized_if/shared/src/proto/organizations_pb";
import { OrganizationsService } from "../service";

const service = new OrganizationsService();

export const OrganizationsServer: IOrganizationsServer = {
  getOrgRegistry: async (
    call: ServerUnaryCall<OrgRegistry, OrgRegistry>,
    callback: sendUnaryData<OrgRegistry>
  ): Promise<void> => {
    const req = call.request as OrgRegistry;
    callback(null, await service.getRegistry(req));
  },
  deployOrgRegistry: async (
    call: ServerUnaryCall<OrgRegistry, OrgRegistry>,
    callback: sendUnaryData<OrgRegistry>
  ): Promise<void> => {
    const req = call.request as OrgRegistry;
    callback(null, await service.deployRegistry(req));
  },
};
