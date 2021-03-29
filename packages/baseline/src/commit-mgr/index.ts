import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { rpcServer } from "./rpc-server";
import { logger, reqLogger, reqErrorLogger } from "./logger";
import { dbConnect } from "@tokenized_if/shared";
import { get_ws_provider, restartSubscriptions } from "./blockchain";

export const commitMgrStart = async () => {
  const port = process.env.CMGR_SERVER_PORT;

  logger.info("Starting commmitment manager server...");

  logger.debug(`Attempting to connect to db: ${process.env.MONGO_HOST}/${process.env.CMGR_DATABASE_NAME}`);

  await dbConnect(process.env.CMGR_DATABASE_USER, process.env.CMGR_DATABASE_PASSWORD, process.env.CMGR_DATABASE_NAME);
  await get_ws_provider(); // Establish websocket connection
  await restartSubscriptions(); // Enable event listeners for active MerkleTrees

  const app = express();

  app.use(reqLogger("COMMIT-MGR")); // Log requests
  app.use(reqErrorLogger("COMMIT-MGR")); // Log errors
  app.use(bodyParser.json({ limit: "2mb" })); // Pre-parse body content
  app.use(cors());
  app.use(rpcServer.middleware());

  app.get("/status", async (req: any, res: any) => {
    res.sendStatus(200);
  });

  // Single endpoint to handle all JSON-RPC requests
  app.post("/jsonrpc", async (req: any, res: any, next: any) => {
    const context = {
      headers: req.headers,
      params: req.params,
      body: req.body,
      ipAddress: req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress,
    };

    await rpcServer.call(req.body, context, (err: any, result: any) => {
      if (err) {
        const errorMessage = err.error.data ? `${err.error.message}: ${err.error.data}` : `${err.error.message}`;
        logger.error(`Response error: ${errorMessage}`);
        res.send(err);
        return;
      }
      res.send(result || {});
    });
  });

  app.listen(port, () => {
    logger.info(`REST server listening on port ${port}.`);
  });
};
