import * as grpc from "@grpc/grpc-js";
import { dbConnect, getLogger } from "@tokenized_if/shared";
import { CommitService } from "@tokenized_if/shared/src/proto/commit_grpc_pb";
import { OrganizationsService } from "@tokenized_if/shared/src/proto/organizations_grpc_pb";
import { ZKPService } from "@tokenized_if/shared/src/proto/zkp_grpc_pb";
import { commit_mgr } from "./commit-mgr";
import { org_mgr } from "./organization-mgr";
import { zkp_mgr } from "./zkp-mgr";

const main = async function() {
  const logger = getLogger("baseline-main");
  const server = new grpc.Server();
  await dbConnect(process.env.MONGO_DB_NAME);
  await org_mgr.initServer();
  await zkp_mgr.initServer();
  await commit_mgr.initServer();
  server.addService(OrganizationsService, org_mgr.OrganizationsServer);
  server.addService(ZKPService, zkp_mgr.ZKPServer);
  server.addService(CommitService, commit_mgr.CommitServer);
  server.bindAsync(`0.0.0.0:${process.env.RPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      throw err;
    }
    logger.info(`Listening on ${port}`);
    server.start();
  });
};

main();
