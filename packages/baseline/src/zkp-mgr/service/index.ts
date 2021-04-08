import { getLogger } from "@tokenized_if/shared";
import { CompilationArtifacts, initialize, ZoKratesProvider } from "zokrates-js";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { compileContract, deployContract } from "../../blockchain-mgr";
import { schema } from "../db";
import { config } from "../../config";
import { Circuit, Proof } from "@tokenized_if/shared/src/proto/zkp_pb";
import { DBSync } from "./dbsync";

const logger = getLogger("zkp-mgr");

/**
 * ZKP service using Zokrates.
 * Compiles circuits, and stores all relevant metadata in mongodb.
 * Used for rpc endpoint in {@link }
 */
export class ZKPService {
  private zok: ZoKratesProvider;
  private dbSync: DBSync = new DBSync();

  async init() {
    logger.debug("Initializing ZKP service..");
    await this.dbSync.updateDB();
    this.zok = await initialize();
    logger.debug("Initialized!");
  }

  /**
   * Compiles circuit from .zok source file in base circuits folder
   * @param name name without .zok
   * @returns Mongoose circuit model if success, else null
   */
  async compileCircuit(name: string): Promise<null | Error> {
    const filePath = path.join(config.APP_ROOT, "circuits", name + ".zok");
    logger.debug(`Compiling circuit at ${filePath}`);
    const outputPath = path.join(config.APP_ROOT, "dist", "artifacts", name + ".json");
    try {
      if (existsSync(filePath)) {
        const source = readFileSync(filePath).toString();
        const artifacts = this.zok.compile(source);
        const keys = this.zok.setup(artifacts.program);
        const verifier = this.zok.exportSolidityVerifier(keys.vk, "v2");
        if (compileContract(verifier, outputPath, "Verifier")) {
          await schema.db.create(schema.zokToModel(name, artifacts, keys, verifier));
          return null;
        }
        return Error("Could not compile circuit contract using solc");
      } else {
        logger.debug(`Circuit does not exist at ${filePath}`);
        return Error(`Circuit does not exist at ${filePath}`);
      }
    } catch (error) {
      return Error(error);
    }
  }

  /**
   * Deploy circuit to blockchain.
   * @param name name of circuit
   * @returns
   */
  async deployCircuit(name: string): Promise<null | Error> {
    if (await schema.db.exists({ name: name })) {
      const model = await schema.db.findOne({ name: name });
      if (!model.deployed) {
        const address = (await deployContract(name)).address;
        logger.debug(`Deployed circuit verifier contract at: ${address}`);
        model.deployed = true;
        model.address = address;
        await model.save();
        return null;
      } else {
        return Error(`Circuit ${name} already deployed at: ${model.address}`);
      }
    }
    return Error(`Circuit ${name} does not exist in db`);
  }

  /**
   * Generates proof for circuit and inputs.
   * First computes witness, then uses that to generate proof.
   * @param name name of local circuit, has to be compiled and stored in registry
   * @param args circuit input args
   * @returns protobuf compatible proof
   */
  async generateProof(name: string, args: any[]): Promise<Proof | Error> {
    if (await schema.db.exists({ name: name })) {
      const circuit = await schema.db.findOne({ name: name });
      logger.debug(`Generating proof for: ${name} with inputs: ${args}`);
      const artifacts: CompilationArtifacts = {
        program: circuit.artifacts.program as Uint8Array,
        abi: circuit.artifacts.abi
      };
      try {
        const witness = this.zok.computeWitness(artifacts, args);
        const proof = this.zok.generateProof(artifacts.program, witness.witness, circuit.pk as Uint8Array);
        logger.debug(`Proof successfully generated for ${name}`);
        return schema.zokToProtoProof(proof);
      } catch (error) {
        return Error(error);
      }
    } else {
      return Error(`Circuit ${name} does not exist in db`);
    }
  }

  /**
   * Gets circuit from local db if available, otherwise try to compile
   * @param name
   * @returns
   */
  async getCircuit(name: string): Promise<schema.ICircuit | null> {
    if (await schema.db.exists({ name: name })) {
      return await schema.db.findOne({ name: name });
    }
    return null;
  }

  /**
   * Adds circuit from protobuf.
   * @param circuit
   * @returns
   */
  async addCircuit(circuit: Circuit): Promise<Error | null> {
    if (!(await schema.db.exists({ name: circuit.getName() }))) {
      logger.debug(`Adding circuit from protobuf object: ${JSON.stringify(circuit.toObject())}`);
      await schema.db.create(circuit.toObject());
      return null;
    }
    return Error(`Circuit ${circuit.getName()} already in db`);
  }
}
