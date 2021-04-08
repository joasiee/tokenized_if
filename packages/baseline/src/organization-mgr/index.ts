import { OrganizationsService } from "./service";

export * as org_mgr from "./server";

const main = async function() {
  const service = new OrganizationsService();
  await service.init();
  const contract = await service.deployShield("0xbcc817f057950b0df41206c5d7125e6225cae18e", 8);
  console.log(contract.address);
}

main();