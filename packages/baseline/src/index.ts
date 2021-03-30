import { OrganizationsService } from "./organization-mgr/service";
import { Organization, OrgRegistry } from "@tokenized_if/shared/src/proto/organizations_pb";

const main = async () => {
  const service: OrganizationsService = new OrganizationsService();
  await service.init();
  const reg = await service.getRegistry(new OrgRegistry().setName("test"));
  await service.addOrganization(
    reg,
    new Organization()
      .setName("henkies")
      .setAddress("0x5d6A132B7BA9b76D319f78b1885b88a72FCC45A5")
      .setMsgkey(
        "0x0471099dd873dacf9570f147b9e07ebd671e05bfa63912ee623a800ede8a294f7f60a13fadf1b53d681294cc9b9ff0a4abdf47338ff72d3c34c95cdc9328bd0128"
      )
      .setMsgurl("test")
      .setZkpkey(
        "0x0471099dd873dacf9570f147b9e07ebd671e05bfa63912ee623a800ede8a294f7f60a13fadf1b53d681294cc9b9ff0a4abdf47338ff72d3c34c95cdc9328bd0128"
      )
  );
};

main();
