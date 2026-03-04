import { Radio, MapPin, Signal, Activity } from "lucide-react";

export default function SystemOverview() {
    const repeaters = [
        {
            name: "WQPV948",
            freq: "462.550 MHz",
            tone: "77.0 PL",
            status: "Online",
            location: "Downtown Indianapolis",
            description: "Located in downtown Indianapolis, WQPV948 is the largest central Indiana wide-area GMRS repeater. It provides excellent coverage for all of Indianapolis, Carmel, Lebanon, Noblesville, Greenwood, Greenfield, Franklin, Martinsville, Avon, and McCordsville. Formerly known as the \"ICE 550\" repeater, it has served the community for over 20 years.",
        },
        {
            name: "Coverage",
            freq: "Network View",
            tone: "Visual Map",
            status: "Updated",
            location: "Central Indiana",
            description: "View the comprehensive coverage area of the Indiana GMRS network, centered at our downtown Indianapolis site.",
            isMap: true
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {repeaters.map((repeater) => (
                <div key={repeater.name} className="glass-card p-8 flex flex-col justify-between">
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-accent-primary/10 rounded-lg">
                                <Radio className="w-6 h-6 text-accent-primary" />
                            </div>
                            <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                                <span className={`w-2 h-2 rounded-full animate-pulse ${repeater.status === 'Online' ? 'bg-emerald-500' : 'bg-accent-primary'}`} />
                                <span>{repeater.status}</span>
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{repeater.name}</h3>
                        <p className="text-text-secondary mb-6">{repeater.description}</p>

                        {repeater.isMap ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group-hover:border-accent-primary/30 transition-colors">
                                <img
                                    src="/images/550-coverage.jpg"
                                    alt="Coverage Map"
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-primary/80 to-transparent flex items-end p-4">
                                    <span className="text-sm font-bold text-white flex items-center">
                                        View Detailed Map <Activity className="w-4 h-4 ml-2 text-accent-primary" />
                                    </span>
                                </div>
                            </div>
                        ) : (
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
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
