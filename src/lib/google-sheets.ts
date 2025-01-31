import "dotenv/config";
import { google } from "googleapis";
import { logger } from "./logger.js";

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const sheets = google.sheets({
    "version": "v4",
    auth,
});

const updateSheetValues = async ({ spreadsheetId, values, range }: { spreadsheetId: string; values: (string | number)[][]; range: string }) => {
    try {
        const result = await sheets.spreadsheets.values.batchUpdate({
            spreadsheetId,
            "requestBody": { data: [{ values, range }], valueInputOption: "USER_ENTERED" },
        });
        logger.info(`Google Sheets: Updated ${result.data.totalUpdatedRows} rows`);
    } catch (err) {
        logger.error(err);
    }
};

const getSheetValues = async ({ spreadsheetId }: { spreadsheetId: string }) => {
    try {
        const sheet = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: "stocks_coefs",
        });

        return sheet.data.values;
    } catch (err) {
        logger.error(err);
    }
};

const googleSheetService = {
    getSheetValues,
    updateSheetValues,
};

export default googleSheetService;
