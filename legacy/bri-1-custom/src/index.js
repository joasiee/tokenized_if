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
exports.ParticipantStack = void 0;
const api_1 = require("@baseline-protocol/api");
const messaging_1 = require("@baseline-protocol/messaging");
const privacy_1 = require("@baseline-protocol/privacy");
const types_1 = require("@baseline-protocol/types");
const provide_js_1 = require("provide-js");
const solc_1 = require("solc");
const jwt = __importStar(require("jsonwebtoken"));
const log = __importStar(require("loglevel"));
const js_sha256_1 = require("js-sha256");
const ts_natsutil_1 = require("ts-natsutil");
// const baselineDocumentCircuitPath = '../../../lib/circuits/createAgreement.zok';
const baselineProtocolMessageSubject = "baseline.proxy";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
class TryError extends Error {
    constructor() {
        super(...arguments);
        this.promiseErrors = [];
    }
}
const tryTimes = (prom, times = 80, wait = 9400) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    for (let index = 0; index < times; index++) {
        try {
            return yield prom();
        }
        catch (err) {
            errors.push(err);
        }
        yield sleep(wait);
    }
    const error = new TryError("Unfulfilled promises");
    error.promiseErrors = errors;
    throw error;
});
class ParticipantStack {
    constructor(baselineConfig, natsConfig) {
        this.initialized = false;
        this.natsBearerTokens = {}; // mapping of third-party participant messaging endpoint => bearer token
        this.protocolMessagesRx = 0;
        this.protocolMessagesTx = 0;
        this.protocolSubscriptions = [];
        this.workgroupCounterparties = [];
        this.workflowRecords = {}; // in-memory system of record
        this.baselineConfig = baselineConfig;
        this.natsConfig = natsConfig;
    }
    init() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized) {
                throw new Error(`already initialized participant stack: ${this.org.name}`);
            }
            this.baseline = yield api_1.baselineServiceFactory(api_1.baselineProviderProvide, this.baselineConfig);
            this.nats = yield messaging_1.messagingServiceFactory(messaging_1.messagingProviderNats, this.natsConfig);
            this.privacy = (yield privacy_1.zkSnarkCircuitProviderServiceFactory(privacy_1.zkSnarkCircuitProviderServiceProvide, {
                token: (_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.token,
                privacyApiScheme: (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.privacyApiScheme,
                privacyApiHost: (_c = this.baselineConfig) === null || _c === void 0 ? void 0 : _c.privacyApiHost,
            })); // HACK
            if ((_d = this.natsConfig) === null || _d === void 0 ? void 0 : _d.natsBearerTokens) {
                this.natsBearerTokens = this.natsConfig.natsBearerTokens;
            }
            this.contracts = {};
            this.startProtocolSubscriptions();
            if (this.baselineConfig.initiator) {
                if (this.baselineConfig.workgroup && this.baselineConfig.workgroupToken) {
                    yield this.setWorkgroup(this.baselineConfig.workgroup, this.baselineConfig.workgroupToken);
                }
                else if (this.baselineConfig.workgroupName) {
                    yield this.createWorkgroup(this.baselineConfig.workgroupName);
                }
                yield this.registerOrganization(this.baselineConfig.orgName, this.natsConfig.natsServers[0]);
            }
            this.initialized = true;
        });
    }
    getBaselineCircuit() {
        return this.baselineCircuit;
    }
    getBaselineConfig() {
        return this.baselineConfig;
    }
    getBaselineService() {
        return this.baseline;
    }
    getMessagingConfig() {
        return this.natsConfig;
    }
    getMessagingService() {
        return this.nats;
    }
    getNatsBearerTokens() {
        return this.natsBearerTokens;
    }
    getOrganization() {
        return this.org;
    }
    getProtocolMessagesRx() {
        return this.protocolMessagesRx;
    }
    getProtocolMessagesTx() {
        return this.protocolMessagesTx;
    }
    getProtocolSubscriptions() {
        return this.protocolSubscriptions;
    }
    getWorkflowIdentifier() {
        return this.workflowIdentifier;
    }
    getWorkgroup() {
        return this.workgroup;
    }
    getWorkgroupToken() {
        return this.workgroupToken;
    }
    getWorkgroupContract(type) {
        return this.contracts[type];
    }
    getWorkgroupContracts() {
        return this.contracts;
    }
    getWorkgroupCounterparties() {
        return this.workgroupCounterparties;
    }
    disconnect() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.nats) === null || _a === void 0 ? void 0 : _a.flush());
            yield ((_b = this.nats) === null || _b === void 0 ? void 0 : _b.disconnect());
        });
    }
    dispatchProtocolMessage(msg) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.opcode === types_1.Opcode.Baseline) {
                const vault = yield this.requireVault();
                const workflowSignatories = 2;
                const payload = JSON.parse(msg.payload.toString());
                if (payload.doc) {
                    if (!payload.sibling_path) {
                        payload.sibling_path = [];
                    }
                    if (!payload.signatures) {
                        payload.signatures = [];
                    }
                    if (!payload.hash) {
                        payload.hash = js_sha256_1.sha256(JSON.stringify(payload.doc));
                    }
                    if (payload.signatures.length === 0) {
                        // baseline this new document
                        payload.result = yield this.generateProof("preimage", JSON.parse(msg.payload.toString()));
                        const signature = (yield this.signMessage(vault.id, (_a = this.babyJubJub) === null || _a === void 0 ? void 0 : _a.id, payload.result.proof.proof)).signature;
                        payload.signatures = [signature];
                        this.workgroupCounterparties.forEach((recipient) => __awaiter(this, void 0, void 0, function* () {
                            this.sendProtocolMessage(msg.sender, types_1.Opcode.Baseline, payload);
                        }));
                    }
                    else if (payload.signatures.length < workflowSignatories) {
                        if (payload.sibling_path && payload.sibling_path.length > 0) {
                            // perform off-chain verification to make sure this is a legal state transition
                            const root = payload.sibling_path[0];
                            const verified = (_b = this.baseline) === null || _b === void 0 ? void 0 : _b.verify(this.contracts["shield"].address, payload.leaf, root, payload.sibling_path);
                            if (!verified) {
                                console.log("WARNING-- off-chain verification of proposed state transition failed...");
                                this.workgroupCounterparties.forEach((recipient) => __awaiter(this, void 0, void 0, function* () {
                                    this.sendProtocolMessage(recipient, types_1.Opcode.Baseline, { err: "verification failed" });
                                }));
                                return Promise.reject("failed to verify");
                            }
                        }
                        // sign state transition
                        const signature = (yield this.signMessage(vault.id, (_c = this.babyJubJub) === null || _c === void 0 ? void 0 : _c.id, payload.hash)).signature;
                        payload.signatures.push(signature);
                        this.workgroupCounterparties.forEach((recipient) => __awaiter(this, void 0, void 0, function* () {
                            this.sendProtocolMessage(recipient, types_1.Opcode.Baseline, payload);
                        }));
                    }
                    else {
                        // create state transition commitment
                        payload.result = yield this.generateProof("modify_state", JSON.parse(msg.payload.toString()));
                        const publicInputs = []; // FIXME
                        const value = ""; // FIXME
                        console.log(payload);
                        const resp = yield ((_d = this.baseline) === null || _d === void 0 ? void 0 : _d.verifyAndPush(msg.sender, this.contracts["shield"].address, payload.result.proof.proof, publicInputs, value));
                        const leaf = resp.commitment;
                        if (leaf) {
                            console.log(`inserted leaf... ${leaf}`);
                            payload.sibling_path = (yield this.baseline.getProof(msg.shield, leaf.location())).map((node) => node.location());
                            (_e = payload.sibling_path) === null || _e === void 0 ? void 0 : _e.push(leaf.index);
                            this.workgroupCounterparties.forEach((recipient) => __awaiter(this, void 0, void 0, function* () {
                                yield this.sendProtocolMessage(recipient, types_1.Opcode.Baseline, payload);
                            }));
                        }
                        else {
                            return Promise.reject("failed to insert leaf");
                        }
                    }
                }
                else if (payload.signature) {
                    console.log(`NOOP!!! received signature in BLINE protocol message: ${payload.signature}`);
                }
            }
            else if (msg.opcode === types_1.Opcode.Join) {
                const payload = JSON.parse(msg.payload.toString());
                const messagingEndpoint = yield this.resolveMessagingEndpoint(payload.address);
                if (!messagingEndpoint || !payload.address || !payload.authorized_bearer_token) {
                    return Promise.reject("failed to handle baseline JOIN protocol message");
                }
                this.workgroupCounterparties.push(payload.address);
                this.natsBearerTokens[messagingEndpoint] = payload.authorized_bearer_token;
                const circuit = JSON.parse(JSON.stringify(this.baselineCircuit));
                circuit.proving_scheme = circuit.provingScheme;
                circuit.verifier_contract = circuit.verifierContract;
                delete circuit.verifierContract;
                delete circuit.createdAt;
                delete circuit.vaultId;
                delete circuit.provingScheme;
                delete circuit.provingKeyId;
                delete circuit.verifyingKeyId;
                delete circuit.status;
                // sync circuit artifacts
                this.sendProtocolMessage(payload.address, types_1.Opcode.Sync, {
                    type: "circuit",
                    payload: circuit,
                });
            }
            else if (msg.opcode === types_1.Opcode.Sync) {
                const payload = JSON.parse(msg.payload.toString());
                if (payload.type === "circuit") {
                    this.baselineCircuit = (yield ((_f = this.privacy) === null || _f === void 0 ? void 0 : _f.deploy(payload.payload)));
                }
            }
        });
    }
    // HACK!! workgroup/contracts should be synced via protocol
    acceptWorkgroupInvite(inviteToken, contracts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.workgroup || this.workgroupToken || this.org || this.baselineConfig.initiator) {
                return Promise.reject("failed to accept workgroup invite");
            }
            const invite = jwt.decode(inviteToken);
            yield this.createWorkgroup(this.baselineConfig.workgroupName);
            this.contracts = {
                "erc1820-registry": {
                    address: invite.prvd.data.params.erc1820_registry_contract_address,
                    name: "ERC1820Registry",
                    network_id: (_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.networkId,
                    params: {
                        compiled_artifact: (_b = contracts["erc1820-registry"].params) === null || _b === void 0 ? void 0 : _b.compiled_artifact,
                    },
                    type: "erc1820-registry",
                },
                "organization-registry": {
                    address: invite.prvd.data.params.organization_registry_contract_address,
                    name: "OrgRegistry",
                    network_id: (_c = this.baselineConfig) === null || _c === void 0 ? void 0 : _c.networkId,
                    params: {
                        compiled_artifact: (_d = contracts["organization-registry"].params) === null || _d === void 0 ? void 0 : _d.compiled_artifact,
                    },
                    type: "organization-registry",
                },
                "shield": {
                    address: invite.prvd.data.params.shield_contract_address,
                    name: "Shield",
                    network_id: (_e = this.baselineConfig) === null || _e === void 0 ? void 0 : _e.networkId,
                    params: {
                        compiled_artifact: (_f = contracts["shield"].params) === null || _f === void 0 ? void 0 : _f.compiled_artifact,
                    },
                    type: "shield",
                },
                "verifier": {
                    address: invite.prvd.data.params.verifier_contract_address,
                    name: "Verifier",
                    network_id: (_g = this.baselineConfig) === null || _g === void 0 ? void 0 : _g.networkId,
                    params: {
                        compiled_artifact: (_h = contracts["verifier"].params) === null || _h === void 0 ? void 0 : _h.compiled_artifact,
                    },
                    type: "verifier",
                },
            };
            const nchain = provide_js_1.nchainClientFactory(this.workgroupToken, (_j = this.baselineConfig) === null || _j === void 0 ? void 0 : _j.nchainApiScheme, (_k = this.baselineConfig) === null || _k === void 0 ? void 0 : _k.nchainApiHost);
            this.contracts["erc1820-registry"] = yield nchain.createContract(this.contracts["erc1820-registry"]);
            this.contracts["organization-registry"] = yield nchain.createContract(this.contracts["organization-registry"]);
            this.contracts["shield"] = yield nchain.createContract(this.contracts["shield"]);
            this.contracts["verifier"] = yield nchain.createContract(this.contracts["verifier"]);
            const counterpartyAddr = invite.prvd.data.params.invitor_organization_address;
            this.workgroupCounterparties.push(counterpartyAddr);
            const messagingEndpoint = yield this.resolveMessagingEndpoint(counterpartyAddr);
            this.natsBearerTokens[messagingEndpoint] = invite.prvd.data.params.authorized_bearer_token;
            this.workflowIdentifier = invite.prvd.data.params.workflow_identifier;
            yield ((_l = this.baseline) === null || _l === void 0 ? void 0 : _l.track(invite.prvd.data.params.shield_contract_address).catch((err) => { }));
            yield this.registerOrganization(this.baselineConfig.orgName, this.natsConfig.natsServers[0]);
            yield this.requireOrganization(yield this.resolveOrganizationAddress());
            yield this.sendProtocolMessage(counterpartyAddr, types_1.Opcode.Join, {
                address: yield this.resolveOrganizationAddress(),
                authorized_bearer_token: yield this.vendNatsAuthorization(),
                workflow_identifier: this.workflowIdentifier,
            });
        });
    }
    marshalCircuitArg(val, fieldBits) {
        const el = privacy_1.elementify(val);
        return el.field(fieldBits || 128, 1, true);
    }
    generateProof(type, msg) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const senderZkPublicKey = (_a = this.babyJubJub) === null || _a === void 0 ? void 0 : _a.publicKey;
            let commitment;
            let root = null;
            const salt = msg.salt || privacy_1.rndHex(32);
            if (msg.sibling_path && msg.sibling_path.length > 0) {
                const siblingPath = privacy_1.elementify(msg.sibling_path);
                root = siblingPath[0].hex(64);
            }
            console.log(`generating ${type} proof...\n`, msg);
            switch (type) {
                case "preimage": // create agreement
                    const preimage = privacy_1.concatenateThenHash({
                        erc20ContractAddress: this.marshalCircuitArg(this.contracts["erc1820-registry"].address),
                        senderPublicKey: this.marshalCircuitArg(senderZkPublicKey),
                        name: this.marshalCircuitArg(msg.doc.name),
                        url: this.marshalCircuitArg(msg.doc.url),
                        hash: this.marshalCircuitArg(msg.hash),
                    });
                    console.log(`generating state genesis with preimage: ${preimage}; salt: ${salt}`);
                    commitment = privacy_1.concatenateThenHash(preimage, salt);
                    break;
                case "modify_state": // modify commitment state, nullify if applicable, etc.
                    const _commitment = privacy_1.concatenateThenHash({
                        senderPublicKey: this.marshalCircuitArg(senderZkPublicKey),
                        name: this.marshalCircuitArg(msg.doc.name),
                        url: this.marshalCircuitArg(msg.doc.url),
                        hash: this.marshalCircuitArg(msg.hash),
                    });
                    console.log(`generating state transition commitment with calculated delta: ${_commitment}; root: ${root}, salt: ${salt}`);
                    commitment = privacy_1.concatenateThenHash(root, _commitment, salt);
                    break;
                default:
                    throw new Error("invalid proof type");
            }
            const resp = yield ((_b = this.privacy) === null || _b === void 0 ? void 0 : _b.prove((_c = this.baselineCircuit) === null || _c === void 0 ? void 0 : _c.id, {
                x: "3",
                Y: "35",
            }));
            return {
                doc: msg.doc,
                proof: resp.proof,
                salt: salt,
            };
        });
    }
    resolveMessagingEndpoint(addr) {
        return __awaiter(this, void 0, void 0, function* () {
            const org = yield this.fetchOrganization(addr);
            if (!org) {
                return Promise.reject(`organization not resolved: ${addr}`);
            }
            const messagingEndpoint = org["config"].messaging_endpoint;
            if (!messagingEndpoint) {
                return Promise.reject(`organization messaging endpoint not resolved for recipient: ${addr}`);
            }
            return messagingEndpoint;
        });
    }
    // bearer auth tokens authorized by third parties are keyed on the messaging endpoint to which access is authorized
    resolveNatsBearerToken(addr) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = yield this.resolveMessagingEndpoint(addr);
            if (!endpoint) {
                return Promise.reject(`failed to resolve messaging endpoint for participant: ${addr}`);
            }
            return this.natsBearerTokens[endpoint];
        });
    }
    // this will accept recipients (string[]) for multi-party use-cases
    sendProtocolMessage(recipient, opcode, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const messagingEndpoint = yield this.resolveMessagingEndpoint(recipient);
            if (!messagingEndpoint) {
                return Promise.reject(`protocol message not sent; organization messaging endpoint not resolved for recipient: ${recipient}`);
            }
            const bearerToken = this.natsBearerTokens[messagingEndpoint];
            if (!bearerToken) {
                return Promise.reject(`protocol message not sent; no bearer authorization cached for endpoint of recipient: ${recipient}`);
            }
            const recipientNatsConn = yield messaging_1.messagingServiceFactory(messaging_1.messagingProviderNats, {
                bearerToken: bearerToken,
                natsServers: [messagingEndpoint],
            });
            yield recipientNatsConn.connect();
            if (msg.id && !this.workflowRecords[msg.id]) {
                this.workflowRecords[msg.id] = msg;
            }
            // this will use protocol buffers or similar
            const wiremsg = types_1.marshalProtocolMessage(yield this.protocolMessageFactory(opcode, recipient, this.contracts["shield"].address, this.workflowIdentifier, Buffer.from(JSON.stringify(msg))));
            const result = recipientNatsConn.publish(baselineProtocolMessageSubject, wiremsg);
            this.protocolMessagesTx++;
            recipientNatsConn.disconnect();
            return result;
        });
    }
    createWorkgroup(name) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.workgroup) {
                return Promise.reject(`workgroup not created; instance is associated with workgroup: ${this.workgroup.name}`);
            }
            this.workgroup = yield ((_a = this.baseline) === null || _a === void 0 ? void 0 : _a.createWorkgroup({
                config: {
                    baselined: true,
                },
                name: name,
                network_id: (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.networkId,
            }));
            const tokenResp = yield this.createWorkgroupToken();
            this.workgroupToken = tokenResp.accessToken || tokenResp.token;
            if (this.baselineConfig.initiator) {
                yield this.initWorkgroup();
            }
            return this.workgroup;
        });
    }
    initWorkgroup() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.workgroup) {
                return Promise.reject("failed to init workgroup");
            }
            this.capabilities = provide_js_1.capabilitiesFactory();
            yield this.requireCapabilities();
            const registryContracts = JSON.parse(JSON.stringify((_a = this.capabilities) === null || _a === void 0 ? void 0 : _a.getBaselineRegistryContracts()));
            const contractParams = registryContracts[2]; // "shuttle" launch contract
            // ^^ FIXME -- load from disk -- this is a wrapper to deploy the OrgRegistry contract
            yield this.deployWorkgroupContract("Shuttle", "registry", contractParams);
            yield this.requireWorkgroupContract("organization-registry");
        });
    }
    registerWorkgroupOrganization() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.workgroup || !this.workgroupToken || !this.org) {
                return Promise.reject("failed to register workgroup organization");
            }
            return (yield provide_js_1.Ident.clientFactory(this.workgroupToken, (_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.identApiScheme, (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.identApiHost)).createApplicationOrganization(this.workgroup.id, {
                organization_id: this.org.id,
            });
        });
    }
    setWorkgroup(workgroup, workgroupToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!workgroup || !workgroupToken || !this.workgroup || this.workgroupToken) {
                return Promise.reject("failed to set workgroup");
            }
            this.workgroup = workgroup;
            this.workgroupToken = workgroupToken;
            return this.initWorkgroup();
        });
    }
    fetchWorkgroupOrganizations() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.workgroup || !this.workgroupToken) {
                return Promise.reject("failed to fetch workgroup organizations");
            }
            return (yield provide_js_1.Ident.clientFactory(this.workgroupToken, (_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.identApiScheme, (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.identApiHost).fetchApplicationOrganizations(this.workgroup.id, {}));
        });
    }
    createOrgToken() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            return yield provide_js_1.Ident.clientFactory((_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.token, (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.identApiScheme, (_c = this.baselineConfig) === null || _c === void 0 ? void 0 : _c.identApiHost).createToken({
                organization_id: this.org.id,
            });
        });
    }
    createWorkgroupToken() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            return yield provide_js_1.Ident.clientFactory((_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.token, (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.identApiScheme, (_c = this.baselineConfig) === null || _c === void 0 ? void 0 : _c.identApiHost).createToken({
                application_id: this.workgroup.id,
            });
        });
    }
    resolveOrganizationAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.fetchKeys();
            if (keys && keys.length >= 3) {
                return keys[2].address; // HACK!
            }
            return Promise.reject("failed to resolve organization address");
        });
    }
    fetchOrganization(address) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const orgRegistryContract = yield this.requireWorkgroupContract("organization-registry");
            const nchain = provide_js_1.nchainClientFactory(this.workgroupToken, (_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.nchainApiScheme, (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.nchainApiHost);
            const signerResp = (yield nchain.createAccount({
                network_id: (_c = this.baselineConfig) === null || _c === void 0 ? void 0 : _c.networkId,
            }));
            const resp = yield provide_js_1.NChain.clientFactory(this.workgroupToken, (_d = this.baselineConfig) === null || _d === void 0 ? void 0 : _d.nchainApiScheme, (_e = this.baselineConfig) === null || _e === void 0 ? void 0 : _e.nchainApiHost).executeContract(orgRegistryContract.id, {
                method: "getOrg",
                params: [address],
                value: 0,
                account_id: signerResp["id"],
            });
            if (resp && resp["response"] && resp["response"][0] !== "0x0000000000000000000000000000000000000000") {
                const org = {};
                org.name = resp["response"][1].toString();
                org["address"] = resp["response"][0];
                org["config"] = JSON.parse(atob(resp["response"][5]));
                org["config"]["messaging_endpoint"] = atob(resp["response"][2]);
                org["config"]["zk_public_key"] = atob(resp["response"][4]);
                return Promise.resolve(org);
            }
            return Promise.reject(`failed to fetch organization ${address}`);
        });
    }
    requireCircuit(circuitId) {
        return __awaiter(this, void 0, void 0, function* () {
            let circuit = undefined;
            const orgToken = yield this.createOrgToken();
            const tkn = orgToken.accessToken || orgToken.token;
            let interval;
            const promises = [];
            promises.push(new Promise((resolve, reject) => {
                interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    circuit = (yield ((_a = this.privacy) === null || _a === void 0 ? void 0 : _a.fetchCircuit(circuitId)));
                    if (circuit && circuit.verifierContract && circuit.verifierContract["source"]) {
                        resolve();
                    }
                }), 2500);
            }));
            yield Promise.all(promises);
            clearInterval(interval);
            interval = null;
            return circuit;
        });
    }
    fetchVaults() {
        return __awaiter(this, void 0, void 0, function* () {
            const orgToken = yield this.createOrgToken();
            const token = orgToken.accessToken || orgToken.token;
            return (yield provide_js_1.Vault.clientFactory(token, this.baselineConfig.vaultApiScheme, this.baselineConfig.vaultApiHost).fetchVaults({}));
        });
    }
    createVaultKey(vaultId, spec, type, usage) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const orgToken = yield this.createOrgToken();
            const token = orgToken.accessToken || orgToken.token;
            const vault = provide_js_1.Vault.clientFactory(token, (_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.vaultApiScheme, (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.vaultApiHost);
            return (yield vault.createVaultKey(vaultId, {
                "type": type || "asymmetric",
                "usage": usage || "sign/verify",
                "spec": spec,
                "name": `${this.org.name} ${spec} keypair`,
                "description": `${this.org.name} ${spec} keypair`,
            }));
        });
    }
    requireVault(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let tkn = token;
            if (!tkn) {
                const orgToken = yield this.createOrgToken();
                tkn = orgToken.accessToken || orgToken.token;
            }
            return yield tryTimes(() => __awaiter(this, void 0, void 0, function* () {
                const vaults = yield provide_js_1.Vault.clientFactory(tkn, this.baselineConfig.vaultApiScheme, this.baselineConfig.vaultApiHost).fetchVaults({});
                if (vaults && vaults.length > 0) {
                    return vaults[0];
                }
                throw new Error();
            }));
        });
    }
    signMessage(vaultId, keyId, message) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const orgToken = yield this.createOrgToken();
            const token = orgToken.accessToken || orgToken.token;
            const vault = provide_js_1.Vault.clientFactory(token, (_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.vaultApiScheme, (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.vaultApiHost);
            return (yield vault.signMessage(vaultId, keyId, message));
        });
    }
    fetchKeys() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const orgToken = yield this.createOrgToken();
            const token = orgToken.accessToken || orgToken.token;
            const vault = provide_js_1.Vault.clientFactory(token, (_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.vaultApiScheme, (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.vaultApiHost);
            const vlt = yield this.requireVault(token);
            return (yield vault.fetchVaultKeys(vlt.id, {}));
        });
    }
    fetchSecret(vaultId, secretId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const orgToken = yield this.createOrgToken();
            const token = orgToken.accessToken || orgToken.token;
            const vault = provide_js_1.Vault.clientFactory(token, (_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.vaultApiScheme, (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.vaultApiHost);
            return (yield vault.fetchVaultSecret(vaultId, secretId));
        });
    }
    deployBaselineCircuit() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            // perform trusted setup and deploy verifier/shield contract
            const circuit = yield ((_a = this.privacy) === null || _a === void 0 ? void 0 : _a.deploy({
                identifier: "cubic",
                proving_scheme: "groth16",
                curve: "BN256",
                provider: "gnark",
                name: "my 1337 circuit",
            }));
            this.baselineCircuit = yield this.requireCircuit(circuit.id);
            this.workflowIdentifier = (_b = this.baselineCircuit) === null || _b === void 0 ? void 0 : _b.id;
            const compilerOutput = JSON.parse(solc_1.compile(JSON.stringify({
                language: "Solidity",
                sources: {
                    "verifier.sol": {
                        content: (_c = this.baselineCircuit) === null || _c === void 0 ? void 0 : _c.verifierContract["source"].replace(/\^0.5.0/g, "^0.7.3").replace(/view/g, "").replace(/gas,/g, "gas(),"),
                    },
                },
                settings: {
                    outputSelection: {
                        "*": {
                            "*": ["*"],
                        },
                    },
                },
            })));
            if (!compilerOutput.contracts || !compilerOutput.contracts["verifier.sol"]) {
                throw new Error("verifier contract compilation failed");
            }
            const contractParams = compilerOutput.contracts["verifier.sol"]["Verifier"];
            yield this.deployWorkgroupContract("Verifier", "verifier", contractParams);
            yield this.requireWorkgroupContract("verifier");
            const shieldAddress = yield this.deployWorkgroupShieldContract();
            const trackedShield = yield ((_d = this.baseline) === null || _d === void 0 ? void 0 : _d.track(shieldAddress));
            if (!trackedShield) {
                console.log("WARNING: failed to track baseline shield contract");
            }
            return this.baselineCircuit;
        });
    }
    deployWorkgroupContract(name, type, params, arvg) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.workgroupToken) {
                return Promise.reject("failed to deploy workgroup contract");
            }
            if (!params.bytecode && params.evm) { // HACK
                params.bytecode = `0x${params.evm.bytecode.object}`;
            }
            const nchain = provide_js_1.nchainClientFactory(this.workgroupToken, (_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.nchainApiScheme, (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.nchainApiHost);
            const signerResp = (yield nchain.createAccount({
                network_id: (_c = this.baselineConfig) === null || _c === void 0 ? void 0 : _c.networkId,
            }));
            const resp = yield nchain.createContract({
                address: "0x",
                params: {
                    account_id: signerResp["id"],
                    compiled_artifact: params,
                    // network: 'mainnet',
                    argv: arvg || [],
                },
                name: name,
                network_id: (_d = this.baselineConfig) === null || _d === void 0 ? void 0 : _d.networkId,
                type: type,
            });
            if (resp && resp) {
                this.contracts[type] = resp;
                this.contracts[type].params = {
                    compiled_artifact: params,
                };
            }
            return resp;
        });
    }
    deployWorkgroupShieldContract() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const verifierContract = yield this.requireWorkgroupContract("verifier");
            const registryContracts = JSON.parse(JSON.stringify((_a = this.capabilities) === null || _a === void 0 ? void 0 : _a.getBaselineRegistryContracts()));
            const contractParams = registryContracts[3]; // "shuttle circle" factory contract
            const argv = ["MerkleTreeSHA Shield", verifierContract.address, 32];
            // deploy EYBlockchain's MerkleTreeSHA contract (see https://github.com/EYBlockchain/timber)
            yield this.deployWorkgroupContract("ShuttleCircuit", "circuit", contractParams, argv);
            const shieldContract = yield this.requireWorkgroupContract("shield");
            return shieldContract.address;
        });
    }
    inviteWorkgroupParticipant(email) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            return yield provide_js_1.Ident.clientFactory((_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.token, (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.identApiScheme, (_c = this.baselineConfig) === null || _c === void 0 ? void 0 : _c.identApiHost).createInvitation({
                application_id: this.workgroup.id,
                email: email,
                permissions: 0,
                params: {
                    erc1820_registry_contract_address: this.contracts["erc1820-registry"].address,
                    invitor_organization_address: yield this.resolveOrganizationAddress(),
                    authorized_bearer_token: yield this.vendNatsAuthorization(),
                    organization_registry_contract_address: this.contracts["organization-registry"].address,
                    shield_contract_address: this.contracts["shield"].address,
                    verifier_contract_address: this.contracts["verifier"].address,
                    workflow_identifier: this.workflowIdentifier,
                },
            });
        });
    }
    requireCapabilities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tryTimes(() => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if ((_a = this.capabilities) === null || _a === void 0 ? void 0 : _a.getBaselineRegistryContracts()) {
                    return;
                }
                throw new Error();
            }));
        });
    }
    requireOrganization(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tryTimes(() => __awaiter(this, void 0, void 0, function* () {
                const org = yield this.fetchOrganization(address);
                if (org && org["address"].toLowerCase() === address.toLowerCase()) {
                    return org;
                }
                throw new Error();
            }));
        });
    }
    requireWorkgroup() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tryTimes(() => __awaiter(this, void 0, void 0, function* () {
                if (this.workgroup) {
                    return this.workgroup;
                }
                throw new Error();
            }));
        });
    }
    requireWorkgroupContract(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tryTimes(() => this.resolveWorkgroupContract(type));
        });
    }
    resolveWorkgroupContract(type) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const nchain = provide_js_1.nchainClientFactory(this.workgroupToken, (_a = this.baselineConfig) === null || _a === void 0 ? void 0 : _a.nchainApiScheme, (_b = this.baselineConfig) === null || _b === void 0 ? void 0 : _b.nchainApiHost);
            const contracts = yield nchain.fetchContracts({
                type: type,
            });
            if (contracts && contracts.length === 1 && contracts[0]["address"] !== "0x") {
                const contract = yield nchain.fetchContractDetails(contracts[0].id);
                this.contracts[type] = contract;
                return Promise.resolve(contract);
            }
            return Promise.reject();
        });
    }
    registerOrganization(name, messagingEndpoint) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.org = yield ((_a = this.baseline) === null || _a === void 0 ? void 0 : _a.createOrganization({
                name: name,
                metadata: {
                    messaging_endpoint: messagingEndpoint,
                },
            }));
            if (this.org) {
                const vault = yield this.requireVault();
                this.babyJubJub = yield this.createVaultKey(vault.id, "babyJubJub");
                yield this.createVaultKey(vault.id, "secp256k1");
                this.hdwallet = yield this.createVaultKey(vault.id, "BIP39");
                yield this.registerWorkgroupOrganization();
            }
            return this.org;
        });
    }
    startProtocolSubscriptions() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this.nats) === null || _a === void 0 ? void 0 : _a.isConnected())) {
                yield ((_b = this.nats) === null || _b === void 0 ? void 0 : _b.connect());
            }
            const subscription = yield ((_c = this.nats) === null || _c === void 0 ? void 0 : _c.subscribe(baselineProtocolMessageSubject, (msg, err) => {
                this.protocolMessagesRx++;
                this.dispatchProtocolMessage(types_1.unmarshalProtocolMessage(Buffer.from(msg.data)));
            }));
            this.protocolSubscriptions.push(subscription);
            return this.protocolSubscriptions;
        });
    }
    protocolMessageFactory(opcode, recipient, shield, identifier, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const vaults = yield this.fetchVaults();
            const signature = (yield this.signMessage(vaults[0].id, this.hdwallet.id, js_sha256_1.sha256(payload.toString()))).signature;
            return {
                opcode: opcode,
                sender: yield this.resolveOrganizationAddress(),
                recipient: recipient,
                shield: shield,
                identifier: identifier,
                signature: signature,
                type: types_1.PayloadType.Text,
                payload: payload,
            };
        });
    }
    vendNatsAuthorization() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const authService = new ts_natsutil_1.AuthService(log, ((_a = this.natsConfig) === null || _a === void 0 ? void 0 : _a.audience) || this.natsConfig.natsServers[0], (_b = this.natsConfig) === null || _b === void 0 ? void 0 : _b.privateKey, (_c = this.natsConfig) === null || _c === void 0 ? void 0 : _c.publicKey);
            const permissions = {
                publish: {
                    allow: ["baseline.>"],
                },
                subscribe: {
                    allow: ["baseline.proxy"],
                },
            };
            return yield authService.vendBearerJWT(baselineProtocolMessageSubject, 5000, permissions);
        });
    }
}
exports.ParticipantStack = ParticipantStack;
//# sourceMappingURL=index.js.map