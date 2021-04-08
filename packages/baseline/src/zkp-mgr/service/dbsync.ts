import { getLogger } from "@tokenized_if/shared";
import { isDeployed } from "../../blockchain-mgr";
import { circuit } from "../db";

const logger = getLogger("zkp-mgr");

/**
 * Helper class for ZKP service to keep circuits up to date with blockchain.
 */
export class DBSync {
  async updateDB() {
    const circuits = await circuit.db.find();
    for (const circuit of circuits) {
      await this.updateCircuit(circuit);
    }
  }

  /**
   * If circuit is stored as deployed, check if still so.
   * If not update local db entry.
   * @param circuit
   */
  private async updateCircuit(circuit: circuit.ICircuit) {
    if (circuit.deployed && !(await isDeployed(circuit.address))) {
      circuit.deployed = false;
      circuit.address = "";
      await circuit.save();
    }
  }
}
