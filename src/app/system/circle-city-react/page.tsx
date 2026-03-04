import { Radio, Users, MapPin, Signal, Activity, Network } from "lucide-react";

export default function CircleCityReactPage() {
    return (
        <div className="max-w-4xl">
            <div className="glass-card p-8 lg:p-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Circle City React</h2>
                        <p className="text-accent-secondary font-mono">462.675 MHz / DPL 411</p>
                    </div>
                    <div className="px-4 py-2 glass rounded-lg flex items-center space-x-2 border-accent-secondary/30">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-white font-medium">Event Mode Enabled</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <section>
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                            <Users className="w-5 h-5 mr-2 text-accent-secondary" />
                            Purpose
                        </h3>
                        <p className="text-text-secondary leading-relaxed">
                            Managed by the Circle City REACT team, this repeater is dedicated to supporting localized public service events, training, and emergency communications within the Indianapolis metro area.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                            <Network className="w-5 h-5 mr-2 text-accent-secondary" />
                            Capabilities
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { label: "Primary Use", value: "Events & Training" },
                                { label: "Area", value: "Downtown & Metro" },
                                { label: "Monitoring", value: "REACT Team" },
                                { label: "Tone Type", value: "Digital (DCS/DPL)" },
                            ].map((spec) => (
                                <li key={spec.label} className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-text-secondary">{spec.label}</span>
                                    <span className="text-white font-medium">{spec.value}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <section className="p-6 rounded-xl bg-accent-secondary/5 border border-accent-secondary/10">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-accent-secondary" />
                        Location Details
                    </h3>
                    <p className="text-text-secondary">
                        Centralized within the downtown Indianapolis corridor to provide maximum penetration for portable radios during street-level events and emergency response deployments.
                    </p>
                </section>
            </div>
        </div>
    );
}
