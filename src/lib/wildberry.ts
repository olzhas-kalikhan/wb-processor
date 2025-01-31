import "dotenv/config";
import axios, { AxiosError } from "axios";
import { logger } from "./logger.js";

export type Commission = {
    kgvpMarketplace: number;
    kgvpSupplier: number;
    kgvpSupplierExpress: number;
    paidStorageKgvp: number;
    parentID: number;
    parentName: string;
    subjectID: number;
    subjectName: string;
};

type GetCommissionResponse = {
    report: Commission[];
};

const getCommissionData = async () => {
    try {
        const response = await axios.get<GetCommissionResponse>("https://common-api.wildberries.ru/api/v1/tariffs/commission", {
            "headers": {
                "Authorization": `${process.env.WB_KEY}`,
            },
        });
        logger.info(`Received: ${response.data.report.length} records`);
        return response.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            logger.error({
                status: err.response?.status,
                code: err.response?.statusText,
            });
        } else {
            logger.error(err);
        }
    }
};
const wbService = { getCommissionData };
export default wbService;
