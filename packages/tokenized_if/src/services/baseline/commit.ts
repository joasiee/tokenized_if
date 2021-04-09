import * as grpc from '@grpc/grpc-js';
import { CommitClient } from '@tokenized_if/shared/src/proto/commit_grpc_pb';

const client = new CommitClient(
  `localhost:${process.env.BASELINE_PORT}`,
  grpc.credentials.createInsecure(),
);
