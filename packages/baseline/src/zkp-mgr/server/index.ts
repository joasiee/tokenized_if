import { ServerUnaryCall, sendUnaryData, status, StatusObject } from "@grpc/grpc-js";
import { IZKPServer } from "@tokenized_if/shared/src/proto/zkp_grpc_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { Circuit, GenerateProofRequest, Proof } from "@tokenized_if/shared/src/proto/zkp_pb";
import { ZKPService } from "../service";
import { schema } from "../db";

let service: ZKPService;

export async function initServer() {
  service = new ZKPService();
  await service.init();
}

function handleError(error: Error | null): Partial<StatusObject> {
  if (error == null) {
    return {
      code: status.OK
    };
  } else {
    return {
      code: status.UNKNOWN,
      details: error.message
    };
  }
}

export const ZKPServer: IZKPServer = {
  getCircuit: async (call: ServerUnaryCall<Circuit, Circuit>, callback: sendUnaryData<Circuit>) => {
    const req = call.request as Circuit;
    const res = await service.getCircuit(req.getName());
    // bit weird way of handling, more suited for REST.
    if (res == null) {
      callback({
        code: status.INVALID_ARGUMENT,
        details: `Circuit ${req.getName()} could not be found`
      });
    } else {
      callback(null, schema.modelToProto(res));
    }
  },
  addCircuit: async (call: ServerUnaryCall<Circuit, Empty>, callback: sendUnaryData<Empty>) => {
    const req = call.request as Circuit;
    const res = await service.addCircuit(req);
    callback(handleError(res));
  },
  deployCircuit: async (call: ServerUnaryCall<Circuit, Empty>, callback: sendUnaryData<Empty>) => {
    const req = call.request as Circuit;
    const res = await service.deployCircuit(req.getName());
    callback(handleError(res));
  },
  compileCircuit: async (call: ServerUnaryCall<Circuit, Empty>, callback: sendUnaryData<Empty>) => {
    const req = call.request as Circuit;
    const res = await service.compileCircuit(req.getName());
    callback(handleError(res));
  },
  generateProof: async (call: ServerUnaryCall<GenerateProofRequest, Proof>, callback: sendUnaryData<Proof>) => {
    const req = call.request as GenerateProofRequest;
    const res = await service.generateProof(req.getName(), req.getArgsList());
    if (res instanceof Error) {
      return callback(handleError(res));
    } else {
      return callback(null, res);
    }
  }
};
