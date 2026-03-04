import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { GMRSEvent } from "@/types/event";

const dataFilePath = path.join(process.cwd(), "src/data/events.json");

function getEvents(): GMRSEvent[] {
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(jsonData);
}

function saveEvents(events: GMRSEvent[]) {
    fs.writeFileSync(dataFilePath, JSON.stringify(events, null, 2), "utf-8");
}

export async function GET() {
    try {
        const events = getEvents();
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // Basic Security Check
        const authHeader = request.headers.get("Authorization");
        const secret = authHeader?.replace("Bearer ", "");

        if (process.env.ADMIN_SECRET && secret !== process.env.ADMIN_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const newEvent: GMRSEvent = await request.json();
        const events = getEvents();

        // Simple ID generation
        const id = (Math.max(...events.map(e => parseInt(e.id)), 0) + 1).toString();
        const eventWithId = { ...newEvent, id };

        events.push(eventWithId);
        saveEvents(events);

        return NextResponse.json(eventWithId, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
    }
}
