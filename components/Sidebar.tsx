"use client";

import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";
import {
    LayoutDashboard,
    KanbanSquare,
    Settings,
    User,
    X,
    Mail,
} from "lucide-react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function Sidebar({
    isOpen,
    onClose,
}: Props) {
    const { data: session } = useSession();

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300
                ${isOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 z-50 h-screen w-80
                bg-slate-950/95 backdrop-blur-2xl
                border-l border-white/10
                shadow-[0_0_50px_rgba(0,0,0,0.5)]
                transition-all duration-500 ease-out
                ${isOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 p-5">
                    <h2 className="text-xl font-bold text-white">
                        Profile
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* User Card */}
                <div className="p-5">
                    <div
                        className="
                        rounded-2xl
                        border border-white/10
                        bg-gradient-to-br
                        from-indigo-500/20
                        via-purple-500/10
                        to-cyan-500/20
                        backdrop-blur-xl
                        p-5
                        "
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="
                                h-14 w-14
                                rounded-full
                                bg-gradient-to-r
                                from-indigo-500
                                to-purple-500
                                flex items-center justify-center
                                text-white font-bold text-xl
                                "
                            >
                                {session?.user?.name?.charAt(0)}
                            </div>

                            <div>
                                <h3 className="font-semibold text-white">
                                    {session?.user?.name}
                                </h3>

                                <p className="text-sm text-slate-400">
                                    Active Member
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 space-y-3">
                            <div className="flex items-center gap-2 text-slate-300">
                                <Mail size={16} />
                                <span className="text-sm truncate">
                                    {session?.user?.email}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-400">
                                <User size={16} />
                                <span className="text-xs truncate">
                                    ID: {session?.user?.id}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="px-4 space-y-2">
                    <button
                        className="
                        group flex w-full items-center gap-3
                        rounded-xl px-4 py-3
                        text-slate-300
                        hover:bg-white/10
                        hover:text-white
                        transition
                        "
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>

                    <button
                        className="
                        group flex w-full items-center gap-3
                        rounded-xl px-4 py-3
                        text-slate-300
                        hover:bg-white/10
                        hover:text-white
                        transition
                        "
                    >
                        <KanbanSquare size={18} />
                        My Boards
                    </button>

                    <button
                        className="
                        group flex w-full items-center gap-3
                        rounded-xl px-4 py-3
                        text-slate-300
                        hover:bg-white/10
                        hover:text-white
                        transition
                        "
                    >
                        <Settings size={18} />
                        Settings
                    </button>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 w-full border-t border-white/10 p-5">
                    <LogoutButton />
                </div>
            </aside>
        </>
    );
}