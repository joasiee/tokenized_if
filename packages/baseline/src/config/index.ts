import path from "path";

interface Config {
  APP_ROOT: string;
  CONTRACTS: {
    ORG_REGISTRY: string;
    ERC_1820: string;
  };
}

export const config: Config = {
  APP_ROOT: path.resolve(__dirname, "..", ".."),
  CONTRACTS: {
    ORG_REGISTRY: "OrgRegistry.json",
    ERC_1820: "ERC1820Registry.json",
  },
};
