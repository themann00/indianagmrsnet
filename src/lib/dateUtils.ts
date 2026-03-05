/**
 * Utility for handling Skywarn specific date and time logic.
 * All times from the spreadsheet are assumed to be EST.
 */

export function getReportAgeInHours(dateStr: string): number {
    if (!dateStr || dateStr.toUpperCase() === 'LIVE') return 0;

    try {
        // Force interpretation as EST/EDT (-0500) as per user requirement
        // The format from googleSheets is "M/D/YYYY H:mm:ss"
        const reportDate = new Date(`${dateStr} GMT-0500`);

        if (isNaN(reportDate.getTime())) return 0;

        // Get current UTC time to compare
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
        // Handle "M/D/YYYY H:mm:ss" format by taking just the date part
        const parts = dateStr.split(' ');
        if (parts.length > 0) {
            const datePart = parts[0];
            // Validate it's a date-like string
            if (datePart.includes('/')) return datePart;
        }

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
