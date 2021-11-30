import { Severity } from "./severity";

export interface IAuditReport extends Record<string, any> {
    vulnerabilities: Record<string, IVulnerability>;
}

export interface IVulnerability extends Record<string, any> {
    severity: Severity;
}