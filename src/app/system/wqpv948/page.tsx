import { Radio, MapPin, Signal, Activity, Cpu, Server } from "lucide-react";

export default function WQPV948Page() {
    return (
        <div className="max-w-4xl">
            <div className="glass-card p-8 lg:p-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">WQPV948 Repeater</h2>
                        <p className="text-accent-primary font-mono">462.550 MHz / 77.0 PL</p>
                    </div>
                    <div className="px-4 py-2 glass rounded-lg flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-white font-medium">Active & Monitored</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <section>
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                            <Info className="w-5 h-5 mr-2 text-accent-primary" />
                            Overview
                        </h3>
                        <p className="text-text-secondary leading-relaxed">
                            Located in Zionsville, Indiana, WQPV948 is our primary wide-area repeater. It provides excellent coverage for Northwest Indianapolis, Carmel, and Lebanon. Formerly known as the "ICE 550" repeater, it has served the community for over 20 years.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                            <Cpu className="w-5 h-5 mr-2 text-accent-primary" />
                            Technical Specs
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { label: "Hardware", value: "Motorola SLR 5700" },
                                { label: "Antenna Height", value: "180 feet AGL" },
                                { label: "Power", value: "50 Watts" },
                                { label: "Effective Range", value: "~25-30 Miles" },
                            ].map((spec) => (
                                <li key={spec.label} className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-text-secondary">{spec.label}</span>
                                    <span className="text-white font-medium">{spec.value}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <section className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Server className="w-5 h-5 mr-2 text-accent-primary" />
                        Network Mode
                    </h3>
                    <p className="text-text-secondary">
                        This repeater operates in <span className="text-white font-medium">Standalone / Local</span> mode. It is not currently linked to any statewide networks to ensure local priority for Northwest members.
                    </p>
                </section>
            </div>
        </div>
    );
}

function Info(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    );
}
