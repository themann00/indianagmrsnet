"use client";

import { useEffect, useState } from "react";
import { fetchSheetData } from "@/lib/googleSheets";
import { MessageSquare, Calendar, ChevronRight, Bell } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LatestUpdates() {
    const [updates, setUpdates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUpdates() {
            const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
            if (!sheetId) return;

            const data = await fetchSheetData(sheetId, "Updates");
            setUpdates(data.slice(0, 3)); // Only show latest 3
            setLoading(false);
        }
        loadUpdates();
    }, []);

    if (loading && updates.length === 0) return null;

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Latest Updates</h2>
                        <p className="text-text-secondary">Community news and network alerts.</p>
                    </div>
                    <Bell className="w-8 h-8 text-accent-primary opacity-20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {updates.map((update, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 group hover:border-accent-primary/20 transition-all"
                        >
                            <span className={`text-[10px] font-bold uppercase tracking-widest mb-4 block ${update.priority?.toLowerCase() === 'high' ? 'text-rose-500' : 'text-accent-primary'
                                }`}>
                                {update.priority || 'NORMAL'} PRIORITY
                            </span>
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-accent-primary transition-colors">
                                {update.title}
                            </h3>
                            <p className="text-text-secondary text-sm leading-relaxed mb-6">
                                {update.content}
                            </p>
                            <span className="text-xs text-text-secondary font-medium">
                                {update.date}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
