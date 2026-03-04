"use client";

import { motion } from "framer-motion";
import { Shield, Radio, Users, ChevronRight } from "lucide-react";
import Link from "next/link";
import LatestUpdates from "@/components/LatestUpdates";

export default function Home() {
  return (
    <div className="relative isolate">
      {/* Background Decor */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-accent-primary to-emerald-900 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      {/* Hero Section */}
      <section className="px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-8">
              Indiana <span className="text-gradient">GMRS</span> Network
            </h1>
            <p className="text-lg leading-8 text-text-secondary mb-10 max-w-2xl mx-auto">
              Connecting communities across the Hoosier state through reliable, high-performance GMRS repeater coverage and a dedicated network of radio enthusiasts.
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <Link
                href="/system"
                className="rounded-full bg-accent-primary px-8 py-3.5 text-sm font-semibold text-background-primary shadow-sm hover:bg-accent-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary transition-all hover:scale-105"
              >
                View System Map
              </Link>
              <Link href="/history" className="text-sm font-semibold leading-6 text-white hover:text-accent-primary transition-colors flex items-center group">
                Learn our history <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <LatestUpdates />

      {/* Mission Section */}
      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-accent-primary">Our Mission</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Reliable Communication When It Matters Most
            </p>
          </div>

          <div className="mx-auto max-w-2xl sm:max-w-none">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              {[
                {
                  name: "Community Coverage",
                  description: "Strategically located repeaters providing seamless communication for members across Central and Suburban Indiana.",
                  icon: Radio,
                },
                {
                  name: "Emergency Preparedness",
                  description: "Committed to public service through Skywarn integration and resilient infrastructure that stands when other networks fail.",
                  icon: Shield,
                },
                {
                  name: "Member Focused",
                  description: "A growing community of operators sharing knowledge, hosting events, and advancing the GMRS hobby together.",
                  icon: Users,
                },
              ].map((feature, idx) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col glass-card p-8 hover:border-accent-primary/30 transition-colors"
                >
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white mb-4">
                    <feature.icon className="h-6 w-6 text-accent-primary" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="flex flex-auto flex-col text-base leading-7 text-text-secondary">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
