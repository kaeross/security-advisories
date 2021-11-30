enum Severity {
    INFO = 'info',
    LOW = 'low',
    MODERATE = 'moderate',
    HIGH = 'high',
    CRITICAL = 'critical',
}

interface IAuditReport extends Record<string, any> {
    vulnerabilities: Record<string, IVulnerability>;
}

interface IVulnerability extends Record<string, any> {
    severity: Severity;
}

/**
 * Focuses the audit report so that only the highest severity vulnerabilities are shown.
 * 
 * @param auditReport
 * 
 * @returns a focused audit report
 */
export const getFocusedLog = (auditReport: IAuditReport): IAuditReport => {
    auditReport.vulnerabilities = getHighestVulnerabilities(auditReport.vulnerabilities);

    return auditReport;
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
    const severityValue = {
        [Severity.INFO]: 0,
        [Severity.LOW]: 1,
        [Severity.MODERATE]: 2,
        [Severity.HIGH]: 3,
        [Severity.CRITICAL]: 4,
    };

    return severityValue[severity] > severityValue[severityToCompare];
}