"use client";

import { useEffect, useState } from "react";
import { fetchSheetData } from "@/lib/googleSheets";
import { motion } from "framer-motion";
import { Bell, Calendar, ChevronRight, Clock, Tag } from "lucide-react";
import Link from "next/link";

export default function UpdatesPage() {
    const [updates, setUpdates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUpdates() {
            const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
            if (!sheetId) return;

            const data = await fetchSheetData(sheetId, "Updates");
            setUpdates(data);
            setLoading(false);
        }
        loadUpdates();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="mb-16 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-4">Network Updates</h1>
                <p className="text-text-secondary text-lg">Stay informed about the Indiana GMRS network and community news.</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="glass-card h-64 animate-pulse bg-white/5" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {updates.map((update, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card flex flex-col h-full hover:border-accent-primary/20 transition-all group"
                        >
                            <div className="p-8 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${update.priority?.toLowerCase() === 'high' ? 'text-rose-500' : 'text-accent-primary'
                                        }`}>
                                        {update.priority || 'NORMAL'} PRIORITY
                                    </span>
                                    <div className="flex items-center text-xs text-text-secondary">
                                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                                        {update.date}
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-white mb-4 group-hover:text-accent-primary transition-colors">
                                    {update.title}
                                </h2>

                                <p className="text-text-secondary text-sm leading-relaxed mb-8 line-clamp-4">
                                    {update.content}
                                </p>

                                {update.readMoreURL && update.readMoreURL.startsWith('http') && (
                                    <div className="mt-auto pt-6 border-t border-white/5">
                                        <Link
                                            href={update.readMoreURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-sm font-bold text-white hover:text-accent-primary transition-colors group/link"
                                        >
                                            Read Full Story
                                            <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
