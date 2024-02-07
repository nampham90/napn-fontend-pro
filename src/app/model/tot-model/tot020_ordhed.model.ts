import { TOT040 } from "./tot040_orddtl.model";

export interface TOT020 {
    SOODNO: string;
    CSTMCD: string;
    DELIMTHDCD: string;
    PAYMETHDCD: string;
    DELIPLNDATE: Date | null;
    ORDERDATE: Date | null;
    PAYOFDATE: Date | null;
    SHIPDATE: Date | null;
    SOPLNDATE: Date | null;
    DEPOSIT: number;
    PACKQTY: number
    INSTALLFEE: number;
    ODDISCONT: number;
    TAX: number;
    POSTPAIDFLG: boolean;
    SOREMARK: string;
    USERCD: string;
    tot040_orddtls: TOT040[]
    createdAt: Date | null;
    updatedAt: Date | null;

}