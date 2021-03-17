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
exports.saveSettings = exports.getSettings = exports.deleteAllContracts = exports.getContracts = exports.deleteAllMerkleTrees = exports.deleteMerkleTree = exports.createMerkleTree = exports.getMerkleTree = exports.getMerkleTrees = exports.sendCommitMainnet = exports.sendCommitToPartners = exports.createCommit = exports.getCommit = exports.getCommits = exports.getStatus = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
const object_hash_1 = __importDefault(require("object-hash"));
const uuid_1 = require("uuid");
const blockchain_1 = require("../blockchain");
const Commit_1 = require("../db/models/Commit");
const MerkleTree_1 = require("../db/models/MerkleTree");
const Contract_1 = require("../db/models/Contract");
const logger_1 = require("../logger");
const hash_1 = require("../merkle-tree/hash");
const rpc_methods_1 = require("./rpc-methods");
const config_1 = require("../config");
dotenv_1.default.config();
const getStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = {
        dbUrl: `${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
        dbHost: process.env.DATABASE_HOST
    };
    const name = blockchain_1.chainName();
    const blockchain = {
        chainId: process.env.CHAIN_ID,
        chainName: name,
        walletAddress: process.env.WALLET_PUBLIC_KEY,
        infuraId: process.env.INFURA_ID,
        commitServerPort: process.env.SERVER_PORT
    };
    res.status(200);
    res.send({ db, blockchain });
});
exports.getStatus = getStatus;
const getCommits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workflowId = req.query.workflowId;
    const filter = workflowId ? { workflowId } : {};
    yield Commit_1.commits.find(filter, (err, data) => {
        if (err) {
            logger_1.logger.error(`Could not retrieve commits: ${err}`);
            res.send(err);
        }
        else {
            res.send(data || {});
        }
    });
});
exports.getCommits = getCommits;
const getCommit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Commit_1.commits.findOne({ _id: req.params.commitId }, (err, data) => {
        if (err) {
            logger_1.logger.error(`Could not retrieve commits: ${err}`);
            res.send(err);
        }
        else {
            res.send(data || {});
        }
    });
});
exports.getCommit = getCommit;
const createCommit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newId = uuid_1.v4();
    const { merkleId, workflowId, rawData, workflowStep } = req.body;
    // generate salt
    const salt = crypto_1.default.randomBytes(32).toString('hex');
    // sort json object alphabetically then hash
    const rawDataHash = object_hash_1.default(rawData, 'sha256');
    // value = H(rawDataHash + salt)
    const value = hash_1.concatenateThenHash(rawDataHash, salt);
    // run zkp verification?
    try {
        const newCommit = yield Commit_1.commits.findOneAndUpdate({ _id: newId }, {
            _id: newId,
            merkleId,
            workflowId,
            rawData,
            salt,
            value,
            workflowStep: workflowStep || 1,
            status: "created"
        }, { upsert: true, new: true });
        logger_1.logger.info(`New commit (id: ${newId}) created.`);
        res.send(newCommit || {});
    }
    catch (err) {
        logger_1.logger.error(`Could not create new commit: ${err}`);
        res.send(err);
    }
});
exports.createCommit = createCommit;
const sendCommitToPartners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // send to partners via messenger
        const newCommit = yield Commit_1.commits.findOneAndUpdate({ _id: req.params.commitId }, { status: "sent-to-partners" }, { upsert: true, new: true });
        res.send(newCommit || {});
    }
    catch (err) {
        logger_1.logger.error(`Could not update commit: ${err}`);
        res.send(err);
    }
});
exports.sendCommitToPartners = sendCommitToPartners;
const sendCommitMainnet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commit = yield Commit_1.commits.findOne({ _id: req.params.commitId });
    if (commit.status === "mainnet") {
        res.status(400).send({ message: "Error: commit already on mainnet" });
        return;
    }
    const senderAddress = req.body.senderAddress || process.env.WALLET_PUBLIC_KEY;
    const proof = req.body.proof || commit.proof;
    const publicInputs = req.body.publicInputs || commit.publicInputs;
    // Update commit to ensure it has proof, publicInputs
    yield Commit_1.commits.findOneAndUpdate({ _id: req.params.commitId }, {
        status: "sent-mainnet",
        proof,
        publicInputs
    }, { upsert: true });
    // send on-chain via baseline_verifyAndPush
    // event listener should change status to "on-chain"
    const result = yield rpc_methods_1.verifyAndPush(senderAddress, commit.merkleId, proof, publicInputs, commit.value);
    logger_1.logger.info(`[baseline_verifyAndPush] result: %o`, result);
    if (result.error) {
        logger_1.logger.error(`Could not push new commit on-chain: %o`, result.error);
        res.status(500).send(result.error);
        return;
    }
    res.status(200).send({ txHash: result.txHash });
    return;
});
exports.sendCommitMainnet = sendCommitMainnet;
const getMerkleTrees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield MerkleTree_1.merkleTrees.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(data || {});
        }
    });
});
exports.getMerkleTrees = getMerkleTrees;
const getMerkleTree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield MerkleTree_1.merkleTrees.findOne({ _id: req.params.treeId }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(data || {});
        }
    });
});
exports.getMerkleTree = getMerkleTree;
const createMerkleTree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Create new MerkleTree instance in db
    const newId = uuid_1.v4();
    yield MerkleTree_1.merkleTrees.insertOne({
        _id: `${newId}_0`,
        network: {
            name: "local-db"
        },
        treeHeight: req.body.treeHeight || 4,
        active: true
    }, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data || {});
        }
    });
});
exports.createMerkleTree = createMerkleTree;
const deleteMerkleTree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield MerkleTree_1.merkleTrees.deleteOne({ _id: req.params.treeId }, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data || {});
        }
    });
});
exports.deleteMerkleTree = deleteMerkleTree;
const deleteAllMerkleTrees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield MerkleTree_1.merkleTrees.deleteMany({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data || {});
        }
    });
});
exports.deleteAllMerkleTrees = deleteAllMerkleTrees;
const getContracts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const network = req.query.network;
    const filter = network ? { network } : {};
    yield Contract_1.contractBaseline.find(filter, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data || {});
        }
    });
});
exports.getContracts = getContracts;
const deleteAllContracts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Contract_1.contractBaseline.deleteMany({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data || {});
        }
    });
});
exports.deleteAllContracts = deleteAllContracts;
const getSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        NODE_ENV: process.env.NODE_ENV,
        LOG_LEVEL: process.env.LOG_LEVEL,
        SERVER_PORT: process.env.SERVER_PORT,
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_NAME: process.env.DATABASE_NAME,
        ETH_CLIENT_TYPE: process.env.ETH_CLIENT_TYPE,
        ETH_CLIENT_WS: process.env.ETH_CLIENT_WS,
        ETH_CLIENT_HTTP: process.env.ETH_CLIENT_HTTP,
        CHAIN_ID: process.env.CHAIN_ID,
        WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY,
        WALLET_PUBLIC_KEY: process.env.WALLET_PUBLIC_KEY
    };
    res.send(data || {});
});
exports.getSettings = getSettings;
const saveSettings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const settings = req.body;
    if (!settings) {
        logger_1.logger.error("No settings provided for storage in .env file");
        res.status(400).send({ error: 'No settings provided' });
        return;
    }
    config_1.saveEnv(settings);
    res.sendStatus(200);
});
exports.saveSettings = saveSettings;
//# sourceMappingURL=rest-methods.js.map