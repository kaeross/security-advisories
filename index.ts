import { IAuditReport, IVulnerability } from "./audit_report";
import { Severity, severityValue } from "./severity";

/**
 * Focuses the audit report so that only the highest severity vulnerabilities are shown.
 * 
 * @param auditReport
 * 
 * @returns a focused audit report
 */
export const getFocusedLog = (auditReport: IAuditReport): IAuditReport => {
    const focusedAuditReport: IAuditReport = {...auditReport};

    focusedAuditReport.vulnerabilities = getHighestVulnerabilities(auditReport.vulnerabilities);

    return focusedAuditReport;
}

/**
 * Removes any vulnerabilities that are lower than the highest severity.
 * 
 * @param vulnerabilities an object containing all vulnerabilities
 * 
 * @returns an object containing only the highest severity vulnerabilities
 */
const getHighestVulnerabilities = (vulnerabilities: Record<string, IVulnerability>): Record<string, IVulnerability> => {
    let highestVulnerabilities: Record<string, IVulnerability> = {};

    let highestSeverity = Severity.INFO;

    for (const key in vulnerabilities) {
        const vulnerability = vulnerabilities[key];

        if (isSeverityHigher(highestSeverity, vulnerability.severity)) {
            continue;
        }

        if (isSeverityHigher(vulnerability.severity, highestSeverity)) {
            highestSeverity = vulnerability.severity;
            highestVulnerabilities = {};
        }

        highestVulnerabilities[key] = vulnerability;
    }

    return highestVulnerabilities;
}

/**
 * Compares two severities and returns true if the first is higher than the second.
 * 
 * @param severity
 * @param severityToCompare 
 * 
 * @returns boolean
 */
const isSeverityHigher = (severity: Severity, severityToCompare: Severity): boolean => {
    return severityValue[severity] > severityValue[severityToCompare];
}