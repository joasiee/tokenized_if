"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("./logger");
const db_1 = require("./db");
const blockchain_1 = require("./blockchain");
const rest_methods_1 = require("./routes/rest-methods");
const rpc_methods_1 = require("./routes/rpc-methods");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info("Starting commmitment manager server...");
    dotenv_1.default.config();
    const port = process.env.SERVER_PORT;
    const dbUrl = 'mongodb://' +
        `${process.env.DATABASE_USER}` + ':' +
        `${process.env.DATABASE_PASSWORD}` + '@' +
        `${process.env.DATABASE_HOST}` + '/' +
        `${process.env.DATABASE_NAME}`;
    logger_1.logger.debug(`Attempting to connect to db: ${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`);
    yield db_1.dbConnect(dbUrl);
    yield blockchain_1.get_ws_provider(); // Establish websocket connection
    yield blockchain_1.restartSubscriptions(); // Enable event listeners for active MerkleTrees
    const app = express_1.default();
    app.use(logger_1.reqLogger('COMMIT-MGR')); // Log requests
    app.use(logger_1.reqErrorLogger('COMMIT-MGR')); // Log errors
    app.use(body_parser_1.default.json({ limit: "2mb" })); // Pre-parse body content
    app.use(cors_1.default());
    app.get("/status", rest_methods_1.getStatus);
    app.get("/settings", rest_methods_1.getSettings);
    app.post("/settings", rest_methods_1.saveSettings);
    app.get("/commits", rest_methods_1.getCommits);
    app.get("/commits/:commitId", rest_methods_1.getCommit);
    app.post("/commits", rest_methods_1.createCommit);
    app.post("/commits/:commitId/send-partners", rest_methods_1.sendCommitToPartners);
    app.post("/commits/:commitId/send-mainnet", rest_methods_1.sendCommitMainnet);
    app.get("/merkle-trees", rest_methods_1.getMerkleTrees);
    app.get("/merkle-trees/:treeId", rest_methods_1.getMerkleTree);
    app.post("/merkle-trees", rest_methods_1.createMerkleTree);
    app.post("/merkle-trees/:treeId/delete", rest_methods_1.deleteMerkleTree);
    app.post("/delete/merkle-trees", rest_methods_1.deleteAllMerkleTrees);
    app.post("/delete/contracts", rest_methods_1.deleteAllContracts);
    app.get("/contracts", rest_methods_1.getContracts);
    // Single endpoint to handle all JSON-RPC requests
    // app.use(rpcServer.middleware());
    app.post("/jsonrpc", rpc_methods_1.jsonRpcHandler);
    app.listen(port, () => {
        logger_1.logger.info(`REST server listening on port ${port}.`);
    });
});
main();
//# sourceMappingURL=index.js.map