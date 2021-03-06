import { expect } from "chai";
import { describe, it } from "mocha";
import { config } from "../src/config";

import { HDWallet } from "../src/blockchain-mgr";
import { deployContract, getContract, isDeployed } from "../src/blockchain-mgr";
import { Contract } from "ethers";

describe("Blockchain Manager", function () {
  describe("HD Wallet", function () {
    let wallet: HDWallet;
    before(function () {
      wallet = HDWallet.getInstance();
    });
    it("should not return wallet with master mnemonic", function () {
      expect(wallet.getWallet().mnemonic).to.not.eq(process.env.BMGR_MNEMONIC);
    });
    it("should return new wallets on updateWallet", function () {
      const address1 = wallet.getWallet().getAddress();
      wallet.updateWallet();
      const address2 = wallet.getWallet().getAddress();
      expect(address1).to.not.eq(address2);
    });
    it("should return similar wallets when no update is issued", async function () {
      const wallet1 = wallet.getWallet();
      const wallet2 = wallet.getWallet();
      expect(await wallet1.getAddress()).to.eq(await wallet2.getAddress());
      expect(wallet1.privateKey).to.eq(wallet2.privateKey);
      expect(wallet1.publicKey).to.eq(wallet2.publicKey);
      expect(wallet1.provider).to.eq(wallet2.provider);
    });
  });

  describe("Contracts", function () {
    let contract: Contract;
    before(async function () {
      contract = await deployContract(config.CONTRACTS.ERC_1820, []);
    });
    it("should deploy erc1820 contract", async function () {
      expect(await isDeployed(contract.address)).to.be.true;
    });
    it("should get deployed contract at address", async function () {
      const contract2 = await getContract(contract.address, config.CONTRACTS.ERC_1820);
      expect(contract.address).to.eq(contract2.address);
      expect(contract.interface).to.deep.eq(contract2.interface);
    });
    it("should not get deployed contract using wrong interface", async function () {
      const contract2 = await getContract(contract.address, config.CONTRACTS.ORG_REGISTRY);
      expect(contract.address).to.eq(contract2.address);
      expect(contract.interface).to.not.deep.eq(contract2.interface);
    });
    it("should not get contract for non existent address", function () {
      getContract("0xe78f4e45e2b2518b9af85f16b814ddd66b1d053f", config.CONTRACTS.ORG_REGISTRY).catch(function (err) {
        expect(err.reason).to.eq("contract not deployed");
      });
    });
  });
});
