import { Radio, MapPin, Signal, Activity } from "lucide-react";

export default function SystemOverview() {
    const repeaters = [
        {
            name: "WQPV948 (Zionsville)",
            freq: "462.550 MHz",
            tone: "77.0 PL",
            status: "Online",
            location: "Zionsville / Northwest Indy",
            description: "Primary wide-area repeater for the North and Northwest suburbs.",
        },
        {
            name: "Circle City React",
            freq: "462.675 MHz",
            tone: "DPL 411",
            status: "Online",
            location: "Central Indianapolis",
            description: "Dedicated to community events and emergency communications support.",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {repeaters.map((repeater) => (
                <div key={repeater.name} className="glass-card p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-accent-primary/10 rounded-lg">
                                <Radio className="w-6 h-6 text-accent-primary" />
                            </div>
                            <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>{repeater.status}</span>
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{repeater.name}</h3>
                        <p className="text-text-secondary mb-6">{repeater.description}</p>

                        <div className="space-y-4">
                            <div className="flex items-center text-sm">
                                <Signal className="w-4 h-4 text-accent-primary mr-3" />
                                <span className="text-text-secondary mr-2">Frequency:</span>
                                <span className="text-white font-mono">{repeater.freq}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <Activity className="w-4 h-4 text-accent-primary mr-3" />
                                <span className="text-text-secondary mr-2">Tone:</span>
                                <span className="text-white font-mono">{repeater.tone}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <MapPin className="w-4 h-4 text-accent-primary mr-3" />
                                <span className="text-text-secondary mr-2">Location:</span>
                                <span className="text-white">{repeater.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
