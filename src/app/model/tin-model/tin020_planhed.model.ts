import { TIN010 } from "./tin010_sts.model";
import { TIN040 } from "./tin040_plantdl.model";

export interface TIN020 {
    SIPLNNO: string;
    ARVLPLNDATE: Date | null;
    SIREMARK: string;
    tin010_st: TIN010;
    STSNM: string,
    SPPLYCD: number;
    USERCD: number;
    tin040_plandtls: TIN040[];
    DIVKBN: string;
    supplier?: Spply;
    employe?: User;
}

interface Spply {
   id: number,
   name: string;
}

interface User {
    id: number;
    name: string;
}