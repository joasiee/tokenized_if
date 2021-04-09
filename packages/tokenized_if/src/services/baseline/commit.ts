import * as grpc from '@grpc/grpc-js';
import { CommitClient } from '@tokenized_if/shared/src/proto/commit_grpc_pb';
import { Request } from '@tokenized_if/shared/src/proto/commit_pb';

const client = new CommitClient(
  `localhost:${process.env.BASELINE_PORT}`,
  grpc.credentials.createInsecure(),
);

export function trackShield(shieldAddress: string) : Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const track = new Request.Track().setAddress(shieldAddress);
    client.track(track, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res.getValue());
    });
  });
};