"use client";

import { useEffect, useState } from "react";
import { fetchSheetData } from "@/lib/googleSheets";
import { AlertCircle, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkywarnStatus() {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStatus() {
            const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
            if (!sheetId) return;

            const data = await fetchSheetData(sheetId, "Skywarn");
            if (data && data.length > 0) {
                setStatus(data[0]); // Assume the first row is the current status
            }
            setLoading(false);
        }
        loadStatus();
        const interval = setInterval(loadStatus, 300000); // Refresh every 5 mins
        return () => clearInterval(interval);
    }, []);

    if (loading || !status) return null;

    const getStatusConfig = (s: string) => {
        const lowerStatus = s?.toLowerCase();
        if (lowerStatus === "active") {
            return {
                color: "bg-red-900 border-red-700 text-white shadow-[0_0_20px_rgba(185,28,28,0.3)]",
                icon: AlertCircle,
                label: "ACTIVE",
                animate: true
            };
        }

        switch (lowerStatus) {
            case "watch":
            case "warning":
                return {
                    color: "bg-rose-500/20 border-rose-500/50 text-rose-500",
                    icon: AlertCircle,
                    label: s.toUpperCase(),
                    animate: false
                };
            case "advisory":
                return {
                    color: "bg-amber-500/20 border-amber-500/50 text-amber-500",
                    icon: AlertTriangle,
                    label: "ADVISORY",
                    animate: false
                };
            default:
                return {
                    color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
                    icon: CheckCircle2,
                    label: "NORMAL",
                    animate: false
                };
        }
    };

    const config = getStatusConfig(status.status);
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className={`relative z-[60] border-b ${config.color} py-2.5 px-4 flex items-center justify-center space-x-4 text-sm font-medium transition-colors duration-500`}
        >
            <div className={`flex items-center ${config.animate ? 'animate-pulse' : ''}`}>
                <Icon className="w-4 h-4 mr-2" />
                <span className="font-bold tracking-tight">SKYWARN: {config.label}</span>
            </div>
            <span className="hidden md:inline opacity-30">|</span>
            <p className="hidden md:block truncate max-w-2xl">{status.description || "No active weather threats."}</p>
            <div className="flex items-center text-xs opacity-60 ml-auto md:ml-0 whitespace-nowrap">
                <Clock className="w-3 h-3 mr-1" />
                {status.lastUpdated === "LIVE" ? "LIVE NOW!" : status.lastUpdated || "Monitoring"}
            </div>
        </motion.div>
    );
}
