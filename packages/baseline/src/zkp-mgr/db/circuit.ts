import { Document, Schema, model } from "mongoose";
import { Circuit, Proof } from "@tokenized_if/shared/src/proto/zkp_pb";
import { Proof as zokProof } from "zokrates-js";
import { readFileSync } from "fs";

type Modify<T, R> = Omit<T, keyof R> & R;

type Circuit_ = Modify<
  Circuit.AsObject,
  {
    artifacts: string[];
    pk: string;
  }
>;

// Enforces Mongoose schema fields to protobuf schema.
const schemaFields: Record<keyof Circuit_, any> = {
  name: { type: String, required: true, unique: true },
  artifacts: { type: [String], required: true },
  contract: { type: String, required: true },
  pk: { type: String, required: true },
  deployed: { type: Boolean, default: false },
  address: { type: String, default: "" }
};

// instantiate schema, interface and model
export const schema = new Schema(schemaFields);
export interface ICircuit extends Circuit_, Document {}
export const db = model<ICircuit>("circuits", schema);

export function zokToModel(name: string, artifacts: string[], pk: string, contract: string): Circuit_ {
  return {
    name: name,
    artifacts: artifacts,
    contract: contract,
    pk: pk,
    deployed: false,
    address: ""
  };
}

export function zokToProtoProof(proof: zokProof): Proof {
  const points = new Proof.ProofPoints()
    .setAList(proof.proof.a)
    .setB1List(proof.proof.b[0])
    .setB2List(proof.proof.b[1])
    .setCList(proof.proof.c);
  return new Proof().setProof(points).setInputsList(proof.inputs);
}

export function modelToProto(model: ICircuit): Circuit {
  const program = readFileSync(model.artifacts[0]);
  const pk = readFileSync(model.artifacts[1]);
  return new Circuit()
    .setName(model.name)
    .setArtifacts(new Circuit.Artifacts().setProgram(program).setAbi(model.artifacts[1]))
    .setContract(model.contract)
    .setPk(pk)
    .setDeployed(model.deployed)
    .setAddress(model.address);
}
