import {
  ServerUnaryCall,
  sendUnaryData,
  UntypedHandleCall,
} from "@grpc/grpc-js";
import { IOrganizationsServer } from "@tokenized_if/shared/src/proto/organizations_grpc_pb";
import { OrgRegistry } from "@tokenized_if/shared/src/proto/organizations_pb";
import { getLogger } from "@tokenized_if/shared";

const logger = getLogger("organization-mgr");

export class OrganizationsServer implements IOrganizationsServer {
  [name: string]: UntypedHandleCall;

  deployOrgRegistry(
    call: ServerUnaryCall<OrgRegistry, OrgRegistry>,
    callback: sendUnaryData<OrgRegistry>
  ): void {
    const req = call.request as OrgRegistry;
  }
}
