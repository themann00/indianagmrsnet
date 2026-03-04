"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
    { name: "Overview", href: "/system" },
    { name: "WQPV948", href: "/system/wqpv948" },
    { name: "Circle City React", href: "/system/circle-city-react" },
];

export default function SystemLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Our Current System</h1>
                <p className="text-text-secondary text-lg max-w-2xl">
                    Explore the Indiana GMRS repeater network. Our system is designed for high reliability and wide coverage.
                </p>
            </div>

            <div className="flex space-x-1 glass p-1 rounded-xl mb-8 w-fit">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={`relative px-6 py-2.5 text-sm font-medium transition-colors rounded-lg ${isActive ? "text-white" : "text-text-secondary hover:text-white"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-tab"
                                    className="absolute inset-0 bg-white/10 rounded-lg shadow-sm"
                                    transition={{ type: "spring", duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{tab.name}</span>
                        </Link>
                    );
                })}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {children}
            </motion.div>
        </div>
    );
}
