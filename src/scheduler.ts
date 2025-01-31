import cron from "node-cron";
import commissionService, { type CommissionDbRecord } from "./db/commission-service.js";
import wbService from "./lib/wildberry.js";
import { logger } from "./lib/logger.js";
import googleSheetService from "./lib/google-sheets.js";

const CRON_HOURLY = "0 * * * *";
const CRON_DAILY = "0 0 * * *";

export const loadToDbFromWb = async () => {
    try {
        const wbData = await wbService.getCommissionData();
        if (wbData) {
            commissionService.insertCommissions(wbData.report);
            logger.info("cron task loadDataFromWB completed");
        } else {
            throw new Error("No report data");
        }
    } catch (err) {
        logger.error(err);
    }
};

export const loadToDbFromWbScheduledTask = cron.schedule(CRON_HOURLY, loadToDbFromWb, { scheduled: false });

const COMPARE_FIELD = "kgvp_marketplace";

const compareCoefs = (a: CommissionDbRecord, b: CommissionDbRecord) => {
    if (a[COMPARE_FIELD] < b[COMPARE_FIELD]) return -1;
    if (a[COMPARE_FIELD] > b[COMPARE_FIELD]) return 1;
    return 0;
};

const toSheetValues = (commissionDbRecord: CommissionDbRecord) => [
    commissionDbRecord.subject_id,
    commissionDbRecord.subject_name,
    commissionDbRecord.parent_id,
    commissionDbRecord.parent_name,
    commissionDbRecord.kgvp_marketplace,
    commissionDbRecord.kgvp_supplier,
    commissionDbRecord.kgvp_supplierExpress,
    commissionDbRecord.paid_storageKgvp,
];

export const loadToSheetsFromDb = async ({ spreadsheetIds }: { spreadsheetIds: string[] }) => {
    const commissionDbRecords = await commissionService.getCommissions();
    const sorted = [...commissionDbRecords].sort(compareCoefs);
    const values = sorted.map(toSheetValues);

    const promises = spreadsheetIds.map((spreadsheetId) =>
        googleSheetService.updateSheetValues({
            spreadsheetId,
            values,
            range: "stocks_coefs",
        }),
    );
    await Promise.allSettled(promises);
    logger.log(`Completed ${promises.length} promises`);
};

export const loadToSheetFromDbScheduledTask = cron.schedule(
    CRON_DAILY,
    () => loadToSheetsFromDb({ spreadsheetIds: (process.env.SPREADSHEET_IDS as string).split(",") }),
    {
        scheduled: false,
    },
);
