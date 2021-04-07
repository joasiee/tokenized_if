import * as grpc from "@grpc/grpc-js";
import { getLogger } from "@tokenized_if/shared";
import { OrganizationsService } from "@tokenized_if/shared/src/proto/organizations_grpc_pb";
import { ZKPService } from "@tokenized_if/shared/src/proto/zkp_grpc_pb";
import { org_mgr } from "./organization-mgr";
import { zkp_mgr } from "./zkp-mgr";

const main = async function() {
  const logger = getLogger("baseline-main");
  const server = new grpc.Server();
  await org_mgr.initServer();
  await zkp_mgr.initServer();
  server.addService(OrganizationsService, org_mgr.OrganizationsServer);
  server.addService(ZKPService, zkp_mgr.ZKPServer);
  server.bindAsync(`localhost:${process.env.RPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      throw err;
    }
    logger.info(`Listening on ${port}`);
    server.start();
  });
};

main();
