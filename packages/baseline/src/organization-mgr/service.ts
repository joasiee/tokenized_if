import {
  ServerUnaryCall,
  sendUnaryData,
  UntypedHandleCall,
} from "@grpc/grpc-js";
import { IOrganizationsServer } from "@tokenized_if/shared/src/proto/organizations_grpc_pb";
import { Organization } from "@tokenized_if/shared/src/proto/organizations_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

class OrganizationsServer implements IOrganizationsServer {
  [name: string]: UntypedHandleCall;

  deployOrgRegistry(
    call: ServerUnaryCall<Empty, Organization>,
    callback: sendUnaryData<Organization>
  ): void {}
}
