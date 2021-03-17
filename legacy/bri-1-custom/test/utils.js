"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.vendNatsAuthorization = exports.scrapeInvitationToken = exports.createUser = exports.configureTestnet = exports.baselineAppFactory = exports.authenticateUser = exports.promisedTimeout = void 0;
const child_process_1 = require("child_process");
const log = __importStar(require("loglevel"));
const pg_1 = require("pg");
const provide_js_1 = require("provide-js");
const ts_natsutil_1 = require("ts-natsutil");
const index_1 = require("../src/index");
const promisedTimeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
exports.promisedTimeout = promisedTimeout;
const authenticateUser = (identHost, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield provide_js_1.Ident.authenticate({
        email: email,
        password: password,
    }, 'http', identHost);
    return auth;
});
exports.authenticateUser = authenticateUser;
const baselineAppFactory = (orgName, bearerToken, initiator, identHost, natsHost, natsPrivateKey, natsPublicKey, nchainHost, networkId, vaultHost, privacyHost, rcpEndpoint, rpcScheme, workgroup, workgroupName, workgroupToken, vaultSealUnsealKey) => __awaiter(void 0, void 0, void 0, function* () {
    const natsConfig = {
        bearerToken: '',
        natsServers: [natsHost],
        privateKey: natsPrivateKey,
        publicKey: natsPublicKey,
    };
    natsConfig.bearerToken = yield exports.vendNatsAuthorization(natsConfig, 'baseline.proxy');
    return new index_1.ParticipantStack({
        identApiScheme: 'http',
        identApiHost: identHost,
        initiator: initiator,
        nchainApiScheme: 'http',
        nchainApiHost: nchainHost,
        privacyApiScheme: 'http',
        privacyApiHost: privacyHost,
        networkId: networkId,
        orgName: orgName,
        rpcEndpoint: rcpEndpoint,
        rpcScheme: rpcScheme,
        token: bearerToken,
        vaultApiScheme: 'http',
        vaultApiHost: vaultHost,
        vaultSealUnsealKey: vaultSealUnsealKey,
        workgroup: workgroup,
        workgroupName: workgroupName,
        workgroupToken: workgroupToken,
    }, natsConfig);
});
exports.baselineAppFactory = baselineAppFactory;
const configureTestnet = (dbport, networkId) => __awaiter(void 0, void 0, void 0, function* () {
    const nchainPgclient = new pg_1.Client({
        user: 'nchain',
        host: '0.0.0.0',
        database: 'nchain_dev',
        password: 'nchain',
        port: dbport,
    });
    try {
        yield nchainPgclient.connect();
        yield nchainPgclient.query(`UPDATE networks SET enabled = true WHERE id = '${networkId}'`);
    }
    finally {
        yield nchainPgclient.end();
        return true;
    }
});
exports.configureTestnet = configureTestnet;
const createUser = (identHost, firstName, lastName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield provide_js_1.Ident.createUser({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
    }, 'http', identHost);
    return user;
});
exports.createUser = createUser;
const scrapeInvitationToken = (container) => __awaiter(void 0, void 0, void 0, function* () {
    let logs;
    child_process_1.exec(`docker logs ${container}`, (err, stdout, stderr) => {
        logs = stderr.toString();
    });
    yield exports.promisedTimeout(800);
    const matches = logs.match(/\"dispatch invitation\: (.*)\"/);
    if (matches && matches.length > 0) {
        return matches[matches.length - 1];
    }
    return null;
});
exports.scrapeInvitationToken = scrapeInvitationToken;
const vendNatsAuthorization = (natsConfig, subject) => __awaiter(void 0, void 0, void 0, function* () {
    const authService = new ts_natsutil_1.AuthService(log, (natsConfig === null || natsConfig === void 0 ? void 0 : natsConfig.audience) || natsConfig.natsServers[0], natsConfig === null || natsConfig === void 0 ? void 0 : natsConfig.privateKey, natsConfig === null || natsConfig === void 0 ? void 0 : natsConfig.publicKey);
    const permissions = {
        publish: {
            allow: ['baseline.>'],
        },
        subscribe: {
            allow: [`baseline.proxy`],
        },
    };
    return yield authService.vendBearerJWT(subject, 5000, permissions);
});
exports.vendNatsAuthorization = vendNatsAuthorization;
//# sourceMappingURL=utils.js.map