import * as grpc from '@grpc/grpc-js';
import { ZKPClient } from '@tokenized_if/shared/src/proto/zkp_grpc_pb';
import { Circuit } from '@tokenized_if/shared/src/proto/zkp_pb';

const client = new ZKPClient(
  `localhost:${process.env.BASELINE_PORT}`,
  grpc.credentials.createInsecure(),
);

export function compileCircuit(name: string) : Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const circuit = new Circuit().setName(name);
    client.compileCircuit(circuit, (err, _) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

export function deployCircuit(name: string) : Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const circuit = new Circuit().setName(name);
    client.deployCircuit(circuit, (err, _) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

export function getVerifieraddress(name: string) : Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const circuit = new Circuit().setName(name);
    client.getCircuit(circuit, (err, circuit) => {
      if (err) {
        return reject(err);
      }
      return resolve(circuit.getAddress());
    });
  });
};


