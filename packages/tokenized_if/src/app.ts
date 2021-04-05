import express from "express";

import apiRouter from "./routes";
import { getLogger } from "./logging";

import dotenv from "dotenv";
import subscriptions from "./services/messaging";

// Load .env variables in process.env
dotenv.config();

const port = parseInt(process.env.PORT) || 3000;

const app = express();
// Use middleware for parsing message bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add http message logging
const logger = getLogger("http req/res");
app.use(logger);

// Add routing
app.get("/", (req, res) => {
  res.send("App works");
});
app.use("/api", apiRouter);

// Setup message subscriptions
(async function() {
  await subscriptions.setup();
})();

// Start listening
app.listen(port, () => console.log(`App listening on port ${port}`));
