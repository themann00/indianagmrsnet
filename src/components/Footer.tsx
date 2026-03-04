import Link from "next/link";
import { Radio, Mail, MapPin, Facebook, Twitter, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="glass border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <Radio className="w-6 h-6 text-accent-primary" />
                            <span className="text-xl font-bold tracking-tight text-white">
                                Indiana <span className="text-accent-primary">GMRS</span>
                            </span>
                        </Link>
                        <p className="text-text-secondary max-w-sm">
                            Providing reliable GMRS repeater coverage and emergency communication resources for the Indiana radio community.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/system" className="text-text-secondary hover:text-accent-primary transition-colors">Our System</Link></li>
                            <li><Link href="/history" className="text-text-secondary hover:text-accent-primary transition-colors">History</Link></li>
                            <li><Link href="/skywarn" className="text-text-secondary hover:text-accent-primary transition-colors">Skywarn</Link></li>
                            <li><Link href="/events" className="text-text-secondary hover:text-accent-primary transition-colors">Events</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2 text-text-secondary">
                                <Mail className="w-4 h-4" />
                                <span>info@indianagmrs.net</span>
                            </li>
                            <li className="flex items-center space-x-2 text-text-secondary">
                                <MapPin className="w-4 h-4" />
                                <span>Indianapolis, IN</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-text-secondary text-sm">
                        © {new Date().getFullYear()} Indiana GMRS. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link href="#" className="text-text-secondary hover:text-white"><Facebook className="w-5 h-5" /></Link>
                        <Link href="#" className="text-text-secondary hover:text-white"><Twitter className="w-5 h-5" /></Link>
                        <Link href="#" className="text-text-secondary hover:text-white"><Github className="w-5 h-5" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
