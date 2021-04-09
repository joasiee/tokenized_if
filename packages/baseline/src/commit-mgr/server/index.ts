import { ServerUnaryCall, sendUnaryData, StatusObject, status } from "@grpc/grpc-js";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { ICommitServer } from "@tokenized_if/shared/src/proto/commit_grpc_pb";
import { Request, Response, Commitment } from "@tokenized_if/shared/src/proto/commit_pb";
import { CommitService } from "../service";

let service: CommitService;

export async function initServer() {
  service = new CommitService();
  await service.init();
}

function handleError(error: Error): Partial<StatusObject> {
  return {
    code: status.UNKNOWN,
    details: error.message
  };
}

export const CommitServer: ICommitServer = {
  getCommit: async (call: ServerUnaryCall<Request.Commit, Commitment>, callback: sendUnaryData<Commitment>) => {
    const req = call.request as Request.Commit;
    callback(null, await service.getCommit(req));
  },
  getCommits: async (
    call: ServerUnaryCall<Request.Commits, Response.Commitments>,
    callback: sendUnaryData<Response.Commitments>
  ) => {
    const req = call.request as Request.Commits;
    callback(null, service.getCommits(req));
  },
  getRoot: async (call: ServerUnaryCall<Request.Root, Response.Root>, callback: sendUnaryData<Response.Root>) => {
    const req = call.request as Request.Root;
    const res = await service.getRoot(req);
    if (res instanceof Error) {
      callback(handleError(res));
    } else {
      callback(null, res);
    }
  },
  getProof: async (
    call: ServerUnaryCall<Request.Proof, Response.Commitments>,
    callback: sendUnaryData<Response.Commitments>
  ) => {
    const req = call.request as Request.Proof;
    const res = await service.getProof(req);
    if (res instanceof Error) {
      callback(handleError(res));
    } else {
      callback(null, res);
    }
  },
  getTracked: async (call: ServerUnaryCall<Empty, Response.Tracked>, callback: sendUnaryData<Response.Tracked>) => {
    const res = await service.getTracked();
    callback(null, res);
  },
  track: async (call: ServerUnaryCall<Request.Track, Response.Bool>, callback: sendUnaryData<Response.Bool>) => {
    const req = call.request as Request.Track;
    const res = await service.track(req);
    if (res instanceof Error) {
      callback(handleError(res));
    } else {
      callback(null, res);
    }
  },
  untrack: async (call: ServerUnaryCall<Request.Untrack, Response.Bool>, callback: sendUnaryData<Response.Bool>) => {
    const req = call.request as Request.Untrack;
    const res = await service.untrack(req);
    if (res instanceof Error) {
      callback(handleError(res));
    } else {
      callback(null, res);
    }
  },
  verify: async (call: ServerUnaryCall<Request.Verify, Response.Bool>, callback: sendUnaryData<Response.Bool>) => {
    const req = call.request as Request.Verify;
    const res = await service.verify(req);
    callback(null, res);
  },
  verifyAndPush: async (
    call: ServerUnaryCall<Request.VerifyAndPush, Response.PushCommitment>,
    callback: sendUnaryData<Response.PushCommitment>
  ) => {
    const req = call.request as Request.VerifyAndPush;
    const res = await service.verifyAndPush(req);
    if (res instanceof Error) {
      callback(handleError(res));
    } else {
      callback(null, res);
    }
  }
};
