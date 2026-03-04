import { useEffect, useState } from "react";
import { fetchSheetData } from "@/lib/googleSheets";
import { motion } from "framer-motion";
import { CloudLightning, AlertTriangle, Radio, Shield, ExternalLink, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchSheetData } from "../utils/fetchSheetData"; // Assuming this utility exists

export default function SkywarnPage() {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStatus() {
            const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
            if (!sheetId) {
                setLoading(false);
                return;
            }
            try {
                const data = await fetchSheetData(sheetId, "Skywarn");
                if (data && data.length > 0) setStatus(data[0]);
            } catch (error) {
                console.error("Failed to fetch Skywarn status:", error);
            } finally {
                setLoading(false);
            }
        }
        loadStatus();
    }, []);

    const formatStatusDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        if (dateStr.toUpperCase() === "LIVE") return "LIVE NOW!";
        return dateStr; // The fetchSheetData utility already handles Google Date parsing to a nice string if applicable
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {/* Live Status Card */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-16 p-8 rounded-3xl border-2 transition-all duration-500 overflow-hidden relative ${status?.status?.toLowerCase() === 'active'
                    ? 'bg-red-950/40 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.2)]'
                    : 'bg-white/[0.02] border-white/10'
                    }`}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                    <div>
                        <div className="flex items-center space-x-3 text-sm font-bold tracking-widest uppercase mb-4">
                            <div className={`w-2 h-2 rounded-full ${status?.status?.toLowerCase() === 'active' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                            <span className={status?.status?.toLowerCase() === 'active' ? 'text-red-400' : 'text-emerald-400'}>
                                Current Protocol: {status?.status || (loading ? 'Loading...' : 'Normal')}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Live Network Status</h2>
                        <p className="text-text-secondary text-lg max-w-2xl">{status?.description || "Network is currently operating under normal protocols."}</p>
                    </div>
                    <div className="glass px-8 py-6 rounded-2xl flex flex-col items-center justify-center min-w-[200px] border-white/5">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary mb-2">Last Update</span>
                        <div className={`text-xl font-bold ${status?.lastUpdated === 'LIVE' ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                            {formatStatusDate(status?.lastUpdated)}
                        </div>
                    </div>
                </div>
                {status?.status?.toLowerCase() === 'active' && (
                    <motion.div
                        animate={{ opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-red-500/5 pointer-events-none"
                    />
                )}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="flex items-center space-x-3 text-accent-secondary mb-4">
                        <CloudLightning className="w-6 h-6" />
                        <span className="font-bold tracking-widest uppercase">Emergency Response</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Skywarn & Public Service</h1>
                    <p className="text-lg text-text-secondary leading-relaxed mb-8">
                        When severe weather strikes, the Indiana GMRS network stands ready. We coordinate with local Skywarn spotters and emergency managers to provide critical ground-truth reports from the field.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="https://www.weather.gov/skywarn/"
                            target="_blank"
                            className="flex items-center space-x-2 glass px-6 py-3 rounded-full text-white hover:bg-white/10 transition-colors"
                        >
                            <span>Official Skywarn Site</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-8 border-accent-secondary/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertTriangle className="w-24 h-24 text-accent-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6">Severe Weather Protocol</h3>
                    <ul className="space-y-6">
                        {[
                            {
                                title: "Priority Traffic",
                                text: "During active weather watches, all non-essential traffic should cease to allow for spotter reports.",
                                icon: Shield
                            },
                            {
                                title: "Net Activation",
                                text: "Indiana GMRS maintains formal nets during major events. Monitor 462.550 MHz for coordination.",
                                icon: Radio
                            }
                        ].map((item) => (
                            <li key={item.title} className="flex space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center">
                                    <item.icon className="w-5 h-5 text-accent-secondary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                                    <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            <section className="py-12 border-t border-white/5">
                <h2 className="text-2xl font-bold text-white mb-8">Related Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        "Marion County Emergency Management",
                        "NWS Indianapolis (Spotter Info)",
                        "Hamilton County Skywarn Net",
                    ].map((resource) => (
                        <div key={resource} className="glass p-6 rounded-xl flex items-center justify-between group cursor-pointer hover:border-accent-primary/30 transition-colors">
                            <span className="text-text-secondary group-hover:text-white transition-colors">{resource}</span>
                            <ExternalLink className="w-4 h-4 text-text-secondary" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
