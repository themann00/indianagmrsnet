"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Calendar, ChevronRight, User, Clock } from "lucide-react";
import Link from "next/link";

interface Post {
    id: number;
    title: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    slug: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch("https://indianagmrs.net/wp-json/wp/v2/posts?per_page=10");
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="mb-16 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-4">Latest Updates</h1>
                <p className="text-text-secondary text-lg">News and announcements from the Indiana GMRS community.</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="glass-card h-64 animate-pulse bg-white/5" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="glass-card flex flex-col h-full hover:border-accent-primary/20 transition-all group">
                            <div className="p-8 flex flex-col h-full">
                                <div className="flex items-center space-x-4 text-xs text-text-secondary mb-6">
                                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5" /> {new Date(post.date).toLocaleDateString()}</span>
                                </div>

                                <h2
                                    className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-accent-primary transition-colors"
                                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                />

                                <div
                                    className="text-text-secondary text-sm leading-relaxed mb-8 line-clamp-3 prose prose-invert"
                                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                />

                                <div className="mt-auto">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="flex items-center text-sm font-bold text-white hover:text-accent-primary transition-colors group/link"
                                    >
                                        Read More
                                        <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
