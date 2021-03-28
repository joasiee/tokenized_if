import { OrgRegistry } from "@tokenized_if/shared/src/proto/organizations_pb";
import { deployContract } from "../../blockchain-mgr";

export class OrganizationsService {
  async deployRegistry(registry: OrgRegistry): Promise<OrgRegistry> {
    const erc1820 = await deployContract("ERC1820Registry.json", []);
    await deployContract("Registrar.json", [erc1820.address]);
    return new Promise<OrgRegistry>(function (resolve, reject) {
      deployContract("OrgRegistry.json", [erc1820.address])
        .then((contract) => {
          registry.setAddress(contract.address);
          resolve(registry);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
