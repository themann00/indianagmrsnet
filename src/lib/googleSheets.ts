function parseGoogleValue(value: any) {
    if (typeof value === 'string' && value.startsWith('Date(')) {
        const parts = value.match(/\d+/g);
        if (parts) {
            const [y, m, d, h = 0, min = 0, s = 0] = parts.map(Number);
            // Google month is 0-indexed, but Date(y,m,d) constructor also expects 0-indexed.
            // However, we want to return a string that's easy to parse and shows the time.
            // Format: "M/D/YYYY H:mm:ss"
            return `${m + 1}/${d}/${y} ${h}:${String(min).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
    }
    return value;
}

export async function fetchSheetData(sheetId: string, sheetName: string = "Sheet1") {
    try {
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
        const response = await fetch(url, { cache: 'no-store' }); // Ensure fresh data
        const text = await response.text();

        const jsonString = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
        const data = JSON.parse(jsonString);

        const rows = data.table.rows;
        const cols = data.table.cols;

        return rows.map((row: any) => {
            const entry: any = {};
            row.c.forEach((cell: any, index: number) => {
                const key = cols[index]?.label || `column${index}`;
                if (key) {
                    entry[key] = parseGoogleValue(cell?.v ?? null);
                }
            });
            return entry;
        });
    } catch (error) {
        console.error("Error fetching Google Sheet data:", error);
        return [];
    }
}
