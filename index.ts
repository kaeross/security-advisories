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

export const getFocusedLog = (auditReport: IAuditReport): IAuditReport => {
    auditReport.vulnerabilities = getHighestVulnerabilities(auditReport.vulnerabilities);

    return auditReport;
}

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