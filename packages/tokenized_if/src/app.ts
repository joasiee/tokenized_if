import express from "express";

import apiRouter from "./routes";
import { getLogger } from "./logging";

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

// Start listening
app.listen(port, () => console.log(`App listening on port ${port}`));
