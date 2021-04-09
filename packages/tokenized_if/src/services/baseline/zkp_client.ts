import * as grpc from '@grpc/grpc-js';
import { ZKPClient } from '@tokenized_if/shared/src/proto/zkp_grpc_pb';

export default new ZKPClient(
  `localhost:${process.env.BASELINE_PORT}`,
  grpc.credentials.createInsecure(),
);
