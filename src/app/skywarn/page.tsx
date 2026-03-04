"use client";

import { motion } from "framer-motion";
import { CloudLightning, AlertTriangle, Radio, Shield, ExternalLink } from "lucide-react";

export default function SkywarnPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
