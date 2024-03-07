import { TIN010 } from "./tin010_sts.model";
import { TIN040 } from "./tin040_plantdl.model";

export interface TIN020 {
    SIPLNNO: string;
    ARVLPLNDATE: Date;
    SIREMARK: string;
    tin010_sts: TIN010;
    SPPLYCD: number;
    USERCD: number;
    tin040_plandtls: TIN040[];
}