import { OrganizationsService } from "./organization-mgr/service";
import { Organization, OrgRegistry, Workgroup } from "@tokenized_if/shared/src/proto/organizations_pb";

const main = async () => {
  const service: OrganizationsService = new OrganizationsService();
  await service.init();
  const addr = "0xa447b62903070991CF0642d43644Db1192D915b7";
  const reg = await service.getRegistry(new OrgRegistry().setName("test").setAddress(addr));
  // await service.addWorkgroup(
  //   reg,
  //   new Workgroup().setName("henk groep").setShieldaddress(addr).setTokenaddress(addr).setVerifieraddress(addr)
  // );
  // await service.addOrganization(
  //   reg,
  //   new Organization()
  //     .setName("henkies")
  //     .setAddress("0x5d6A132B7BA9b76D319f78b1885b88a72FCC45A5")
  //     .setMsgkey(
  //       "0x0471099dd873dacf9570f147b9e07ebd671e05bfa63912ee623a800ede8a294f7f60a13fadf1b53d681294cc9b9ff0a4abdf47338ff72d3c34c95cdc9328bd0128"
  //     )
  //     .setMsgurl("test")
  //     .setZkpkey(
  //       "0x0471099dd873dacf9570f147b9e07ebd671e05bfa63912ee623a800ede8a294f7f60a13fadf1b53d681294cc9b9ff0a4abdf47338ff72d3c34c95cdc9328bd0128"
  //     )
  // );
};

main();
