import { TOT020 } from "./tot020_ordhed.model";

export interface TOT010 {
    SOODNO: string;
    QTESTS: boolean;
    ORDSTS: boolean;
    ORDAPPSTS: boolean;
    PAYSTS: boolean;
    SHIPSTS: boolean;
    RSLTSENDFLG: boolean;
    SOCNCLORDFLG: boolean;
    SOCNCLCOMPFLG: boolean;
    EXCHANGEFLG: boolean;
    EXCHANGECOMPFLG: boolean;
    tot020_ordhed: TOT020;
    STSNM: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}