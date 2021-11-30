export enum Severity {
    INFO = 'info',
    LOW = 'low',
    MODERATE = 'moderate',
    HIGH = 'high',
    CRITICAL = 'critical',
}

export const severityValue = {
    [Severity.INFO]: 0,
    [Severity.LOW]: 1,
    [Severity.MODERATE]: 2,
    [Severity.HIGH]: 3,
    [Severity.CRITICAL]: 4,
};