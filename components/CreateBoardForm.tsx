"use client";

import { createBoard } from "../actions/board";
import { useState } from "react";

export default function CreateBoardForm() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        const title = formData.get("title") as string;
        if (!title?.trim()) return;

        setLoading(true);
        const result = await createBoard(formData);
        setMessage(result.message);
        setLoading(false);
    }

    return (
        <div className="flex flex-col gap-2 max-w-md">
            <form
                action={handleSubmit}
                className="flex items-center gap-3"
            >
                <div className="relative flex-1">
                    <input
                        name="title"
                        type="text"
                        placeholder="e.g. Product Roadmap"
                        className="w-full bg-white/[0.05] border border-white/10 focus:border-violet-500/60 focus:bg-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 ring-0 focus:ring-2 focus:ring-violet-500/20"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-white/10 disabled:to-white/10 disabled:text-white/20 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 active:scale-95 whitespace-nowrap"
                >
                    {loading ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Create
                        </>
                    )}
                </button>
            </form>

            {message && (
                <p className="text-xs text-white/40 px-1">{message}</p>
            )}
        </div>
    );
}