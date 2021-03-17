/// <reference types="express" />
/// <reference types="qs" />
import winston from "winston";
export declare const logger: winston.Logger;
export declare const reqLogger: (service: any) => import("express").Handler;
export declare const reqErrorLogger: (service: any) => import("express").ErrorRequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
//# sourceMappingURL=index.d.ts.map