"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Calendar, MapPin, Tag, Info } from "lucide-react";
import { GMRSEvent, EventCategory } from "@/types/event";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const [events, setEvents] = useState<GMRSEvent[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [newEvent, setNewEvent] = useState<Partial<GMRSEvent>>({
        title: "",
        category: "Meeting",
        date: "",
        location: "",
        description: "",
    });

    useEffect(() => {
        const saved = sessionStorage.getItem("admin_secret");
        if (saved) {
            setIsAuthenticated(true);
            fetchEvents(saved);
        }
    }, []);

    const fetchEvents = async (secret?: string) => {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
        if (secret) setIsAuthenticated(true);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        sessionStorage.setItem("admin_secret", password);
        setIsAuthenticated(true);
        fetchEvents();
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const secret = sessionStorage.getItem("admin_secret");
        const res = await fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${secret}`
            },
            body: JSON.stringify(newEvent),
        });

        if (res.ok) {
            setIsAdding(false);
            setNewEvent({ title: "", category: "Meeting", date: "", location: "", description: "" });
            fetchEvents();
        } else if (res.status === 401) {
            alert("Unauthorized: Incorrect secret.");
            setIsAuthenticated(false);
            sessionStorage.removeItem("admin_secret");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="max-w-md mx-auto px-4 py-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-8 text-center"
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-accent-primary/10 rounded-full">
                            <Plus className="w-8 h-8 text-accent-primary rotate-45" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
                    <p className="text-text-secondary mb-8">Please enter the security secret to continue.</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Admin Secret"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary/50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-accent-primary text-background-primary rounded-xl font-bold hover:scale-105 transition-transform"
                        >
                            Unlock Dashboard
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Event Management</h1>
                    <p className="text-text-secondary">Manage hamfests, meetings, and training sessions.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center space-x-2 bg-accent-primary text-background-primary px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Event</span>
                </button>
            </div>

            {isAdding && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 mb-12"
                >
                    <h3 className="text-xl font-bold text-white mb-8">New Event Details</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Event Title</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Monthly Club Meeting"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary/50"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Category</label>
                            <select
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary/50"
                                value={newEvent.category}
                                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as EventCategory })}
                            >
                                <option value="Hamfest">Hamfest</option>
                                <option value="Meeting">Meeting</option>
                                <option value="Training">Training</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Date & Time</label>
                            <input
                                required
                                type="datetime-local"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary/50"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Location</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Zionsville Community Center"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary/50"
                                value={newEvent.location}
                                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Description</label>
                            <textarea
                                required
                                rows={4}
                                placeholder="Describe the event..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary/50"
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="px-6 py-3 glass rounded-xl text-white hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-accent-primary text-background-primary rounded-xl font-bold hover:bg-accent-primary/90 transition-colors"
                            >
                                Create Event
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            {/* Events List */}
            <div className="space-y-4">
                {events.map((event) => (
                    <div key={event.id} className="glass p-6 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="p-3 bg-white/5 rounded-xl">
                                <Calendar className="w-6 h-6 text-accent-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{event.title}</h3>
                                <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                                    <span className="flex items-center"><Tag className="w-3.5 h-3.5 mr-1.5" /> {event.category}</span>
                                    <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5" /> {event.location}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="p-2 glass rounded-lg text-text-secondary hover:text-white transition-colors">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 glass rounded-lg text-rose-500/80 hover:text-rose-500 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
