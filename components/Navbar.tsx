"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/boards", label: "Boards" },
        { href: "/about", label: "About" },
    ];

    // Get initials from name
    const initials = session?.user?.name
        ? session.user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
        : "";

    return (
        <>
            <nav className="relative z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.06]">

                {/* Top shimmer line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />

                <div className="flex items-center justify-between px-6 py-3.5 max-w-7xl mx-auto">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/30 transition-shadow duration-300 group-hover:shadow-violet-500/50">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                        </div>
                        <span
                            className="text-lg font-bold text-white tracking-tight"
                            style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.03em" }}
                        >
                            Board<span className="text-violet-400">Space</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    {session?.user?.name ? (
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="relative px-4 py-2 text-sm text-white/50 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200 group"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    {label}
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-violet-400 group-hover:w-4 transition-all duration-300 rounded-full" />
                                </Link>
                            ))}

                            {/* Divider */}
                            <div className="w-[1px] h-5 bg-white/[0.08] mx-2" />

                            {/* User button */}
                            <button
                                onClick={() => setIsOpen(true)}
                                className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-violet-500/30 transition-all duration-200 group"
                            >
                                {/* Avatar */}
                                <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shadow-sm shadow-fuchsia-500/30">
                                    {initials}
                                    <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#0a0a0f] translate-x-0.5 translate-y-0.5" />
                                </div>
                                <span
                                    className="text-sm text-white/70 group-hover:text-white transition-colors duration-200 max-w-[120px] truncate"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    {session.user.name}
                                </span>
                                <svg className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-2">
                            <Link
                                href="/signin"
                                className="px-4 py-2 text-sm text-white/50 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/signup"
                                className="relative px-4 py-2 text-sm font-semibold text-white rounded-lg overflow-hidden group transition-all duration-200 active:scale-[0.97]"
                                style={{ fontFamily: "'Sora', sans-serif" }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 group-hover:from-violet-500 group-hover:to-indigo-500 transition-all duration-300" />
                                <div className="absolute inset-0 rounded-lg shadow-md shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow duration-300" />
                                <span className="relative">Get started</span>
                            </Link>
                        </div>
                    )}

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/[0.05] transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-5 h-[1.5px] bg-white/60 rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                        <span className={`block w-5 h-[1.5px] bg-white/60 rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
                        <span className={`block w-5 h-[1.5px] bg-white/60 rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                    </button>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-4 pb-4 pt-1 space-y-1 border-t border-white/[0.04]">
                        {session?.user?.name ? (
                            <>
                                {/* Mobile user info */}
                                <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
                                        {initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{session.user.name}</p>
                                        <p className="text-xs text-emerald-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>● Online</p>
                                    </div>
                                </div>
                                {navLinks.map(({ href, label }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="block px-3 py-2.5 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-150"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => { setIsOpen(true); setMobileMenuOpen(false); }}
                                    className="w-full text-left px-3 py-2.5 text-sm text-violet-400 hover:text-violet-300 rounded-lg hover:bg-violet-500/[0.08] transition-all duration-150"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    Open profile
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/signin"
                                    className="block px-3 py-2.5 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-150"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="block px-3 py-2.5 text-sm font-semibold text-center text-white rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-150"
                                    style={{ fontFamily: "'Sora', sans-serif" }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Get started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');
            `}</style>
        </>
    );
}