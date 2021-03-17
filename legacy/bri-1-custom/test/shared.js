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
exports.shouldBehaveLikeAnInvitedWorkgroupOrganization = exports.shouldBehaveLikeAnInitialWorkgroupOrganization = exports.shouldBehaveLikeAWorkgroupCounterpartyOrganization = exports.shouldBehaveLikeAWorkgroupOrganization = void 0;
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const shouldBehaveLikeAWorkgroupOrganization = (getApp) => () => {
    mocha_1.describe(`organization details`, () => {
        let org;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            org = getApp().getOrganization();
            chai_1.assert(org, 'org should not be null');
        }));
        mocha_1.describe('contracts', () => {
            let erc1820Registry;
            let orgRegistry;
            let shield;
            let verifier;
            let workflowIdentifier;
            before(() => __awaiter(void 0, void 0, void 0, function* () {
                erc1820Registry = yield getApp().requireWorkgroupContract('erc1820-registry');
                orgRegistry = yield getApp().requireWorkgroupContract('organization-registry');
                shield = getApp().getWorkgroupContract('shield');
                verifier = getApp().getWorkgroupContract('verifier');
                workflowIdentifier = getApp().getWorkflowIdentifier();
                console.log("ORGREGISTRY: " + orgRegistry.address);
                console.log("SHIELD: " + shield.address);
                console.log("VERIFIER: " + verifier.address);
            }));
            it('should have a local reference to the on-chain ERC1820 registry contract', () => __awaiter(void 0, void 0, void 0, function* () {
                chai_1.assert(erc1820Registry, 'ERC1820 registry contract should not be null');
                chai_1.assert(erc1820Registry.address, 'should have a reference to the on-chain ERC1820 registry contract address');
            }));
            it('should have a local reference to the on-chain organization registry contract', () => __awaiter(void 0, void 0, void 0, function* () {
                chai_1.assert(orgRegistry, 'organization registry contract should not be null');
                chai_1.assert(orgRegistry.address, 'should have a reference to the on-chain organization registry contract address');
            }));
            it('should have a local reference to the on-chain workgroup shield contract', () => __awaiter(void 0, void 0, void 0, function* () {
                chai_1.assert(shield, 'workgroup shield contract should not be null');
                chai_1.assert(shield.address, 'should have a reference to the on-chain workgroup shield contract address');
            }));
            it('should track the workgroup shield in an off-chain merkle tree database', () => __awaiter(void 0, void 0, void 0, function* () {
                // @ts-ignore
                const trackedShieldContracts = yield getApp().baseline.getTracked();
                console.log("TRACKED SHIELD CONTRACTS: " + trackedShieldContracts);
                chai_1.assert(trackedShieldContracts.indexOf(shield.address.toLowerCase()) !== -1, 'workgroup shield contract should have been tracked');
            }));
            it('should have a local reference to the on-chain workflow circuit verifier contract', () => __awaiter(void 0, void 0, void 0, function* () {
                chai_1.assert(verifier, 'workflow circuit verifier contract should not be null');
                chai_1.assert(verifier.address, 'should have a reference to the on-chain workflow circuit verifier contract address');
            }));
            it('should have a local reference to the workflow circuit identifier', () => __awaiter(void 0, void 0, void 0, function* () {
                chai_1.assert(workflowIdentifier, 'workflow circuit identifier should not be null');
            }));
        });
        mocha_1.describe('messaging', () => {
            let natsService;
            let natsSubscriptions;
            before(() => __awaiter(void 0, void 0, void 0, function* () {
                natsService = getApp().getMessagingService();
                natsSubscriptions = getApp().getProtocolSubscriptions();
            }));
            it('should have an established NATS connection', () => __awaiter(void 0, void 0, void 0, function* () {
                chai_1.assert(natsService, 'should not be null');
                chai_1.assert(natsService.isConnected() === true, 'should have established a connection');
            }));
            it('should have an established a subscription on the baseline.proxy subject', () => __awaiter(void 0, void 0, void 0, function* () {
                chai_1.assert(natsSubscriptions, 'should not be null');
                chai_1.assert(natsSubscriptions.length === 1, 'should have established a subscription');
            }));
        });
        mocha_1.describe('registration', () => {
            let address;
            before(() => __awaiter(void 0, void 0, void 0, function* () {
                const keys = yield getApp().fetchKeys();
                address = keys && keys.length >= 3 ? keys[2].address : null;
                chai_1.assert(address, 'default secp256k1 keypair should not be null');
            }));
            it('should register the organization in the local registry', () => __awaiter(void 0, void 0, void 0, function* () {
                chai_1.assert(org.id, 'org id should not be null');
            }));
            it('should register the organization in the on-chain registry using its default secp256k1 address', () => __awaiter(void 0, void 0, void 0, function* () {
                const org = yield getApp().requireOrganization(address);
                chai_1.assert(org, 'org should be present in on-chain registry');
            }));
            it('should associate the organization with the local workgroup', () => __awaiter(void 0, void 0, void 0, function* () {
                const orgs = yield getApp().fetchWorkgroupOrganizations();
                chai_1.assert(orgs.length === 1, 'workgroup should have associated org');
            }));
        });
        mocha_1.describe('vault', () => {
            let address;
            let keys;
            before(() => __awaiter(void 0, void 0, void 0, function* () {
                keys = yield getApp().fetchKeys();
                address = keys && keys.length >= 3 ? keys[2].address : null;
            }));
            it('should create a default vault for the organization', () => __awaiter(void 0, void 0, void 0, function* () {
                const vaults = yield getApp().fetchVaults();
                chai_1.assert(vaults.length === 1, 'default vault not created');
            }));
            it('should create a set of keypairs for the organization', () => __awaiter(void 0, void 0, void 0, function* () {
                chai_1.assert(keys, 'default keypairs should not be null');
                chai_1.assert(keys.length >= 4, 'minimum default keypairs not created');
                // assert(keys.length === 4, 'default keypairs not created');
            }));
            it('should create a babyJubJub keypair for the organization', () => __awaiter(void 0, void 0, void 0, function* () {
                chai_1.assert(keys[1].spec === 'babyJubJub', 'default babyJubJub keypair not created');
            }));
            it('should create a secp256k1 keypair for the organization', () => __awaiter(void 0, void 0, void 0, function* () {
                chai_1.assert(keys[2].spec === 'secp256k1', 'default secp256k1 keypair not created');
            }));
            it('should resolve the created secp256k1 keypair as the organization address', () => __awaiter(void 0, void 0, void 0, function* () {
                const addr = yield getApp().resolveOrganizationAddress();
                chai_1.assert(keys[2].address === addr, 'default secp256k1 keypair should resolve as the organization address');
            }));
            it('should create a BIP39 HD wallet for the organization', () => __awaiter(void 0, void 0, void 0, function* () {
                chai_1.assert(keys[3].spec === 'BIP39', 'default BIP39 HD wallet not created');
            }));
        });
        mocha_1.describe('workflow privacy', () => {
            let circuit;
            mocha_1.describe('zkSNARK circuits', () => {
                mocha_1.describe('synchronization', () => {
                    before(() => __awaiter(void 0, void 0, void 0, function* () {
                        // We need to Wait fo the Sync
                        while (getApp().getBaselineCircuit() === undefined) {
                            yield sleep(10000);
                        }
                        circuit = getApp().getBaselineCircuit();
                        chai_1.assert(circuit, 'setup artifacts should not be null');
                    }));
                    it('should have a copy of the unique identifier for the circuit', () => __awaiter(void 0, void 0, void 0, function* () {
                        chai_1.assert(circuit.id, 'identifier should not be null');
                    }));
                    it('should have a copy of the proving key id', () => __awaiter(void 0, void 0, void 0, function* () {
                        chai_1.assert(circuit.provingKeyId, 'proving key id should not be null');
                    }));
                    it('should have a copy of the verifying key id', () => __awaiter(void 0, void 0, void 0, function* () {
                        chai_1.assert(circuit.verifyingKeyId, 'verifying key id should not be null');
                    }));
                    it('should have a copy of the raw verifier source code', () => __awaiter(void 0, void 0, void 0, function* () {
                        chai_1.assert(circuit.verifierContract, 'verifier contract should not be null');
                        chai_1.assert(circuit.verifierContract.source, 'verifier source should not be null');
                    }));
                    it('should store a reference to the workflow circuit identifier', () => __awaiter(void 0, void 0, void 0, function* () {
                        chai_1.assert(getApp().getWorkflowIdentifier() === circuit.id, 'workflow circuit identifier should have a reference');
                    }));
                    it('should have a copy of the compiled circuit r1cs', () => __awaiter(void 0, void 0, void 0, function* () {
                        chai_1.assert(circuit.artifacts, 'circuit artifacts should not be null');
                        chai_1.assert(circuit.artifacts.binary, 'circuit r1cs artifact should not be null');
                    }));
                    it('should have a copy of the keypair for proving and verification', () => __awaiter(void 0, void 0, void 0, function* () {
                        chai_1.assert(circuit.artifacts, 'circuit artifacts should not be null');
                        chai_1.assert(circuit.artifacts.proving_key, 'proving key artifact should not be null');
                        chai_1.assert(circuit.artifacts.verifying_key, 'verifying key artifact should not be null');
                    }));
                    // it('should have a copy of the ABI of the compiled circuit', async () => {
                    //   assert(circuit.abi, 'artifacts should contain the abi');
                    // });
                    mocha_1.describe('on-chain artifacts', () => {
                        let shield;
                        let verifier;
                        before(() => __awaiter(void 0, void 0, void 0, function* () {
                            shield = getApp().getWorkgroupContract('shield');
                            verifier = getApp().getWorkgroupContract('verifier');
                        }));
                        it('should reference the deposited workgroup shield contract on-chain', () => __awaiter(void 0, void 0, void 0, function* () {
                            chai_1.assert(shield, 'workgroup shield contract should not be null');
                            chai_1.assert(shield.address, 'workgroup shield contract should have been deployed');
                        }));
                        it('should track the workgroup shield in an off-chain merkle tree database', () => __awaiter(void 0, void 0, void 0, function* () {
                            // @ts-ignore
                            const trackedShieldContracts = yield getApp().baseline.getTracked();
                            chai_1.assert(trackedShieldContracts.indexOf(shield.address.toLowerCase()) !== -1, 'workgroup shield contract should have been tracked');
                        }));
                        it('should reference the deposited circuit verifier on-chain', () => __awaiter(void 0, void 0, void 0, function* () {
                            chai_1.assert(verifier, 'workflow circuit verifier contract should not be null');
                            chai_1.assert(verifier.address, 'workflow circuit verifier contract should have been deployed');
                        }));
                    });
                });
            });
        });
    });
};
exports.shouldBehaveLikeAWorkgroupOrganization = shouldBehaveLikeAWorkgroupOrganization;
const shouldBehaveLikeAWorkgroupCounterpartyOrganization = (getApp) => () => {
    mocha_1.describe('counterparties', () => __awaiter(void 0, void 0, void 0, function* () {
        let counterparties;
        let authorizedBearerTokens;
        let authorizedBearerToken;
        let messagingEndpoint;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            counterparties = getApp().getWorkgroupCounterparties();
            authorizedBearerTokens = getApp().getNatsBearerTokens();
            authorizedBearerToken = yield getApp().resolveNatsBearerToken(counterparties[0]);
            messagingEndpoint = yield getApp().resolveMessagingEndpoint(counterparties[0]);
            yield getApp().requireOrganization(yield getApp().resolveOrganizationAddress());
        }));
        it('should have a local reference to the workgroup counterparties', () => __awaiter(void 0, void 0, void 0, function* () {
            chai_1.assert(counterparties, 'workgroup counterparties should not be null');
            chai_1.assert(counterparties.length === 1, 'workgroup counterparties should not be empty');
            chai_1.assert(counterparties[0] !== (yield getApp().resolveOrganizationAddress()), 'workgroup counterparties should not contain local org address');
        }));
        it('should have a local reference to peer-authorized messaging endpoints and associated bearer tokens', () => __awaiter(void 0, void 0, void 0, function* () {
            chai_1.assert(authorizedBearerTokens, 'authorized bearer tokens should not be null');
            chai_1.assert(Object.keys(authorizedBearerTokens).length === 1, 'a local reference should exist for a single authorized bearer token');
        }));
        it('should have a local reference to the peer-authorized messaging endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            chai_1.assert(messagingEndpoint, 'peer-authorized messaging endpoint should not be null');
        }));
        it('should have a local reference to the peer-authorized bearer token', () => __awaiter(void 0, void 0, void 0, function* () {
            chai_1.assert(authorizedBearerToken, 'peer-authorized bearer token should not be null');
        }));
    }));
};
exports.shouldBehaveLikeAWorkgroupCounterpartyOrganization = shouldBehaveLikeAWorkgroupCounterpartyOrganization;
const shouldBehaveLikeAnInitialWorkgroupOrganization = (getApp) => () => {
    mocha_1.describe('baseline config', () => {
        let cfg;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            cfg = getApp().getBaselineConfig();
        }));
        it('should have a non-null config', () => __awaiter(void 0, void 0, void 0, function* () {
            chai_1.assert(cfg, 'config should not be null');
        }));
        it('should indicate that this instance is the workgroup initiator', () => __awaiter(void 0, void 0, void 0, function* () {
            chai_1.assert(cfg.initiator === true, 'config should indicate this instance is the workgroup initiator');
        }));
    });
    mocha_1.describe('workflow privacy', () => {
        let circuit;
        mocha_1.describe('zkSNARK circuits', () => {
            mocha_1.describe('provisioning', () => {
                before(() => __awaiter(void 0, void 0, void 0, function* () {
                    circuit = yield getApp().deployBaselineCircuit();
                    chai_1.assert(circuit, 'setup artifacts should not be null');
                }));
                it('should output a unique identifier for the circuit', () => __awaiter(void 0, void 0, void 0, function* () {
                    chai_1.assert(circuit.id, 'identifier should not be null');
                }));
                it('should output the proving key id', () => __awaiter(void 0, void 0, void 0, function* () {
                    chai_1.assert(circuit.provingKeyId, 'proving key id should not be null');
                }));
                it('should output the verifying key id', () => __awaiter(void 0, void 0, void 0, function* () {
                    chai_1.assert(circuit.verifyingKeyId, 'verifying key id should not be null');
                }));
                it('should output the raw verifier source code', () => __awaiter(void 0, void 0, void 0, function* () {
                    chai_1.assert(circuit.verifierContract, 'verifier contract should not be null');
                    chai_1.assert(circuit.verifierContract.source, 'verifier source should not be null');
                }));
                it('should store a reference to the workflow circuit identifier', () => __awaiter(void 0, void 0, void 0, function* () {
                    chai_1.assert(getApp().getWorkflowIdentifier() === circuit.id, 'workflow circuit identifier should have a reference');
                }));
                it('should output the compiled circuit r1cs', () => __awaiter(void 0, void 0, void 0, function* () {
                    chai_1.assert(circuit.artifacts, 'circuit artifacts should not be null');
                    chai_1.assert(circuit.artifacts.binary, 'circuit r1cs artifact should not be null');
                }));
                it('should output the keypair for proving and verification', () => __awaiter(void 0, void 0, void 0, function* () {
                    chai_1.assert(circuit.artifacts, 'circuit artifacts should not be null');
                    chai_1.assert(circuit.artifacts.proving_key, 'proving key artifact should not be null');
                    chai_1.assert(circuit.artifacts.verifying_key, 'verifying key artifact should not be null');
                }));
                // it('should output the ABI of the compiled circuit', async () => {
                //   assert(circuit.abi, 'artifacts should contain the abi');
                // });
                mocha_1.describe('on-chain artifacts', () => {
                    let shield;
                    let verifier;
                    before(() => __awaiter(void 0, void 0, void 0, function* () {
                        shield = getApp().getWorkgroupContract('shield');
                        verifier = getApp().getWorkgroupContract('verifier');
                    }));
                    it('should deposit the workgroup shield contract on-chain', () => __awaiter(void 0, void 0, void 0, function* () {
                        chai_1.assert(shield, 'workgroup shield contract should not be null');
                        chai_1.assert(shield.address, 'workgroup shield contract should have been deployed');
                    }));
                    it('should track the workgroup shield in an off-chain merkle tree database', () => __awaiter(void 0, void 0, void 0, function* () {
                        // @ts-ignore
                        const trackedShieldContracts = yield getApp().baseline.getTracked();
                        console.log("TRACKED AND ACTUAL SHIELD");
                        console.log(trackedShieldContracts);
                        console.log(shield);
                        chai_1.assert(trackedShieldContracts.indexOf(shield.address.toLowerCase()) !== -1, 'workgroup shield contract should have been tracked');
                    }));
                    it('should deposit the circuit verifier on-chain', () => __awaiter(void 0, void 0, void 0, function* () {
                        chai_1.assert(verifier, 'workflow circuit verifier contract should not be null');
                        chai_1.assert(verifier.address, 'workflow circuit verifier contract should have been deployed');
                    }));
                });
            });
        });
    });
};
exports.shouldBehaveLikeAnInitialWorkgroupOrganization = shouldBehaveLikeAnInitialWorkgroupOrganization;
const shouldBehaveLikeAnInvitedWorkgroupOrganization = (getApp) => () => {
    mocha_1.describe('baseline config', () => {
        let cfg;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            cfg = getApp().getBaselineConfig();
        }));
        it('should have a non-null config', () => __awaiter(void 0, void 0, void 0, function* () {
            chai_1.assert(cfg, 'config should not be null');
        }));
        it('should indicate that this instance is not the workgroup initiator', () => __awaiter(void 0, void 0, void 0, function* () {
            chai_1.assert(cfg.initiator === false, 'config should indicate this instance is not the workgroup initiator');
        }));
    });
    mocha_1.describe('workgroup', () => {
        let workgroup;
        let workgroupToken;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            workgroup = getApp().getWorkgroup();
            workgroupToken = getApp().getWorkgroupToken();
        }));
        it('should persist the workgroup in the local registry', () => __awaiter(void 0, void 0, void 0, function* () {
            chai_1.assert(workgroup, 'workgroup should not be null');
            chai_1.assert(workgroup.id, 'workgroup id should not be null');
        }));
        it('should authorize a bearer token for the workgroup', () => __awaiter(void 0, void 0, void 0, function* () {
            chai_1.assert(workgroupToken, 'workgroup token should not be null');
        }));
    });
};
exports.shouldBehaveLikeAnInvitedWorkgroupOrganization = shouldBehaveLikeAnInvitedWorkgroupOrganization;
//# sourceMappingURL=shared.js.map