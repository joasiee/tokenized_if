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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalDb = void 0;
const merkle_tree_1 = require("../merkle-tree");
const logger_1 = require("../logger");
const leaves_1 = require("../merkle-tree/leaves");
class LocalDb {
    constructor(config) {
        this.config = config;
        this.config = config;
    }
    insertLeaf(merkleId, fromAddress, proof, publicInputs, newCommitment) {
        return __awaiter(this, void 0, void 0, function* () {
            let error = null;
            let txHash;
            try {
                const latestLeaf = yield leaves_1.getLatestLeaf(merkleId);
                let newLeafIndex = 0;
                if (latestLeaf)
                    newLeafIndex = latestLeaf.leafIndex + 1;
                const newLeaf = {
                    leafIndex: newLeafIndex,
                    hash: newCommitment
                };
                yield leaves_1.insertLeaf(merkleId, newLeaf);
                // Set txHash to new root hash value
                txHash = yield merkle_tree_1.updateTree(merkleId);
            }
            catch (err) {
                logger_1.logger.error('Failed to insert leaf into local db:', err);
                error = { data: err };
            }
            return { error, txHash };
        });
    }
}
exports.LocalDb = LocalDb;
//# sourceMappingURL=local-db.js.map