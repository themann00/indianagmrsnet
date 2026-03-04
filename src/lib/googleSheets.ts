function parseGoogleValue(value: any) {
    if (typeof value === 'string' && value.startsWith('Date(')) {
        const parts = value.match(/\d+/g);
        if (parts) {
            const [y, m, d] = parts.map(Number);
            return new Date(y, m, d).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
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
