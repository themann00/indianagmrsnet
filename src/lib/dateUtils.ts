/**
 * Utility for handling Skywarn specific date and time logic.
 * All times from the spreadsheet are assumed to be EST.
 */

export function getReportAgeInHours(dateStr: string): number {
    if (!dateStr || dateStr.toUpperCase() === 'LIVE') return 0;

    try {
        // Expected format: "3/4/2026 18:36:00"
        const reportDate = new Date(dateStr);
        if (isNaN(reportDate.getTime())) return 0;

        // Get current time
        const now = new Date();

        // Calculate difference in milliseconds
        const diffMs = now.getTime() - reportDate.getTime();

        // Convert to hours
        return Math.max(0, diffMs / (1000 * 60 * 60));
    } catch (e) {
        console.error("Error parsing report date:", e);
        return 0;
    }
}

export function formatDateOnly(dateStr: string): string {
    if (!dateStr) return "";
    if (dateStr.toUpperCase() === 'LIVE') return "LIVE";

    try {
        // If it's a full date string, strip the time
        // Matches "3/4/2026 18:36:00" -> "3/4/2026"
        const dateMatch = dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}/);
        if (dateMatch) return dateMatch[0];

        // Fallback to standard JS parsing if it's not a simple string
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;

        return date.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
}
