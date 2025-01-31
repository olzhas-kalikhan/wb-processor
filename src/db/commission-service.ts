import { AxiosError } from "axios";
import { logger } from "../lib/logger.js";
import { type Commission } from "../lib/wildberry.js";
import dbConnection from "./connection.js";

const COMMISSIONS_TABLE_NAME = "commissions" as const;

export type CommissionDbRecord = {
    id?: string;
    subject_id: number;
    subject_name: string;
    parent_id: number;
    parent_name: string;
    kgvp_marketplace: number;
    kgvp_supplier: number;
    kgvp_supplierExpress: number;
    paid_storageKgvp: number;
};
/**
 * 
 * @param commissions - from wb api
 */
const insertCommissions = async (commissions: Commission[]) => {
    try {
        const commissionRecords = commissions.map(
            (commission) =>
                ({
                    subject_id: commission.subjectID,
                    subject_name: commission.subjectName,
                    parent_id: commission.parentID,
                    parent_name: commission.parentName,
                    kgvp_marketplace: commission.kgvpMarketplace,
                    kgvp_supplier: commission.kgvpSupplier,
                    kgvp_supplierExpress: commission.kgvpSupplierExpress,
                    paid_storageKgvp: commission.paidStorageKgvp,
                }) satisfies CommissionDbRecord,
        );
        const res = await dbConnection(COMMISSIONS_TABLE_NAME).insert(commissionRecords).onConflict("subject_id").merge();
        logger.info(res);
    } catch (err) {
        logger.error(err);
    }
};
/**
 * 
 * @returns commissions stored commissions from db
 */
const getCommissions = async () => {
    const res = await dbConnection(COMMISSIONS_TABLE_NAME).select<CommissionDbRecord[]>();

    return res;
};

const commissionService = {
    insertCommissions,
    getCommissions,
};
export default commissionService;
