import { Document, Schema, model } from "mongoose";
import { Circuit, Proof } from "@tokenized_if/shared/src/proto/zkp_pb";
import { CompilationArtifacts, SetupKeypair, Proof as zokProof } from "zokrates-js";

const artifactFields: Record<keyof Circuit.Artifacts.AsObject, any> = {
  program: { type: Buffer, required: true },
  abi: { type: String, required: true }
};

const Artifacts = new Schema(artifactFields);

// Enforces Mongoose schema fields to protobuf schema.
const schemaFields: Record<keyof Circuit.AsObject, any> = {
  name: { type: String, required: true, unique: true },
  artifacts: { type: Artifacts, required: true },
  contract: { type: String, required: true },
  pk: { type: Buffer, required: true },
  deployed: { type: Boolean, default: false },
  address: { type: String, default: "" }
};

// instantiate schema, interface and model
export const schema = new Schema(schemaFields);
export interface ICircuit extends Circuit.AsObject, Document {}
export const db = model<ICircuit>("circuits", schema);

export function zokToModel(
  name: string,
  artifacts: CompilationArtifacts,
  keys: SetupKeypair,
  contract: string
): Circuit.AsObject {
  return {
    name: name,
    artifacts: {
      program: Buffer.from(artifacts.program),
      abi: artifacts.abi
    },
    contract: contract,
    pk: Buffer.from(keys.pk),
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
  return new Circuit()
    .setName(model.name)
    .setArtifacts(new Circuit.Artifacts().setProgram(model.artifacts.program).setAbi(model.artifacts.abi))
    .setContract(model.contract)
    .setPk(model.pk)
    .setDeployed(model.deployed)
    .setAddress(model.address);
}
