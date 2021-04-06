import { Document, Schema, model } from "mongoose";
import { Circuit } from "@tokenized_if/shared/src/proto/zkp_pb";
import { CompilationArtifacts, G1Affine, G2Affine, SetupKeypair, VerificationKey } from "zokrates-js";

// Enforces Mongoose schema fields to protobuf schema.
const schemaFields: Record<keyof Circuit.AsObject, any> = {
  name: { type: String, required: true, unique: true },
  program: { type: Buffer, required: true },
  contract: { type: String, required: true },
  pk: { type: Buffer, required: true },
  vk: { type: Schema.Types.Mixed, required: true }
};

// instantiate schema, interface and model
export const schema = new Schema(schemaFields);
export interface ICircuitRegistry extends Circuit.AsObject, Document {}
export const db = model<ICircuitRegistry>("CircuitRegistry", schema);

const fromG1Affine = function(g1a: G1Affine) {
  return new Circuit.VerificationKey.G1Affine().setFqList(g1a);
};

const fromG2Affine = function(g2a: G2Affine) {
  return new Circuit.VerificationKey.G2Affine().setFq2List([fromG1Affine(g2a[0]), fromG1Affine(g2a[1])]);
};

const fromVerificationKey = function(key: VerificationKey) {
  return new Circuit.VerificationKey()
    .setAlpha(fromG1Affine(key.alpha))
    .setBeta(fromG2Affine(key.beta))
    .setGamma(fromG2Affine(key.gamma))
    .setDelta(fromG2Affine(key.delta))
    .setGammaAbcList(
      key.gamma_abc.map(function(g1a) {
        return fromG1Affine(g1a);
      })
    );
};

export const fromCircuit = function(
  name: string,
  artifacts: CompilationArtifacts,
  keys: SetupKeypair,
  verifier: string
) {
  return new Circuit()
    .setName(name)
    .setProgram(artifacts.program)
    .setContract(verifier)
    .setPk(keys.pk)
    .setVk(fromVerificationKey(keys.vk));
};
