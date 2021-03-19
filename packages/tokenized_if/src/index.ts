import {
  baselineServiceFactory,
  baselineProviderRpc,
  IBaselineRPC,
  IBlockchainService,
  IRegistry,
  IVault,
} from "@baseline-protocol/api";

let rpcConfig: any;
rpcConfig = {
  rpcEndpoint: "localhost:4001/jsonrpc",
  rpcScheme: "http",
  rpcVersion: "2.0",
};

let baseline: IBaselineRPC & IBlockchainService & IRegistry & IVault;
baselineServiceFactory(baselineProviderRpc, rpcConfig).then((res) => {
  console.log(res);
  baseline = res;
  baseline.getTracked().then((res) => {
    console.log(res);
  });
});
