const erc1820 = artifacts.require("ERC1820Registry");
const registrar = artifacts.require("Registrar");
const orgRegistry = artifacts.require("OrgRegistry");

module.exports = function (deployer) {
  deployer.deploy(erc1820).then(function () {
    deployer.deploy(registrar, erc1820.address);
    return deployer.deploy(orgRegistry, erc1820.address);
  });
};
