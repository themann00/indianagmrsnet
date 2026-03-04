/**
 * Utility to fetch data from a public Google Sheet as JSON.
 * Expects the Sheet to be "Shared with anyone with the link".
 */

export async function fetchSheetData(sheetId: string, sheetName: string = "Sheet1") {
    try {
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
        const response = await fetch(url);
        const text = await response.text();

        // The response starts with "/* google.visualization.Query.setResponse(" and ends with "); */"
        const jsonString = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
        const data = JSON.parse(jsonString);

        const rows = data.table.rows;
        const cols = data.table.cols;

        return rows.map((row: any) => {
            const entry: any = {};
            row.c.forEach((cell: any, index: number) => {
                const key = cols[index].label || `column${index}`;
                entry[key] = cell?.v ?? null;
            });
            return entry;
        });
    } catch (error) {
        console.error("Error fetching Google Sheet data:", error);
        return [];
    }
}
