import * as grpc from "@grpc/grpc-js";
import { getLogger } from "@tokenized_if/shared";
import { OrganizationsService } from "@tokenized_if/shared/src/proto/organizations_grpc_pb";
import { OrganizationsServer, initServer } from "./organization-mgr";

const main = async function() {
  const logger = getLogger("baseline-main");
  const server = new grpc.Server();
  await initServer();
  server.addService(OrganizationsService, OrganizationsServer);
  server.bindAsync(`localhost:${process.env.RPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      throw err;
    }
    logger.info(`Listening on ${port}`);
    server.start();
  });
};

main();
