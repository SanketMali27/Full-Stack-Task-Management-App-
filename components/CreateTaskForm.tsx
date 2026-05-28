"use client";

import { useState } from "react";

type Props = {
    boardId: string;
};

export default function CreateTaskForm({ boardId }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    async function createTask() {
        if (!title.trim()) return;
        setLoading(true);

        await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, boardId }),
        });

        setTitle("");
        setDescription("");
        setLoading(false);
        window.location.reload();
    }

    return (
        <div className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">
                    New Task
                </h3>
            </div>

            {/* Title input */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/30 font-medium tracking-wide">
                    Title <span className="text-violet-400">*</span>
                </label>
                <input
                    type="text"
                    placeholder="e.g. Design login screen"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && createTask()}
                    className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-500/60 focus:bg-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500/20"
                />
            </div>

            {/* Description textarea */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/30 font-medium tracking-wide">
                    Description
                    <span className="ml-2 text-white/20 font-normal normal-case tracking-normal">optional</span>
                </label>
                <textarea
                    placeholder="Add some details about this task..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-500/60 focus:bg-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500/20 resize-none leading-relaxed"
                />
            </div>

            {/* Submit button */}
            <button
                onClick={createTask}
                disabled={!title.trim() || loading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-white/10 disabled:to-white/10 disabled:text-white/20 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 active:scale-95"
            >
                {loading ? (
                    <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                        Creating…
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Create Task
                    </>
                )}
            </button>
        </div>
    );
}