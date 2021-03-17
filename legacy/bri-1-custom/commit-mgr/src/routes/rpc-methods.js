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
exports.jsonRpcHandler = exports.verifyAndPush = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const MerkleTree_1 = require("../db/models/MerkleTree");
const logger_1 = require("../logger");
const tx_manager_1 = require("../tx-manager");
const rpc_server_1 = require("../rpc-server");
// configs loaded
dotenv_1.default.config();
const verifyAndPush = (senderAddress, treeId, proof, publicInputs, newCommitment) => __awaiter(void 0, void 0, void 0, function* () {
    let error;
    let result;
    const record = yield MerkleTree_1.merkleTrees.findOne({ _id: `${treeId}_0` }).select('shieldContract').lean();
    if (!record) {
        logger_1.logger.error(`[baseline_verifyAndPush] Merkle Tree not found in db: ${treeId}`);
        error = {
            code: -32603,
            message: `Internal server error`,
            data: `Merkle Tree not found in db: ${treeId}`,
        };
        return { error, undefined };
    }
    logger_1.logger.info(`[baseline_verifyAndPush] Found Merkle Tree for tree ID: ${treeId}`);
    const txManager = yield tx_manager_1.txManagerServiceFactory(process.env.ETH_CLIENT_TYPE);
    try {
        result = yield txManager.insertLeaf(treeId, senderAddress, proof, publicInputs, newCommitment);
    }
    catch (err) {
        logger_1.logger.error(`[baseline_verifyAndPush] ${err}`);
        error = {
            code: -32603,
            message: `Internal server error`
        };
        return { error, undefined };
    }
    logger_1.logger.info(`[baseline_verifyAndPush] txHash: ${result.txHash}`);
    return result;
});
exports.verifyAndPush = verifyAndPush;
const jsonRpcHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const context = {
        headers: req.headers,
        params: req.params,
        body: req.body,
        ipAddress: req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress,
    };
    rpc_server_1.rpcServer.call(req.body, context, (err, result) => {
        if (err) {
            const errorMessage = err.error.data ? `${err.error.message}: ${err.error.data}` : `${err.error.message}`;
            logger_1.logger.error(`Response error: ${errorMessage}`);
            res.send(err);
            return;
        }
        res.send(result || {});
    });
});
exports.jsonRpcHandler = jsonRpcHandler;
//# sourceMappingURL=rpc-methods.js.map