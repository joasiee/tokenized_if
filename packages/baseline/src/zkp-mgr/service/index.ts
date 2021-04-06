import { dbClose, dbConnect, getLogger } from "@tokenized_if/shared";
import { Circuit } from "@tokenized_if/shared/src/proto/zkp_pb";
import { initialize, ZoKratesProvider } from "zokrates-js";
import { schema } from "../db";

const logger = getLogger("zkp-mgr");

export class ZKPService {
  private zok: ZoKratesProvider;

  async init() {
    await dbConnect(process.env.ZMGR_DATABASE_NAME);
    this.zok = await initialize();
  }

  shutdown() {
    dbClose();
  }

  // getCircuit(name: string): Circuit | Error {

  // }
}
