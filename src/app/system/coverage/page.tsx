"use client";

import { Map as MapIcon, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CoveragePage() {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="glass-card overflow-hidden">
                <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-bold text-white flex items-center">
                            <MapIcon className="w-8 h-8 mr-4 text-accent-primary" />
                            Network Coverage
                        </h2>
                        <span className="px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold uppercase tracking-widest">
                            Live Propagation
                        </span>
                    </div>
                    <p className="text-text-secondary text-lg">
                        Our primary site provides reliable wide-area coverage across Central Indiana.
                        This heatmap shows predicted signal strength for portable and mobile radios.
                    </p>
                </div>

                <div className="relative group">
                    <img
                        src="/images/550-coverage-detailed.jpg"
                        alt="Detailed Coverage Map"
                        className="w-full h-auto block"
                    />
                    <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white/5">
                    <div className="space-y-2">
                        <div className="w-12 h-1 bg-rose-500 rounded-full mb-4" />
                        <h4 className="text-white font-bold">Strong Signal</h4>
                        <p className="text-xs text-text-secondary">Excellent indoor and portable coverage. Reliable in all conditions.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="w-12 h-1 bg-emerald-500 rounded-full mb-4" />
                        <h4 className="text-white font-bold">Good / Mobile</h4>
                        <p className="text-xs text-text-secondary">Solid coverage for mobile radios. Portable use may require outdoor line-of-sight.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="w-12 h-1 bg-sky-500 rounded-full mb-4" />
                        <h4 className="text-white font-bold">Fringe Area</h4>
                        <p className="text-xs text-text-secondary">External antennas recommended. Signal may be weak for portable units.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
