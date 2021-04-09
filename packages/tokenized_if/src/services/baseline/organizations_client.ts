import * as grpc from '@grpc/grpc-js';
import { OrganizationsClient } from '@tokenized_if/shared/src/proto/organizations_grpc_pb';

export default new OrganizationsClient(
  `localhost:${process.env.BASELINE_PORT}`,
  grpc.credentials.createInsecure(),
);
