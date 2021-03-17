"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveEnv = void 0;
const logger_1 = require("../logger");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const saveEnv = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = `# Set to production when deploying to production
      NODE_ENV="development"
      LOG_LEVEL="debug"

      # Node.js server configuration
      SERVER_PORT=4001

      # MongoDB configuration for the JS client
      DATABASE_USER="${settings.DATABASE_USER}"
      DATABASE_PASSWORD="${settings.DATABASE_PASSWORD}"
      DATABASE_HOST="${settings.DATABASE_HOST}"
      DATABASE_NAME="${settings.DATABASE_NAME}"

      # Ethereum client
      # "ganache": local, private ganache network
      # "besu": local, private besu network
      # "infura-gas": Infura's Managed Transaction (ITX) service
      # "infura": Infura's traditional jsonrpc API
      ETH_CLIENT_TYPE="${settings.LOCAL_ETH_CLIENT_TYPE}"

      # Local client endpoints
      # Websocket port
      # 8545: ganache
      # 8546: besu
      ETH_CLIENT_WS="${settings.LOCAL_ETH_CLIENT_WS}"
      ETH_CLIENT_HTTP="${settings.LOCAL_ETH_CLIENT_HTTP}"

      # Chain ID
      # 1: Mainnet
      # 3: Ropsten
      # 4: Rinkeby
      # 5: Goerli
      # 42: Kovan
      # 101010: Custom network (private ganache or besu network)
      CHAIN_ID=${settings.LOCAL_CHAIN_ID}

      # Ethereum account key-pair. Do not use in production
      WALLET_PRIVATE_KEY="${settings.LOCAL_WALLET_PRIVATE_KEY}"
      WALLET_PUBLIC_KEY="${settings.LOCAL_WALLET_PUBLIC_KEY}"`;
    fs.writeFile(path.join(__dirname, '../.env'), fileContent, (err) => {
        if (err) {
            return logger_1.logger.error(err);
        }
        logger_1.logger.info(".env file created!");
    });
});
exports.saveEnv = saveEnv;
//# sourceMappingURL=index.js.map