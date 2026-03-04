"use client";

import { motion } from "framer-motion";
import { History, Milestone, Calendar } from "lucide-react";

const timeline = [
    {
        year: "2004",
        title: "The Beginning",
        description: "The 'ICE 550' repeater was established in Zionsville, providing some of the first reliable GMRS coverage in the area.",
    },
    {
        year: "2014",
        title: "10 Years of Service",
        description: "ICE 550 celebrated a decade of continuous operation, serving a growing community of families and radio enthusiasts.",
    },
    {
        year: "2023",
        title: "Modernization",
        description: "The system underwent a major hardware upgrade, transitioning to high-tier Motorola SLR series infrastructure and adopting the WQPV948 callsign.",
    },
    {
        year: "2024",
        title: "Circle City Partnership",
        description: "Indiana GMRS partnered with Circle City REACT to expand metro coverage and focus on event-based communications.",
    },
    {
        year: "Today",
        title: "The Future",
        description: "Continuing to grow the network while maintaining the core mission of reliable, localized communication for all members.",
    },
];

export default function HistoryPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-white mb-4">Our History</h1>
                <p className="text-text-secondary text-lg">Over 20 years of connecting the Indiana community.</p>
            </div>

            <div className="relative border-l border-white/10 ml-6 md:ml-0 md:border-l-0">
                {/* Central Line for Desktop */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

                <div className="space-y-12">
                    {timeline.map((item, idx) => (
                        <motion.div
                            key={item.year}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Dot */}
                            <div className="absolute left-[-21px] md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full glass border border-accent-primary/50 flex items-center justify-center z-10 bg-background-primary">
                                <Calendar className="w-5 h-5 text-accent-primary" />
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-[45%] ml-10 md:ml-0">
                                <div className="glass-card p-6 hover:border-accent-primary/20 transition-colors">
                                    <span className="text-accent-primary font-mono font-bold text-lg mb-2 block">
                                        {item.year}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-text-secondary leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
