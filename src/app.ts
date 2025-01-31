import { logger } from "./lib/logger.js";
import { loadToSheetFromDbScheduledTask, loadToDbFromWbScheduledTask, loadToDbFromWb, loadToSheetsFromDb } from "./scheduler.js";

import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

/** Manual trigger to upload from wildberry to db */
app.post("/wb-to-db-load", async (req, res) => {
    try {
        await loadToDbFromWb();
        return res.status(200).send("Success");
    } catch {
        return res.status(500).send("Server Error");
    }
});

/** Manual trigger to upload from db to google sheets */
app.post("/db-to-gs-load", async (req, res) => {
    try {
        await loadToSheetsFromDb({ spreadsheetIds: req.body.spreadsheetIds });
        return res.status(200).send("Success");
    } catch {
        return res.status(500).send("Server Error");
    }
});
//TODO: ADD routes to control corn tasks e.g. start/stop

app.listen(port, "0.0.0.0", () => {
    logger.info("Starting App");
    logger.info(`listening on port ${port}`);
    loadToDbFromWbScheduledTask.start();
    loadToSheetFromDbScheduledTask.start();
});
