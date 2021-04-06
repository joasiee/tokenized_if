import { Document, Schema, model } from "mongoose";
import { Circuit } from "@tokenized_if/shared/src/proto/zkp_pb";
import { CompilationArtifacts, SetupKeypair } from "zokrates-js";

type ICircuit_ = Omit<Circuit.AsObject, "vk"> & {
  vk: any;
};

// Enforces Mongoose schema fields to protobuf schema.
const schemaFields: Record<keyof ICircuit_, any> = {
  name: { type: String, required: true, unique: true },
  program: { type: Buffer, required: true },
  contract: { type: String, required: true },
  pk: { type: Buffer, required: true },
  vk: { type: Schema.Types.Mixed, required: true }
};

// instantiate schema, interface and model
export const schema = new Schema(schemaFields);
export interface ICircuit extends ICircuit_, Document {}
export const db = model<ICircuit>("circuits", schema);

export function zokToModel(
  name: string,
  artifacts: CompilationArtifacts,
  keys: SetupKeypair,
  contract: string
): ICircuit_ {
  return {
    name: name,
    program: Buffer.from(artifacts.program),
    contract: contract,
    pk: Buffer.from(keys.pk),
    vk: keys.vk
  };
}
