"use client";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !password.trim()) {
            setMessage("All fields are required");
            return;
        }
        if (password.length <= 7) {
            setMessage("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        setIsLoading(false);

        if (response.ok) {
            setMessage("Signup successful");
            console.log(data);
        } else {
            setMessage(data.error);
        }
        setName("");
        setEmail("");
        setPassword("");
    };

    const isError = message !== "" && message !== "Signup successful";
    const isSuccess = message === "Signup successful";

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">

            {/* Ambient background orbs */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-900/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                }}
            />

            {/* Card */}
            <div className="relative w-full max-w-md">

                {/* Glow border */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-fuchsia-500/40 via-transparent to-violet-500/30 blur-sm" />

                <div className="relative bg-[#0e0e17]/90 backdrop-blur-xl rounded-2xl border border-white/[0.06] shadow-2xl shadow-black/60 overflow-hidden">

                    {/* Top shimmer line */}
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent" />

                    <div className="px-8 pt-10 pb-10">

                        {/* Brand mark */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 blur-md opacity-40" />
                            </div>
                            <h1
                                className="text-2xl font-bold tracking-tight text-white"
                                style={{ fontFamily: "'Sora', 'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
                            >
                                Create account
                            </h1>
                            <p className="text-sm text-white/30 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                Join us — it only takes a moment
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Name field */}
                            <div className="group relative">
                                <label className="block text-xs font-medium text-white/40 mb-1.5 ml-0.5 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-white/20 group-focus-within:text-fuchsia-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:border-fuchsia-500/60 focus:bg-fuchsia-500/[0.05] focus:shadow-[0_0_0_3px_rgba(217,70,239,0.1)] hover:border-white/[0.12]"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    />
                                </div>
                            </div>

                            {/* Email field */}
                            <div className="group relative">
                                <label className="block text-xs font-medium text-white/40 mb-1.5 ml-0.5 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-white/20 group-focus-within:text-fuchsia-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:border-fuchsia-500/60 focus:bg-fuchsia-500/[0.05] focus:shadow-[0_0_0_3px_rgba(217,70,239,0.1)] hover:border-white/[0.12]"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    />
                                </div>
                            </div>

                            {/* Password field */}
                            <div className="group relative">
                                <label className="block text-xs font-medium text-white/40 mb-1.5 ml-0.5 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-white/20 group-focus-within:text-fuchsia-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Min. 8 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:border-fuchsia-500/60 focus:bg-fuchsia-500/[0.05] focus:shadow-[0_0_0_3px_rgba(217,70,239,0.1)] hover:border-white/[0.12]"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3.5 flex items-center text-white/20 hover:text-white/50 transition-colors duration-150"
                                    >
                                        {showPassword ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {/* Password strength bar */}
                                {password.length > 0 && (
                                    <div className="mt-2 flex gap-1">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${password.length >= i * 2
                                                    ? password.length < 6
                                                        ? "bg-red-500"
                                                        : password.length < 10
                                                            ? "bg-amber-400"
                                                            : "bg-emerald-400"
                                                    : "bg-white/10"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Message */}
                            {message && (
                                <div className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm ${isError
                                    ? "bg-red-500/10 border border-red-500/20 text-red-400"
                                    : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                    }`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                    {isError ? (
                                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                    {message}
                                </div>
                            )}

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="relative w-full mt-2 py-3 rounded-xl text-sm font-semibold text-white overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
                                style={{ fontFamily: "'Sora', sans-serif" }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 transition-all duration-300 group-hover:from-fuchsia-500 group-hover:to-violet-500" />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                                        backgroundSize: "200% 100%",
                                    }}
                                />
                                <div className="absolute inset-0 rounded-xl shadow-lg shadow-fuchsia-500/30 group-hover:shadow-fuchsia-500/50 transition-shadow duration-300" />

                                <span className="relative flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Creating account...
                                        </>
                                    ) : (
                                        <>
                                            Create account
                                            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-[1px] bg-white/[0.06]" />
                            <span className="text-xs text-white/20" style={{ fontFamily: "'DM Sans', sans-serif" }}>or</span>
                            <div className="flex-1 h-[1px] bg-white/[0.06]" />
                        </div>

                        {/* Login link */}
                        <p className="text-center text-sm text-white/30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors duration-150 underline underline-offset-2 decoration-fuchsia-400/30 hover:decoration-fuchsia-300/60"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Bottom shimmer line */}
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');
            `}</style>
        </div>
    );
}