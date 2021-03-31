import { expect } from "chai";
import { describe, it } from "mocha";
import { config } from "../src/config";

import { HDWallet } from "../src/blockchain-mgr";
import { deployContract, getContract, isDeployed } from "../src/blockchain-mgr";

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
    describe("deployContract", function () {
      it("should deploy erc1820 contract", async function () {
        const contract = await deployContract(config.CONTRACTS.ERC_1820, []);
      });
    });
  });
});
