import mongoose from "mongoose";
import { getLogger } from "../logger";

const logger = getLogger("mongodb");

// mongo config
const config = {
  mongo: {
    firstConnectRetryDelaySecs: 5
  },
  mongoose: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    poolSize: 5,
    socketTimeoutMS: 0,
    keepAlive: true
  }
};

const { firstConnectRetryDelaySecs } = config.mongo;

// Setup DB
const conn = mongoose.connection;
let mongoUrl;

// Registering db connection event listeners
conn.once("open", () => {
  logger.info("Successfully connected to mongo db.");

  // When successfully connected
  conn.on("connected", () => {
    logger.debug(`Mongoose default connection open ${mongoUrl}.`);
  });

  // If the connection throws an error
  conn.on("error", err => {
    logger.error("Db connection error: %o", err);
  });

  // When the connection is disconnected
  conn.on("disconnected", () => {
    logger.info("Mongoose default connection disconnected.");
  });

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", () => {
    conn.close(() => {
      logger.debug("Mongoose default connection disconnected through app termination.");
      process.exit(0);
    });
  });
});

function simpleSleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Connects to db.
 * @param user username
 * @param pwd password
 * @param db database name
 */
export async function dbConnect(db: string) {
  mongoUrl = `mongodb://${process.env.MONGO_HOST}/${db}`;
  logger.info(`Trying to connect to db at: ${mongoUrl}`);
  // if (config.mongo.debug === true) {
  //   mongoose.set("debug", function(collection, method, query, doc, options) {
  //     logger.debug(`Mongoose ${method} on ${collection} with query:\n%o`, query, {
  //       doc,
  //       options
  //     });
  //   });
  // }

  let connected = false;
  while (!connected) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await mongoose.connect(mongoUrl, config.mongoose);
      connected = true;
    } catch (err) {
      logger.error("\n%o", err);
      logger.info(`Retrying mongodb connection in ${firstConnectRetryDelaySecs}s.`);
    }

    // eslint-disable-next-line no-await-in-loop
    await simpleSleep(firstConnectRetryDelaySecs * 1000);
  }
}

export function dbClose() {
  logger.info("Closing db connection.");
  conn.close();
  mongoose.disconnect();
}
