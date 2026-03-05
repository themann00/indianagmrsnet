"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar as CalendarIcon,
    MapPin,
    Search,
    Filter,
    LayoutGrid,
    List,
    LayoutDashboard,
    ChevronLeft,
    ChevronRight,
    Plus
} from "lucide-react";
import { GMRSEvent, EventCategory } from "@/types/event";
import { fetchSheetData } from "@/lib/googleSheets";
import { useEffect } from "react";

type ViewMode = "grid" | "list" | "month";

export default function EventsView() {
    const [events, setEvents] = useState<GMRSEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<EventCategory | "All">("All");

    useEffect(() => {
        async function loadEvents() {
            const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
            if (!sheetId) return;

            setLoading(true);
            const data = await fetchSheetData(sheetId, "Events");
            // Map Google Sheet columns to GMRSEvent interface if they differ
            const mappedEvents = data.map((item: any) => ({
                id: item.id?.toString() || Math.random().toString(),
                title: item.title || "Untitled Event",
                category: (item.category as EventCategory) || "Other",
                date: item.date || new Date().toISOString(),
                location: item.location || "TBD",
                street: item.street || "",
                city: item.city || "",
                state: item.state || "",
                zip: item.zip || "",
                description: item.description || ""
            }));
            setEvents(mappedEvents);
            setLoading(false);
        }
        loadEvents();
    }, []);

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) ||
                event.description.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = categoryFilter === "All" || event.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [events, search, categoryFilter]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-4">Events</h1>
                    <p className="text-text-secondary text-lg">Hamfests, club meetings, and training sessions.</p>
                </div>

                <div className="flex items-center space-x-2 glass p-1 rounded-xl">
                    {[
                        { id: "grid", icon: LayoutGrid },
                        { id: "list", icon: List },
                        // { id: "month", icon: CalendarIcon }, // Simplified for now
                    ].map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setViewMode(mode.id as ViewMode)}
                            className={`p-2 rounded-lg transition-colors ${viewMode === mode.id ? "bg-white/10 text-white" : "text-text-secondary hover:text-white"
                                }`}
                        >
                            <mode.icon className="w-5 h-5" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent-primary/50 transition-colors"
                    />
                </div>
                <div className="flex gap-2">
                    {["All", "Hamfest", "Meeting", "Training"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat as any)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${categoryFilter === cat
                                ? "bg-accent-primary text-background-primary"
                                : "glass text-text-secondary hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid View */}
            <AnimatePresence mode="wait">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="glass-card h-64 animate-pulse" />
                        ))}
                    </div>
                ) : viewMode === "grid" ? (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        {filteredEvents.map((event) => (
                            <EventListItem key={event.id} event={event} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function EventCard({ event }: { event: GMRSEvent }) {
    const dateObj = new Date(event.date);
    return (
        <div className="glass-card p-6 flex flex-col h-full hover:border-accent-primary/20 transition-colors">
            <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col items-center glass px-3 py-2 rounded-xl">
                    <span className="text-xs font-bold text-accent-primary uppercase">{dateObj.toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-2xl font-bold text-white">{dateObj.getDate()}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-text-secondary">
                    {event.category}
                </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
            <p className="text-text-secondary text-sm line-clamp-2 mb-6 flex-grow">{event.description}</p>

            <div className="space-y-3 pt-6 border-t border-white/5">
                {(dateObj.getHours() !== 0 || dateObj.getMinutes() !== 0) && (
                    <div className="flex items-center text-xs text-text-secondary">
                        <CalendarIcon className="w-3.5 h-3.5 mr-2 text-accent-primary" />
                        {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                )}
                <div className="flex items-start text-xs text-text-secondary">
                    <MapPin className="w-3.5 h-3.5 mr-2 text-accent-primary mt-0.5" />
                    <div>
                        <div className="font-medium text-white/90">{event.location}</div>
                        {(event.street || event.city || event.state || event.zip) && (
                            <div className="mt-0.5 opacity-70">
                                {event.street && <div>{event.street}</div>}
                                {(event.city || event.state || event.zip) && (
                                    <div>{event.city}{event.state ? `, ${event.state}` : ''} {event.zip}</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function EventListItem({ event }: { event: GMRSEvent }) {
    const dateObj = new Date(event.date);
    return (
        <div className="glass p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-accent-primary/20 transition-colors">
            <div className="flex items-center space-x-6">
                <div className="flex flex-col items-center glass px-4 py-2 rounded-xl min-w-[70px]">
                    <span className="text-xs font-bold text-accent-primary uppercase">{dateObj.toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-2xl font-bold text-white">{dateObj.getDate()}</span>
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-white">{event.title}</h3>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-text-secondary glass px-2 py-0.5 rounded">
                            {event.category}
                        </span>
                    </div>
                    <div className="flex items-center text-sm text-text-secondary gap-4">
                        {(dateObj.getHours() !== 0 || dateObj.getMinutes() !== 0) && (
                            <span className="flex items-center"><CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-accent-primary" /> {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        )}
                        <span className="flex items-start">
                            <MapPin className="w-3.5 h-3.5 mr-1.5 text-accent-primary mt-0.5" />
                            <div>
                                <div className="font-medium text-white/90">{event.location}</div>
                                {(event.street || event.city || event.state || event.zip) && (
                                    <div className="text-[11px] opacity-60">
                                        {event.street && <span>{event.street}, </span>}
                                        {event.city}{event.state ? `, ${event.state}` : ''} {event.zip}
                                    </div>
                                )}
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            <div className="md:max-w-xs">
                <p className="text-sm text-text-secondary line-clamp-1">{event.description}</p>
            </div>
        </div>
    );
}
