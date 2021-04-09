import path from "path";

/** Global app config interface. */
interface Config {
  APP_ROOT: string;
  CONTRACTS: {
    ORG_REGISTRY: string;
    ERC_1820: string;
    SHIELD: string;
  };
  TREE_HEIGHT: number;
}

export const config: Config = {
  APP_ROOT: path.resolve(__dirname, "..", ".."),
  CONTRACTS: {
    ORG_REGISTRY: "OrgRegistry",
    ERC_1820: "ERC1820Registry",
    SHIELD: "Shield"
  },
  TREE_HEIGHT: 8
};
