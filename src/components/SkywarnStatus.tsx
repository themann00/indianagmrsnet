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
        switch (s?.toLowerCase()) {
            case "watch":
            case "warning":
                return {
                    color: "bg-rose-500/20 border-rose-500/50 text-rose-500",
                    icon: AlertCircle,
                    label: s.toUpperCase()
                };
            case "advisory":
                return {
                    color: "bg-amber-500/20 border-amber-500/50 text-amber-500",
                    icon: AlertTriangle,
                    label: "ADVISORY"
                };
            default:
                return {
                    color: "bg-emerald-500/20 border-emerald-500/50 text-emerald-500",
                    icon: CheckCircle2,
                    label: "NORMAL"
                };
        }
    };

    const config = getStatusConfig(status.status);
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border-b ${config.color} py-2 px-4 flex items-center justify-center space-x-4 text-sm font-medium`}
        >
            <div className="flex items-center">
                <Icon className="w-4 h-4 mr-2" />
                <span className="font-bold">SKYWARN: {config.label}</span>
            </div>
            <span className="hidden md:inline text-white/60">|</span>
            <p className="hidden md:block truncate">{status.description || "No active weather threats."}</p>
            <div className="flex items-center text-xs opacity-60">
                <Clock className="w-3 h-3 mr-1" />
                {status.lastUpdated || "Live"}
            </div>
        </motion.div>
    );
}
