import { commitMgrStart } from "./commit-mgr";
import { testKey } from "./key-mgr";

const main = async () => {
  await testKey();
};

main();
